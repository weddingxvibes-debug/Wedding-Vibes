# Wedding Vibes Photography Portfolio

A modern, responsive photographer portfolio website built with Next.js, GSAP animations, and Tailwind CSS. Designed specifically for Indian wedding photographers with Instagram integration and professional contact forms.

## 🌟 Features

- **Modern Design**: Clean, professional layout optimized for photography portfolios
- **Responsive**: Mobile-first design that works on all devices
- **Dark/Light Mode**: Automatic theme detection with manual toggle
- **GSAP Animations**: Smooth, professional animations and scroll effects
- **Instagram Integration**: Fetch and display portfolio images from Instagram
- **Contact Form**: Professional contact form with EmailJS integration
- **Performance Optimized**: Fast loading with Next.js optimization
- **SEO Friendly**: Proper meta tags and structured data

## 🚀 Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Animations**: GSAP (GreenSock)
- **Forms**: React Hook Form
- **Email**: EmailJS
- **Icons**: Lucide React
- **Theme**: next-themes
- **TypeScript**: Full type safety

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/wedding-photographer-portfolio.git
   cd wedding-photographer-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # EmailJS Configuration
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_USER_ID=your_user_id

   # Instagram API (Optional)
   INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎨 Customization

### Brand Colors
Edit `tailwind.config.js` to change the color scheme:
```javascript
colors: {
  primary: {
    50: '#fdf2f8',
    500: '#ec4899',
    600: '#db2777',
  },
  gold: {
    400: '#fbbf24',
    500: '#f59e0b',
  }
}
```

### Content
- Update photographer information in components
- Replace placeholder images with actual portfolio images
- Modify services and pricing in `components/Services.tsx`
- Update contact information in `components/Contact.tsx` and `components/Footer.tsx`

### Instagram Integration
1. Set up Instagram Basic Display API
2. Get access token
3. Update `lib/instagram.ts` with your credentials
4. Replace mock data in `components/Portfolio.tsx`

## 📧 EmailJS Setup

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{phone}}`
   - `{{event_type}}`
   - `{{event_date}}`
   - `{{message}}`
4. Add your service ID, template ID, and user ID to `.env.local`

## 🎭 GSAP Animations

The website includes several GSAP animations:
- **Scroll Triggers**: Elements animate as they enter viewport
- **Page Load**: Hero section with staggered animations
- **Hover Effects**: Interactive image and button animations
- **Smooth Scrolling**: Enhanced scroll experience

### Adding Custom Animations
```javascript
useEffect(() => {
  gsap.fromTo('.your-element',
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.your-element',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    }
  )
}, [])
```

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Performance Optimization

- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic code splitting with Next.js
- **CSS Optimization**: Tailwind CSS purging unused styles
- **Bundle Analysis**: Use `npm run build` to analyze bundle size

## 📊 SEO Features

- Meta tags for social sharing
- Structured data for search engines
- Optimized images with alt tags
- Semantic HTML structure
- Fast loading times

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
- **Netlify**: Connect GitHub repo and deploy
- **AWS Amplify**: Use AWS hosting with CI/CD
- **Traditional Hosting**: Build with `npm run build` and upload `out` folder

## 📁 Project Structure

```
wedding-photographer-portfolio/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Hero.tsx           # Hero section
│   ├── Portfolio.tsx      # Portfolio gallery
│   ├── About.tsx          # About section
│   ├── Services.tsx       # Services section
│   ├── Testimonials.tsx   # Client testimonials
│   ├── Contact.tsx        # Contact form
│   └── Footer.tsx         # Footer
├── lib/                   # Utility functions
│   ├── instagram.ts       # Instagram API integration
│   └── emailjs.ts         # EmailJS integration
├── public/                # Static assets
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── package.json           # Dependencies
```

## 🎯 Key Components

### Portfolio Component
- Category filtering
- Lightbox modal for images/videos
- Instagram integration ready
- Responsive grid layout

### Contact Form
- Form validation with React Hook Form
- EmailJS integration
- Success/error states
- Professional styling

### Theme System
- Automatic system theme detection
- Manual dark/light toggle
- Smooth transitions
- Persistent user preference

## 🔒 Security

- Environment variables for sensitive data
- Form validation and sanitization
- No exposed API keys in client code
- HTTPS recommended for production

## 🐛 Troubleshooting

### Common Issues

1. **GSAP animations not working**
   - Ensure GSAP is properly imported
   - Check ScrollTrigger registration
   - Verify element selectors

2. **EmailJS not sending emails**
   - Check environment variables
   - Verify EmailJS service configuration
   - Test with EmailJS dashboard

3. **Instagram images not loading**
   - Verify access token validity
   - Check Instagram API rate limits
   - Ensure proper domain configuration

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Email: support@weddingvibes.com
- Documentation: Check README and code comments

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- GSAP for powerful animations
- Tailwind CSS for utility-first styling
- Unsplash for placeholder images
- Lucide for beautiful icons

---

**Built with ❤️ for photographers who want to showcase their work beautifully.**