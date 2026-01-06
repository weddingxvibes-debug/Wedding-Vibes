import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { galleryFolders, galleryPhotos } from '@/lib/schema'
import { eq } from 'drizzle-orm'

export async function GET() {
  try {
    const folders = await db.select().from(galleryFolders)
    const photos = await db.select().from(galleryPhotos)
    
    const foldersWithPhotos = folders.map(folder => ({
      id: folder.slug,
      name: folder.name,
      photos: photos.filter(photo => photo.folderId === folder.id).map(photo => ({
        id: photo.id.toString(),
        url: photo.url,
        alt: photo.alt,
        category: photo.category || folder.slug,
        createdAt: photo.createdAt?.toISOString() || new Date().toISOString()
      })),
      createdAt: folder.createdAt?.toISOString() || new Date().toISOString()
    }))
    
    return NextResponse.json(foldersWithPhotos)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch folders' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name } = await request.json()
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-')
    
    const [folder] = await db.insert(galleryFolders).values({
      name,
      slug
    }).returning()
    
    return NextResponse.json(folder)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create folder' }, { status: 500 })
  }
}