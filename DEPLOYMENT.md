# Deployment Guide - Wedding Vibes Photography

This guide covers different deployment options for your photography portfolio website.

## 🚀 Deployment Options

### 1. Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications with zero configuration.

#### Prerequisites
- GitHub account
- Vercel account (free)
- Code pushed to GitHub repository

#### Steps
1. **Connect Repository**
   ```bash
   # Push your code to GitHub first
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure project settings:
     - Framework Preset: Next.js
     - Build Command: `npm run build`
     - Output Directory: `.next`

3. **Environment Variables**
   Add these in Vercel dashboard:
   ```
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_USER_ID=your_user_id
   INSTAGRAM_ACCESS_TOKEN=your_token
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   ```

4. **Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Configure DNS records as instructed

#### Automatic Deployments
- Every push to main branch triggers deployment
- Preview deployments for pull requests
- Rollback to previous versions easily

### 2. Netlify

Great alternative with excellent features for static sites.

#### Steps
1. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: out
   ```

2. **Add to package.json**
   ```json
   {
     "scripts": {
       "build": "next build && next export"
     }
   }
   ```

3. **Environment Variables**
   Add in Netlify dashboard under Site Settings → Environment Variables

4. **Deploy**
   - Connect GitHub repository
   - Configure build settings
   - Deploy automatically

### 3. AWS Amplify

Enterprise-grade hosting with AWS integration.

#### Steps
1. **Connect Repository**
   - Go to AWS Amplify Console
   - Connect GitHub repository
   - Choose branch to deploy

2. **Build Settings**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

3. **Environment Variables**
   Add in Amplify console under App Settings

### 4. Traditional Hosting

For shared hosting or VPS deployment.

#### Build for Production
```bash
npm run build
npm run start
```

#### Static Export (if needed)
```bash
# Add to next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

# Build and export
npm run build
```

#### Server Configuration

**Apache (.htaccess)**
```apache
RewriteEngine On
RewriteRule ^$ /index.html [L]
RewriteRule ^([^.]+)$ /$1.html [L]

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
```

**Nginx**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/your/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

## 🔧 Pre-Deployment Checklist

### Code Quality
- [ ] All TypeScript errors resolved
- [ ] ESLint warnings addressed
- [ ] Build completes successfully
- [ ] All tests passing (if any)

### Configuration
- [ ] Environment variables configured
- [ ] EmailJS integration tested
- [ ] Instagram API working (if used)
- [ ] Contact form functional

### Content
- [ ] All placeholder content replaced
- [ ] Images optimized for web
- [ ] Contact information updated
- [ ] Social media links correct

### Performance
- [ ] Lighthouse audit score > 90
- [ ] Images compressed and optimized
- [ ] Unused dependencies removed
- [ ] Bundle size optimized

### SEO
- [ ] Meta tags updated
- [ ] Sitemap generated
- [ ] Robots.txt configured
- [ ] Analytics tracking added

## 📊 Performance Optimization

### Image Optimization
```bash
# Install image optimization tools
npm install sharp

# Optimize images before deployment
npx sharp-cli --input ./public/images --output ./public/optimized --format webp --quality 80
```

### Bundle Analysis
```bash
# Analyze bundle size
npm install --save-dev @next/bundle-analyzer

# Add to next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)

# Run analysis
ANALYZE=true npm run build
```

### Caching Strategy
```javascript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

## 🔒 Security Configuration

### Content Security Policy
```javascript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.emailjs.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.emailjs.com;"
          }
        ]
      }
    ]
  }
}
```

### Environment Security
- Never commit `.env.local` to version control
- Use different environment variables for different stages
- Rotate API keys regularly
- Monitor for exposed secrets

## 📈 Monitoring and Analytics

### Google Analytics
```javascript
// Add to app/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### Error Monitoring
Consider integrating:
- Sentry for error tracking
- LogRocket for session replay
- Hotjar for user behavior

## 🚨 Troubleshooting Deployment Issues

### Common Problems

**Build Failures**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npm run type-check

# Verify build locally
npm run build
```

**Environment Variables Not Working**
- Ensure variables start with `NEXT_PUBLIC_` for client-side
- Check variable names match exactly
- Restart development server after changes

**Images Not Loading**
- Check Next.js image domains configuration
- Verify image paths are correct
- Ensure images are in public folder

**EmailJS Not Working**
- Test EmailJS configuration in dashboard
- Check browser console for errors
- Verify CORS settings

### Rollback Strategy
```bash
# Vercel rollback
vercel --prod --rollback

# Git rollback
git revert HEAD
git push origin main
```

## 📞 Support

### Getting Help
- Check deployment platform documentation
- Review build logs for errors
- Test locally before deploying
- Contact platform support if needed

### Maintenance
- Monitor site performance regularly
- Update dependencies monthly
- Backup important data
- Review security settings quarterly

---

**Ready to deploy?** Follow the checklist above and choose your preferred deployment method!