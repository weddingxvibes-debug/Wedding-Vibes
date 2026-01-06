CREATE TABLE IF NOT EXISTS "gallery_folders" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "gallery_folders_slug_unique" UNIQUE("slug")
);

CREATE TABLE IF NOT EXISTS "gallery_photos" (
	"id" serial PRIMARY KEY NOT NULL,
	"folder_id" integer,
	"url" text NOT NULL,
	"alt" varchar(255) NOT NULL,
	"category" varchar(100),
	"created_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "about_image" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"alt" varchar(255) NOT NULL,
	"updated_at" timestamp DEFAULT now()
);

DO $$ BEGIN
 ALTER TABLE "gallery_photos" ADD CONSTRAINT "gallery_photos_folder_id_gallery_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "gallery_folders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

-- Insert default folders
INSERT INTO "gallery_folders" ("name", "slug") VALUES 
('Weddings', 'weddings'),
('Pre-Wedding', 'pre-wedding'),
('Engagement', 'engagement')
ON CONFLICT (slug) DO NOTHING;

-- Insert default about image
INSERT INTO "about_image" ("url", "alt") VALUES 
('https://picsum.photos/600/800?random=100', 'About Wedding Vibes Photography - Professional Wedding Photographer')
ON CONFLICT DO NOTHING;