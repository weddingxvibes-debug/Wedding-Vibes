import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { galleryFolders, galleryPhotos } from '@/lib/schema'
import { eq } from 'drizzle-orm'

export async function POST(request: Request) {
  try {
    const { folderId, url, alt, category } = await request.json()
    
    const folder = await db.select().from(galleryFolders).where(eq(galleryFolders.slug, folderId)).limit(1)
    if (!folder.length) {
      return NextResponse.json({ error: 'Folder not found' }, { status: 404 })
    }
    
    const [photo] = await db.insert(galleryPhotos).values({
      folderId: folder[0].id,
      url,
      alt,
      category: category || folderId
    }).returning()
    
    return NextResponse.json(photo)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add photo' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const photoId = searchParams.get('id')
    
    if (!photoId) {
      return NextResponse.json({ error: 'Photo ID required' }, { status: 400 })
    }
    
    await db.delete(galleryPhotos).where(eq(galleryPhotos.id, parseInt(photoId)))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete photo' }, { status: 500 })
  }
}