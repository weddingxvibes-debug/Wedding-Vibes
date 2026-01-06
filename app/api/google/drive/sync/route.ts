import { NextRequest, NextResponse } from 'next/server'
import { getDriveFolders, refreshDriveToken, updateDriveTokens, upsertDriveFiles, markFolderSynced } from '@/lib/google-drive'

export async function POST(request: NextRequest) {
  try {
    const folders = await getDriveFolders()
    const syncResults = []

    for (const folder of folders) {
      try {
        // Check if access token is expired
        let accessToken = folder.access_token
        if (!accessToken || new Date(folder.token_expires_at) < new Date()) {
          const tokenData = await refreshDriveToken(folder.refresh_token)
          accessToken = tokenData.access_token
          await updateDriveTokens(
            folder.drive_account_id,
            tokenData.access_token,
            new Date(Date.now() + tokenData.expires_in * 1000)
          )
        }

        // Fetch files from Google Drive folder
        let nextPageToken = null
        let totalSynced = 0
        let totalSkipped = 0

        do {
          const params = new URLSearchParams({
            q: `'${folder.folder_id}' in parents and (mimeType contains 'image/' or mimeType contains 'video/')`,
            fields: 'nextPageToken,files(id,name,mimeType,size,webContentLink,thumbnailLink,webViewLink,createdTime,modifiedTime)',
            pageSize: '100'
          })
          
          if (nextPageToken) {
            params.append('pageToken', nextPageToken)
          }

          const response = await fetch(`https://www.googleapis.com/drive/v3/files?${params}`, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
          })

          if (!response.ok) {
            throw new Error(`Google Drive API error: ${response.status} ${response.statusText}`)
          }

          const data = await response.json()
          const files = data.files || []

          if (files.length > 0) {
            const result = await upsertDriveFiles(folder.id, files)
            totalSynced += result.synced
            totalSkipped += result.skipped
          }

          nextPageToken = data.nextPageToken
        } while (nextPageToken)

        await markFolderSynced(folder.id)
        syncResults.push({
          folderId: folder.id,
          folderName: folder.folder_name,
          status: 'success',
          synced: totalSynced,
          skipped: totalSkipped
        })

      } catch (error) {
        console.error(`Sync error for folder ${folder.id}:`, error)
        syncResults.push({
          folderId: folder.id,
          folderName: folder.folder_name,
          status: 'error',
          error: String(error).slice(0, 200)
        })
      }
    }

    return NextResponse.json({ results: syncResults })
  } catch (error) {
    console.error('Drive sync error:', error)
    return NextResponse.json({ error: 'Sync failed' }, { status: 500 })
  }
}