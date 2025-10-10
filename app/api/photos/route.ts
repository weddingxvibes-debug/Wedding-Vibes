import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { photos } from '@/lib/schema'
import { verifyToken } from '@/lib/auth'
import { eq } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = verifyToken(token) as any
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const userPhotos = await db.select().from(photos).where(eq(photos.userId, decoded.userId))
    return NextResponse.json(userPhotos)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch photos' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const decoded = verifyToken(token) as any
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const { userId, bookingId, url, caption } = await request.json()

    const [newPhoto] = await db.insert(photos).values({
      userId,
      bookingId,
      url,
      caption,
      uploadedBy: decoded.userId
    }).returning()

    return NextResponse.json(newPhoto)
  } catch (error) {
    return NextResponse.json({ error: 'Photo upload failed' }, { status: 500 })
  }
}