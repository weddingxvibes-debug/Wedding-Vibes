-- Google Drive integration tables

-- Replace google_photos tables with google_drive tables
DROP TABLE IF EXISTS google_albums CASCADE;
DROP TABLE IF EXISTS google_accounts CASCADE;

-- google_drive_accounts: store OAuth tokens for Google Drive
CREATE TABLE google_drive_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  refresh_token TEXT NOT NULL, -- encrypted
  access_token TEXT,
  token_expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- google_drive_folders: folder config for galleries and client bookings
CREATE TABLE google_drive_folders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  drive_account_id uuid REFERENCES google_drive_accounts(id),
  folder_id TEXT NOT NULL, -- Google Drive folder ID
  folder_name TEXT NOT NULL,
  folder_url TEXT, -- Share URL for reference
  folder_type VARCHAR(20) DEFAULT 'gallery', -- 'gallery' or 'client'
  booking_id INTEGER REFERENCES bookings(id), -- NULL for gallery folders
  user_id INTEGER REFERENCES users(id), -- NULL for gallery folders
  access_level VARCHAR(20) DEFAULT 'private', -- 'public', 'private'
  last_synced_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- google_drive_files: cached file metadata from Drive folders
CREATE TABLE google_drive_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  drive_folder_id uuid REFERENCES google_drive_folders(id),
  file_id TEXT NOT NULL UNIQUE, -- Google Drive file ID
  file_name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  file_size BIGINT,
  download_url TEXT, -- Direct download URL
  thumbnail_url TEXT, -- Thumbnail URL
  web_view_link TEXT, -- Web view URL
  created_time timestamptz,
  modified_time timestamptz,
  imported_at timestamptz DEFAULT now()
);