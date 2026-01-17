# Wedding Vibes Photography - Complete Business Management System

A comprehensive wedding photography business management platform built with Next.js 14, featuring a modern client-facing website and a powerful admin dashboard for complete business operations.

## 🌟 Key Features

### 📱 Client Website
- **Modern Portfolio**: Responsive photography showcase
- **Service Packages**: Detailed pricing and service information
- **Contact Forms**: Professional inquiry and booking system
- **Gallery**: Dynamic photo galleries with categories
- **SEO Optimized**: Complete meta tags and structured data
- **Mobile-First**: Optimized for all devices
- **User Authentication**: Google OAuth integration
- **Booking System**: Real-time booking with email notifications

### 🎛️ Admin Dashboard
- **User Management**: Complete client database from PostgreSQL
- **Booking System**: Real-time booking management with approval workflow
- **Email Notifications**: Automated booking confirmations and approvals
- **Database Integration**: Full PostgreSQL integration with Neon
- **Real-time Updates**: Live data with refresh functionality
- **Toast Notifications**: User-friendly feedback system
- **Loading States**: Professional UX with loading indicators

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Database**: PostgreSQL with Neon (Cloud)
- **ORM**: Drizzle ORM with migrations
- **Styling**: Tailwind CSS with custom animations
- **Authentication**: NextAuth.js with Google OAuth
- **Email**: Nodemailer with Gmail SMTP
- **Notifications**: React Hot Toast
- **Icons**: Lucide React
- **TypeScript**: Full type safety throughout
- **Deployment**: Vercel-ready

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/wedding-vibes-photography.git
   cd wedding-vibes-photography
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Copy `.env.example` to `.env.local` and fill in your values:
   ```bash
   cp .env.example .env.local
   ```
   
   Required environment variables:
   - `DATABASE_URL`: Your Neon PostgreSQL connection string
   - `NEXTAUTH_SECRET`: Random secret for NextAuth
   - `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: Google OAuth credentials
   - `EMAIL_SERVER_*`: Gmail SMTP configuration
   - `EMAILJS_*`: EmailJS configuration (optional)

4. **Set up the database**
   ```bash
   npm run db:migrate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - **Client Website**: `http://localhost:3000`
   - **User Bookings**: `http://localhost:3000/my-bookings`
   - **Admin Dashboard**: `http://localhost:3000/admin`
   - **Admin Credentials**: 
     - Email: `weddingxvibes@gmail.com`
     - Password: `Uday@123`

## 🎨 Customization

### Business Information
- Update photographer details in `app/head.tsx`
- Modify contact information across components
- Replace sample data in database files (`lib/*-db.ts`)
- Update social media links and business hours

### Branding
- Edit colors in `tailwind.config.js`
- Replace logo and brand assets in `public/`
- Update meta tags and SEO information
- Customize package pricing and features

### Admin Configuration
- Change admin credentials in `app/admin/page.tsx`
- Modify sample data in database files
- Customize dashboard stats and metrics
- Update business-specific terminology

## 🗄️ Database Structure

The application uses PostgreSQL (Neon) with the following tables:

- **users**: User authentication and profile information
- **bookings**: Booking requests with status tracking and email notifications
- **otp_codes**: Email verification codes
- **photos**: Portfolio and client photo management

All tables include:
- Full CRUD operations
- Real-time updates
- Proper relationships and constraints
- Automatic timestamps

## 🎯 Admin Dashboard Features

### User Management
- Complete client database with contact information
- Status tracking (new, contacted, quoted, booked, completed)
- Priority management and filtering
- Detailed user profiles with modal views

### Booking System
- Inquiry management with status updates
- Meeting scheduling with calendar integration
- Direct communication tools (call/email)
- Booking approval workflow

### Photo Management
- Dynamic folder creation for different event types
- Bulk photo upload with compression
- Category organization and tagging
- Gallery sharing and privacy controls

## 📱 Mobile-First Design

- **Responsive Admin**: Full mobile admin dashboard
- **Touch Optimized**: Touch-friendly interface elements
- **Hamburger Navigation**: Mobile-first navigation system
- **Responsive Grids**: Adaptive layouts for all screen sizes
- **No Horizontal Scroll**: Proper responsive implementation

## 🚀 Production Deployment

### Vercel Deployment (Recommended)
1. **Connect to Vercel**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Set Environment Variables**
   Add all variables from `.env.local` to Vercel dashboard

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Manual Deployment
```bash
npm run build
npm start
```

### Environment Setup
- Configure all environment variables in production
- Set up Neon PostgreSQL database
- Configure Google OAuth for production domain
- Set up Gmail SMTP for email notifications
- Run database migrations: `npm run db:migrate`

### Performance Features
- Next.js automatic optimization
- PostgreSQL connection pooling
- Image compression and lazy loading
- Code splitting and tree shaking
- Real-time toast notifications

## 📊 Business Features

- **Real-time Booking Management**: Live booking status updates
- **Email Automation**: Automatic booking confirmations and approvals
- **User Authentication**: Secure Google OAuth login
- **Admin Dashboard**: Complete business management interface
- **Database Integration**: Reliable PostgreSQL data storage
- **Mobile Responsive**: Works perfectly on all devices
- **Toast Notifications**: User-friendly feedback system

## 🔐 Security Features

- **NextAuth.js**: Secure authentication with Google OAuth
- **PostgreSQL**: Secure database with proper relationships
- **Environment Variables**: Secure configuration management
- **Input Validation**: Server-side validation for all forms
- **HTTPS Ready**: SSL/TLS encryption support
- **XSS Protection**: Built-in Next.js security features

## 📁 Project Structure

```
wedding-vibes-photography/
├── app/                           # Next.js app directory
│   ├── admin/                     # Admin dashboard
│   │   ├── dashboard/             # Dashboard pages
│   │   │   ├── bookings/          # Booking management
│   │   │   ├── users/             # User management
│   │   │   ├── photos/            # Photo management
│   │   │   ├── calendar/          # Calendar system
│   │   │   ├── packages/          # Package management
│   │   │   └── gallery/           # Gallery management
│   │   └── page.tsx               # Admin login
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Client website
├── components/                    # React components
│   ├── admin/                     # Admin components
│   │   ├── MobileLayout.tsx       # Admin layout
│   │   └── LoadingSpinner.tsx     # Loading components
│   └── [client-components]        # Client website components
├── lib/                           # Database & utilities
│   ├── users-db.ts                # User database
│   ├── bookings-db.ts             # Booking database
│   ├── calendar-db.ts             # Calendar database
│   ├── packages-db.ts             # Package database
│   ├── gallery-db.ts              # Gallery database
│   ├── photos-db.ts               # Photo database
│   └── file-upload.ts             # File utilities
├── public/                        # Static assets
└── [config files]                 # Configuration files
```

## 🎯 Key Features

### Admin Authentication
- Secure login system
- Session management
- Protected routes
- Automatic logout

### Data Management
- Full CRUD operations
- Real-time updates
- Data persistence
- Sample data initialization

### Business Operations
- Lead management
- Booking workflow
- Calendar scheduling
- Package management
- Gallery organization

## 📈 Business Benefits

- **Streamlined Operations**: Centralized business management
- **Client Management**: Complete customer relationship tracking
- **Booking Efficiency**: Automated inquiry and scheduling system
- **Portfolio Management**: Dynamic photo organization
- **Analytics**: Real-time business performance metrics
- **Mobile Access**: Manage business from anywhere

## 🛠️ Development

### Adding New Features
1. Create database schema in `lib/[feature]-db.ts`
2. Add admin page in `app/admin/dashboard/[feature]/`
3. Update navigation in `components/admin/MobileLayout.tsx`
4. Initialize database in dashboard

### Database Operations
- All data stored in localStorage
- Full CRUD operations available
- Real-time UI updates
- Sample data for development

## 📞 Support & Contact

**Wedding Vibes Photography**
- 📧 Email: weddingxvibes@gmail.com
- 📱 Phone: +91-9425383179
- 📍 Location: Betul, Madhya Pradesh, India
- 📷 Instagram: @wedding_vibes_rp

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Next.js 14 for the robust framework
- Tailwind CSS for responsive styling
- React ecosystem for component architecture
- TypeScript for type safety

---

**Built with ❤️ for Wedding Vibes Photography - Complete Business Management Solution**