import { pgTable, serial, varchar, text, timestamp, boolean, integer } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 20 }),
  password: varchar('password', { length: 255 }),
  role: varchar('role', { length: 20 }).default('user'),
  emailVerified: boolean('email_verified').default(false),
  provider: varchar('provider', { length: 50 }).default('email'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
})

export const otpCodes = pgTable('otp_codes', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull(),
  code: varchar('code', { length: 6 }).notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  used: boolean('used').default(false),
  createdAt: timestamp('created_at').defaultNow()
})

export const bookings = pgTable('bookings', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  eventType: varchar('event_type', { length: 100 }).notNull(),
  date: varchar('date', { length: 20 }).notNull(),
  time: varchar('time', { length: 20 }).notNull(),
  venue: varchar('venue', { length: 255 }).notNull(),
  guests: integer('guests'),
  duration: varchar('duration', { length: 50 }),
  notes: text('notes'),
  status: varchar('status', { length: 20 }).default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
})

export const photos = pgTable('photos', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  bookingId: integer('booking_id').references(() => bookings.id),
  url: varchar('url', { length: 500 }).notNull(),
  caption: varchar('caption', { length: 255 }),
  uploadedBy: integer('uploaded_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow()
})