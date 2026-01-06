import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { aboutImage } from '@/lib/schema'

export async function GET() {
  try {
    const [image] = await db.select().from(aboutImage).limit(1)
    
    if (!image) {
      return NextResponse.json({
        id: 'about-main',
        url: 'https://picsum.photos/600/800?random=100',
        alt: 'About Wedding Vibes Photography - Professional Wedding Photographer',
        updatedAt: new Date().toISOString()
      })
    }
    
    return NextResponse.json({
      id: 'about-main',
      url: image.url,
      alt: image.alt,
      updatedAt: image.updatedAt?.toISOString() || new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch about image' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { url, alt } = await request.json()
    
    const existing = await db.select().from(aboutImage).limit(1)
    
    if (existing.length > 0) {
      await db.update(aboutImage).set({
        url,
        alt,
        updatedAt: new Date()
      })
    } else {
      await db.insert(aboutImage).values({
        url,
        alt
      })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update about image' }, { status: 500 })
  }
}