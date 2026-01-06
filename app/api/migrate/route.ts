import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export async function POST() {
  try {
    console.log('Running database migration...')
    
    // Create gallery tables
    await sql`
      CREATE TABLE IF NOT EXISTS gallery_folders (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        slug VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMPTZ DEFAULT now()
      )
    `
    
    await sql`
      CREATE TABLE IF NOT EXISTS gallery_photos (
        id SERIAL PRIMARY KEY,
        folder_id INTEGER REFERENCES gallery_folders(id),
        url TEXT NOT NULL,
        alt VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        created_at TIMESTAMPTZ DEFAULT now()
      )
    `
    
    await sql`
      CREATE TABLE IF NOT EXISTS about_image (
        id SERIAL PRIMARY KEY,
        url TEXT NOT NULL,
        alt VARCHAR(255) NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT now()
      )
    `
    
    return NextResponse.json({ success: true, message: 'Migration completed successfully!' })
  } catch (error) {
    console.error('Migration failed:', error)
    return NextResponse.json({ error: 'Migration failed' }, { status: 500 })
  }
}