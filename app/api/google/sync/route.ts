import { NextRequest, NextResponse } from 'next/server'
import { getGoogleAlbums, refreshAccessToken, updateGoogleTokens, upsertPhotosForAlbum, markAlbumSynced } from '@/lib/google-photos'

export async function POST(request: NextRequest) {
  try {
    const albums = await getGoogleAlbums()
    const syncResults = []

    for (const album of albums) {
      try {
        // Check if access token is expired
        let accessToken = album.access_token
        if (!accessToken || new Date(album.token_expires_at) < new Date()) {
          const tokenData = await refreshAccessToken(album.refresh_token)
          accessToken = tokenData.access_token
          await updateGoogleTokens(
            album.google_account_id,
            tokenData.access_token,
            new Date(Date.now() + tokenData.expires_in * 1000)
          )
        }

        // Sync photos from Google Photos
        let nextPageToken = null
        let totalSynced = 0
        let totalSkipped = 0

        do {
          const body: { albumId: string; pageSize: number; pageToken?: string } = {
            albumId: album.album_id,
            pageSize: 100,
            ...(nextPageToken && { pageToken: nextPageToken })
          }

          const response = await fetch('https://photoslibrary.googleapis.com/v1/mediaItems:search', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          })

          if (!response.ok) {
            throw new Error(`Google API error: ${response.status} ${response.statusText}`)
          }

          const data = await response.json()
          const mediaItems = data.mediaItems || []

          if (mediaItems.length > 0) {
            const result = await upsertPhotosForAlbum(album.id, mediaItems)
            totalSynced += result.synced
            totalSkipped += result.skipped
          }

          nextPageToken = data.nextPageToken
        } while (nextPageToken)

        await markAlbumSynced(album.id)
        syncResults.push({
          albumId: album.id,
          albumName: album.name,
          status: 'success',
          synced: totalSynced,
          skipped: totalSkipped
        })

      } catch (error) {
        console.error(`Sync error for album ${album.id}:`, error)
        syncResults.push({
          albumId: album.id,
          albumName: album.name,
          status: 'error',
          error: String(error).slice(0, 200)
        })
      }
    }

    return NextResponse.json({ results: syncResults })
  } catch (error) {
    console.error('Sync error:', error)
    return NextResponse.json({ error: 'Sync failed' }, { status: 500 })
  }
}