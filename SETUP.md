# Wedding Vibes Photography - Setup Guide

This guide will help you set up and customize the Wedding Vibes Photography portfolio website.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Copy the example environment file:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your actual values:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_actual_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_actual_template_id
NEXT_PUBLIC_EMAILJS_USER_ID=your_actual_user_id
INSTAGRAM_ACCESS_TOKEN=your_instagram_token
```

### 3. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see your site.

## 📧 EmailJS Configuration

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Add Email Service
1. Go to Email Services
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Follow the setup instructions
5. Note your Service ID

### Step 3: Create Email Template
1. Go to Email Templates
2. Click "Create New Template"
3. Use this template structure:

```html
<h2>New Contact Form Submission - Wedding Vibes Photography</h2>

<p><strong>Name:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Phone:</strong> {{phone}}</p>
<p><strong>Event Location:</strong> {{address}}</p>
<p><strong>Event Type:</strong> {{event_type}}</p>
<p><strong>Event Date:</strong> {{event_date}}</p>

<h3>Message:</h3>
<p>{{message}}</p>

<hr>
<p><em>Sent from Wedding Vibes Photography website contact form</em></p>
```

4. Save and note your Template ID

### Step 4: Get User ID
1. Go to Account settings
2. Find your User ID (Public Key)
3. Add all IDs to your `.env.local` file

## 📸 Instagram Integration

### Option 1: Instagram Basic Display API (Recommended)

1. **Create Facebook App**
   - Go to [Facebook Developers](https://developers.facebook.com/)
   - Create new app
   - Add Instagram Basic Display product

2. **Configure Instagram Basic Display**
   - Add Instagram test user
   - Generate access token
   - Add token to `.env.local`

3. **Update Portfolio Component**
   - Replace mock data in `components/Portfolio.tsx`
   - Use `lib/instagram.ts` functions

### Option 2: Manual Upload (Simple)
1. Upload images to `public/portfolio/` folder
2. Update the portfolio data array in `components/Portfolio.tsx`
3. Replace Instagram links with your actual profile

## 🎨 Customization

### Brand Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    50: '#your-color-50',
    500: '#your-primary-color',
    600: '#your-primary-dark',
  }
}
```

### Logo and Branding
1. Replace camera icon in `components/Header.tsx`
2. Update business name throughout components
3. Add your logo to `public/` folder

### Content Updates

#### Contact Information
Update in these files:
- `components/Contact.tsx`
- `components/Footer.tsx`
- `components/Header.tsx`

#### Services and Pricing
- Edit `components/Services.tsx`
- Update service descriptions and prices
- Modify package features

#### About Section
- Update photographer story in `components/About.tsx`
- Replace team member information
- Update statistics and achievements

#### Testimonials
- Replace testimonial data in `components/Testimonials.tsx`
- Add real client reviews
- Update client photos

### Images
Replace placeholder images with your actual photos:
- Hero background
- About section photos
- Portfolio images
- Team member photos

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Netlify
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables
5. Deploy

### Traditional Hosting
1. Run `npm run build`
2. Upload `.next` folder contents
3. Configure web server for Next.js

## 📱 Testing

### Responsive Testing
Test on different devices:
- Mobile phones (iOS/Android)
- Tablets
- Desktop computers
- Different browsers

### Performance Testing
1. Run Lighthouse audit
2. Check Core Web Vitals
3. Test loading speeds
4. Optimize images if needed

### Contact Form Testing
1. Test EmailJS integration
2. Verify emails are received
3. Test form validation
4. Check auto-reply functionality

## 🔧 Maintenance

### Regular Updates
- Update dependencies monthly
- Refresh Instagram access token
- Update portfolio with new work
- Monitor contact form submissions

### Backup
- Regular code backups
- Database backups (if using)
- Image backups
- Environment variable backups

## 🐛 Troubleshooting

### Common Issues

**GSAP animations not working:**
- Check browser console for errors
- Ensure GSAP is properly imported
- Verify ScrollTrigger registration

**EmailJS not sending:**
- Check environment variables
- Verify EmailJS service status
- Test with EmailJS dashboard

**Images not loading:**
- Check image paths
- Verify Next.js image domains
- Check file permissions

**Instagram integration issues:**
- Verify access token validity
- Check API rate limits
- Ensure proper permissions

### Getting Help
- Check GitHub issues
- Review documentation
- Contact support: support@weddingvibes.com

## 📈 SEO Optimization

### Meta Tags
Update in `app/layout.tsx`:
- Title and description
- Open Graph tags
- Twitter cards
- Keywords

### Content Optimization
- Use descriptive alt tags for images
- Add structured data
- Optimize page loading speed
- Create quality content

### Local SEO
- Add Google My Business listing
- Include location-based keywords
- Add local schema markup
- Get local backlinks

## 🔒 Security

### Best Practices
- Keep dependencies updated
- Use environment variables for secrets
- Enable HTTPS in production
- Regular security audits

### Privacy
- Add privacy policy
- GDPR compliance if needed
- Cookie consent if required
- Data protection measures

---

**Need help?** Contact us at support@weddingvibes.com or create an issue on GitHub.