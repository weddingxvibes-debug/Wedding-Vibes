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

### 🎛️ Admin Dashboard
- **User Management**: Complete client database with status tracking
- **Booking System**: Inquiry management with scheduling tools
- **Photo Management**: Dynamic folder creation and organization
- **Calendar**: Event scheduling and timeline management
- **Package Management**: Service pricing and feature control
- **Gallery Management**: Client gallery organization and sharing
- **Real-time Stats**: Business analytics and performance metrics

## 🚀 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom animations
- **Database**: LocalStorage with full CRUD operations
- **Authentication**: Custom admin authentication
- **Forms**: React Hook Form with validation
- **Icons**: Lucide React
- **TypeScript**: Full type safety throughout
- **Responsive**: Mobile-first design approach

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
   Create a `.env.local` file:
   ```env
   # EmailJS Configuration (Optional)
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_USER_ID=your_user_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - **Client Website**: `http://localhost:3000`
   - **Admin Dashboard**: `http://localhost:3000/admin`
   - **Admin Credentials**: 
     - Email: `udaypawar004@gmail.com`
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

The application uses localStorage for data persistence with the following databases:

- **Users**: Client information and lead management
- **Bookings**: Inquiry and booking status tracking
- **Calendar**: Event scheduling and timeline
- **Packages**: Service offerings and pricing
- **Gallery**: Client photo galleries
- **Photos**: Portfolio image organization

All databases include full CRUD operations and real-time updates.

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

### Build for Production
```bash
npm run build
npm start
```

### Environment Setup
- Configure environment variables for production
- Set up proper domain and SSL certificates
- Configure email services for contact forms
- Set up analytics and monitoring

### Performance Features
- Next.js automatic optimization
- Image compression and lazy loading
- Code splitting and tree shaking
- Responsive image delivery

## 📊 Business Analytics

- Real-time booking statistics
- User engagement tracking
- Calendar event management
- Package performance metrics
- Gallery view analytics
- Lead conversion tracking

## 🔐 Security Features

- Admin authentication system
- Input validation and sanitization
- XSS protection
- CSRF protection
- Secure data handling
- Environment variable protection

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
- 📧 Email: priyanshu@weddingvibes.com
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