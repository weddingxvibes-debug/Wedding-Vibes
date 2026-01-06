import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export async function POST() {
  try {
    console.log('Running Google Drive migration...')
    
    // Create Google Drive tables
    await sql`
      CREATE TABLE IF NOT EXISTS google_drive_accounts (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT NOT NULL UNIQUE,
        refresh_token TEXT NOT NULL,
        access_token TEXT,
        token_expires_at timestamptz,
        created_at timestamptz DEFAULT now(),
        updated_at timestamptz DEFAULT now()
      )
    `
    
    await sql`
      CREATE TABLE IF NOT EXISTS google_drive_folders (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        drive_account_id uuid REFERENCES google_drive_accounts(id),
        folder_id TEXT NOT NULL,
        folder_name TEXT NOT NULL,
        folder_url TEXT,
        folder_type VARCHAR(20) DEFAULT 'gallery',
        booking_id INTEGER,
        user_id INTEGER,
        access_level VARCHAR(20) DEFAULT 'private',
        last_synced_at timestamptz,
        created_at timestamptz DEFAULT now()
      )
    `
    
    await sql`
      CREATE TABLE IF NOT EXISTS google_drive_files (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        drive_folder_id uuid REFERENCES google_drive_folders(id),
        file_id TEXT NOT NULL UNIQUE,
        file_name TEXT NOT NULL,
        mime_type TEXT NOT NULL,
        file_size BIGINT,
        download_url TEXT,
        thumbnail_url TEXT,
        web_view_link TEXT,
        created_time timestamptz,
        modified_time timestamptz,
        imported_at timestamptz DEFAULT now()
      )
    `
    
    return NextResponse.json({ success: true, message: 'Google Drive migration completed successfully!' })
  } catch (error) {
    console.error('Google Drive migration failed:', error)
    return NextResponse.json({ error: 'Migration failed' }, { status: 500 })
  }
}