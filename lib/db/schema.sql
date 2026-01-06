-- Google Photos integration tables

-- google_accounts: store OAuth tokens (one per connected Google account)
CREATE TABLE google_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NULL, -- nullable if account not tied to a user
  email TEXT,
  refresh_token TEXT, -- encrypt in app
  access_token TEXT,
  token_scope TEXT,
  token_expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- google_albums: album config per account or shared-link
CREATE TABLE google_albums (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  google_account_id uuid REFERENCES google_accounts(id),
  album_id TEXT NULL,          -- Google albumId (if available)
  share_token TEXT NULL,       -- for shared album access if needed
  name TEXT,
  external_album_url TEXT NULL,
  last_synced_at timestamptz NULL,
  created_at timestamptz DEFAULT now()
);

-- Create missing gallery tables
CREATE TABLE IF NOT EXISTS gallery_folders (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS gallery_photos (
  id SERIAL PRIMARY KEY,
  folder_id INTEGER REFERENCES gallery_folders(id),
  url TEXT NOT NULL,
  alt VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS about_image (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  alt VARCHAR(255) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Update photos table to include Google Photos metadata
ALTER TABLE photos ADD COLUMN IF NOT EXISTS google_media_id TEXT UNIQUE;
ALTER TABLE photos ADD COLUMN IF NOT EXISTS google_album_id uuid REFERENCES google_albums(id);
ALTER TABLE photos ADD COLUMN IF NOT EXISTS base_url TEXT;
ALTER TABLE photos ADD COLUMN IF NOT EXISTS filename TEXT;
ALTER TABLE photos ADD COLUMN IF NOT EXISTS mime_type TEXT;
ALTER TABLE photos ADD COLUMN IF NOT EXISTS width INT;
ALTER TABLE photos ADD COLUMN IF NOT EXISTS height INT;
ALTER TABLE photos ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE photos ADD COLUMN IF NOT EXISTS imported_at timestamptz DEFAULT now();