import { NextRequest, NextResponse } from 'next/server'
import { saveGoogleAlbum, getGoogleAlbums } from '@/lib/google-photos'

export async function POST(request: NextRequest) {
  try {
    const { googleAccountId, albumId, shareUrl, name } = await request.json()
    
    const albumDbId = await saveGoogleAlbum({
      googleAccountId,
      albumId,
      name,
      externalAlbumUrl: shareUrl
    })

    return NextResponse.json({ success: true, albumId: albumDbId })
  } catch (error) {
    console.error('Save album error:', error)
    return NextResponse.json({ error: 'Failed to save album' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const albums = await getGoogleAlbums()
    return NextResponse.json({ albums })
  } catch (error) {
    console.error('Get albums error:', error)
    return NextResponse.json({ error: 'Failed to get albums' }, { status: 500 })
  }
}