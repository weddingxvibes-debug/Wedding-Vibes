import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

// Encrypt/decrypt refresh tokens (basic implementation)
function encrypt(text: string): string {
  return Buffer.from(text).toString('base64')
}

function decrypt(encrypted: string): string {
  return Buffer.from(encrypted, 'base64').toString()
}

export async function saveGoogleAccount(data: {
  email: string
  refreshToken: string
  accessToken: string
  tokenScope: string
  expiresAt: Date
}) {
  const result = await sql`
    INSERT INTO google_accounts (email, refresh_token, access_token, token_scope, token_expires_at)
    VALUES (${data.email}, ${encrypt(data.refreshToken)}, ${data.accessToken}, ${data.tokenScope}, ${data.expiresAt})
    RETURNING id
  `
  return result[0]?.id
}

export async function getGoogleAccount(email: string) {
  const result = await sql`
    SELECT * FROM google_accounts WHERE email = ${email} LIMIT 1
  `
  if (result[0]) {
    return {
      ...result[0],
      refresh_token: decrypt(result[0].refresh_token)
    }
  }
  return null
}

export async function updateGoogleTokens(accountId: string, accessToken: string, expiresAt: Date) {
  await sql`
    UPDATE google_accounts 
    SET access_token = ${accessToken}, token_expires_at = ${expiresAt}, updated_at = now()
    WHERE id = ${accountId}
  `
}

export async function saveGoogleAlbum(data: {
  googleAccountId: string
  albumId?: string
  shareToken?: string
  name: string
  externalAlbumUrl?: string
}) {
  const result = await sql`
    INSERT INTO google_albums (google_account_id, album_id, share_token, name, external_album_url)
    VALUES (${data.googleAccountId}, ${data.albumId}, ${data.shareToken}, ${data.name}, ${data.externalAlbumUrl})
    RETURNING id
  `
  return result[0]?.id
}

export async function getGoogleAlbums() {
  return await sql`
    SELECT ga.*, gac.email as account_email
    FROM google_albums ga
    JOIN google_accounts gac ON ga.google_account_id = gac.id
    ORDER BY ga.created_at DESC
  `
}

export async function upsertPhotosForAlbum(albumId: string, mediaItems: any[]) {
  let synced = 0
  let skipped = 0

  for (const item of mediaItems) {
    try {
      const existing = await sql`
        SELECT id FROM photos WHERE google_media_id = ${item.id}
      `
      
      if (existing.length > 0) {
        skipped++
        continue
      }

      await sql`
        INSERT INTO photos (
          google_media_id, google_album_id, base_url, filename, 
          mime_type, width, height, description, imported_at
        ) VALUES (
          ${item.id}, ${albumId}, ${item.baseUrl}, ${item.filename},
          ${item.mimeType}, ${parseInt(item.mediaMetadata?.width) || 0}, 
          ${parseInt(item.mediaMetadata?.height) || 0}, ${item.description || ''}, now()
        )
      `
      synced++
    } catch (error) {
      console.error('Error upserting photo:', error)
    }
  }

  return { synced, skipped }
}

export async function markAlbumSynced(albumId: string) {
  await sql`
    UPDATE google_albums SET last_synced_at = now() WHERE id = ${albumId}
  `
}

export async function refreshAccessToken(refreshToken: string) {
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