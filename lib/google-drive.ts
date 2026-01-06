import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

// Encrypt/decrypt tokens
function encrypt(text: string): string {
  return Buffer.from(text).toString('base64')
}

function decrypt(encrypted: string): string {
  return Buffer.from(encrypted, 'base64').toString()
}

export async function saveDriveAccount(data: {
  email: string
  refreshToken: string
  accessToken: string
  expiresAt: Date
}) {
  const result = await sql`
    INSERT INTO google_drive_accounts (email, refresh_token, access_token, token_expires_at)
    VALUES (${data.email}, ${encrypt(data.refreshToken)}, ${data.accessToken}, ${data.expiresAt})
    ON CONFLICT (email) DO UPDATE SET
      refresh_token = ${encrypt(data.refreshToken)},
      access_token = ${data.accessToken},
      token_expires_at = ${data.expiresAt},
      updated_at = now()
    RETURNING id
  `
  return result[0]?.id
}

export async function getDriveAccount(email: string) {
  const result = await sql`
    SELECT * FROM google_drive_accounts WHERE email = ${email} LIMIT 1
  `
  if (result[0]) {
    return {
      ...result[0],
      refresh_token: decrypt(result[0].refresh_token)
    }
  }
  return null
}

export async function updateDriveTokens(accountId: string, accessToken: string, expiresAt: Date) {
  await sql`
    UPDATE google_drive_accounts 
    SET access_token = ${accessToken}, token_expires_at = ${expiresAt}, updated_at = now()
    WHERE id = ${accountId}
  `
}

export async function saveDriveFolder(data: {
  driveAccountId: string
  folderId: string
  folderName: string
  folderUrl?: string
  folderType: 'gallery' | 'client'
  bookingId?: number
  userId?: number
  accessLevel?: 'public' | 'private'
}) {
  const result = await sql`
    INSERT INTO google_drive_folders (
      drive_account_id, folder_id, folder_name, folder_url, 
      folder_type, booking_id, user_id, access_level
    ) VALUES (
      ${data.driveAccountId}, ${data.folderId}, ${data.folderName}, ${data.folderUrl || null},
      ${data.folderType}, ${data.bookingId || null}, ${data.userId || null}, ${data.accessLevel || 'private'}
    )
    RETURNING id
  `
  return result[0]?.id
}

export async function getDriveFolders(type?: 'gallery' | 'client', userId?: number) {
  let query = sql`
    SELECT df.*, da.email as account_email
    FROM google_drive_folders df
    JOIN google_drive_accounts da ON df.drive_account_id = da.id
  `
  
  if (type && userId) {
    query = sql`
      SELECT df.*, da.email as account_email
      FROM google_drive_folders df
      JOIN google_drive_accounts da ON df.drive_account_id = da.id
      WHERE df.folder_type = ${type} AND df.user_id = ${userId}
    `
  } else if (type) {
    query = sql`
      SELECT df.*, da.email as account_email
      FROM google_drive_folders df
      JOIN google_drive_accounts da ON df.drive_account_id = da.id
      WHERE df.folder_type = ${type}
    `
  }
  
  return await query
}

export async function upsertDriveFiles(folderId: string, files: any[]) {
  let synced = 0
  let skipped = 0

  for (const file of files) {
    try {
      const existing = await sql`
        SELECT id FROM google_drive_files WHERE file_id = ${file.id}
      `
      
      if (existing.length > 0) {
        // Update existing file
        await sql`
          UPDATE google_drive_files SET
            file_name = ${file.name},
            mime_type = ${file.mimeType},
            file_size = ${parseInt(file.size) || 0},
            download_url = ${file.webContentLink || null},
            thumbnail_url = ${file.thumbnailLink || null},
            web_view_link = ${file.webViewLink},
            modified_time = ${new Date(file.modifiedTime)},
            imported_at = now()
          WHERE file_id = ${file.id}
        `
        skipped++
      } else {
        // Insert new file
        await sql`
          INSERT INTO google_drive_files (
            drive_folder_id, file_id, file_name, mime_type, file_size,
            download_url, thumbnail_url, web_view_link, created_time, modified_time
          ) VALUES (
            ${folderId}, ${file.id}, ${file.name}, ${file.mimeType}, ${parseInt(file.size) || 0},
            ${file.webContentLink || null}, ${file.thumbnailLink || null}, ${file.webViewLink},
            ${new Date(file.createdTime)}, ${new Date(file.modifiedTime)}
          )
        `
        synced++
      }
    } catch (error) {
      console.error('Error upserting file:', error)
    }
  }

  return { synced, skipped }
}

export async function markFolderSynced(folderId: string) {
  await sql`
    UPDATE google_drive_folders SET last_synced_at = now() WHERE id = ${folderId}
  `
}

export async function refreshDriveToken(refreshToken: string) {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  })
  
  if (!response.ok) {
    throw new Error(`Token refresh failed: ${response.statusText}`)
  }
  
  return await response.json()
}

export function extractFolderIdFromUrl(url: string): string | null {
  const patterns = [
    /\/folders\/([a-zA-Z0-9-_]+)/,
    /id=([a-zA-Z0-9-_]+)/,
    /^([a-zA-Z0-9-_]+)$/
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  
  return null
}