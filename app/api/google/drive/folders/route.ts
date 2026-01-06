import { NextRequest, NextResponse } from 'next/server'
import { saveDriveFolder, getDriveFolders, extractFolderIdFromUrl } from '@/lib/google-drive'

export async function POST(request: NextRequest) {
  try {
    const { driveAccountId, folderUrl, folderName, folderType, bookingId, userId, accessLevel } = await request.json()
    
    const folderId = extractFolderIdFromUrl(folderUrl)
    if (!folderId) {
      return NextResponse.json({ error: 'Invalid Google Drive folder URL' }, { status: 400 })
    }

    const folderDbId = await saveDriveFolder({
      driveAccountId,
      folderId,
      folderName,
      folderUrl,
      folderType,
      bookingId,
      userId,
      accessLevel
    })

    return NextResponse.json({ success: true, folderId: folderDbId })
  } catch (error) {
    console.error('Save Drive folder error:', error)
    return NextResponse.json({ error: 'Failed to save folder' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') as 'gallery' | 'client' | null
    const userId = searchParams.get('userId')

    const folders = await getDriveFolders(type || undefined, userId ? parseInt(userId) : undefined)
    return NextResponse.json({ folders })
  } catch (error) {
    console.error('Get Drive folders error:', error)
    return NextResponse.json({ error: 'Failed to get folders' }, { status: 500 })
  }
}