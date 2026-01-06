import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

// Force dynamic rendering for admin routes
export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('=== ADMIN BOOKINGS API ===')  
    console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL)
    
    const sql = neon(process.env.DATABASE_URL!)
    const result = await sql`SELECT * FROM bookings ORDER BY created_at DESC`
    
    console.log('Raw bookings from DB:', JSON.stringify(result, null, 2))
    console.log('Total bookings:', result.length)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Admin fetch bookings error:', error)
    return NextResponse.json({ error: 'Failed to fetch bookings', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}