import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { users } from '@/lib/schema'

// Force dynamic rendering for admin routes
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('Fetching users from database...')
    console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL)
    const allUsers = await db.select().from(users)
    console.log('Users fetched:', allUsers.length)
    return NextResponse.json(allUsers)
  } catch (error) {
    console.error('Admin fetch users error:', error)
    return NextResponse.json({ error: 'Failed to fetch users', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}