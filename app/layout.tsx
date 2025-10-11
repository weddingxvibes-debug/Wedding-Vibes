import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Providers } from './providers'
import './globals.css'
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  metadataBase: new URL('https://weddingvibes.com'),
  title: 'Wedding Vibes Photography Betul | Best Wedding Photographer in Betul MP | Priyanshu Malviya',
  description: 'Professional wedding photographer in Betul, Madhya Pradesh. Priyanshu Malviya captures stunning Indian weddings, pre-wedding shoots, and events. Best photography services in Betul MP with 8+ years experience.',

  keywords: [
    // Primary local keywords
    'photography in betul', 'photo studio in betul', 'photographer in betul', 'betul photography',
    'wedding photographer Betul', 'Betul wedding photography', 'photographer in Betul MP', 'Betul Madhya Pradesh photographer',
    'wedding photography Betul', 'pre wedding photographer Betul', 'candid photography Betul', 'event photographer Betul',
    'marriage photographer Betul', 'shaadi photographer Betul', 'destination wedding Betul', 'outdoor photography Betul',
    'best photo studio betul', 'professional photography betul', 'betul photo studio', 'photography services betul',
    
    // Service-based keywords
    'Indian wedding photographer', 'Hindu wedding photography', 'traditional wedding photography', 'modern wedding photography',
    'pre wedding shoot', 'engagement photography', 'couple photography', 'bridal photography', 'groom photography',
    'wedding videography', 'cinematic wedding videos', 'wedding highlights', 'same day edit', 'drone photography',
    
    // Event types
    'Ganpati photography', 'festival photography', 'baby shower photography', 'birthday party photography',
    'corporate event photography', 'family photography', 'portrait photography', 'maternity photography',
    'anniversary photography', 'reception photography', 'mehendi photography', 'haldi photography',
    
    // Regional keywords
    'MP wedding photographer', 'Madhya Pradesh wedding photography', 'central India photographer', 'Bhopal photographer',
    'Jabalpur photographer', 'Indore photographer', 'Nagpur photographer', 'Raipur photographer',
    
    // Professional keywords
    'professional photographer Betul', 'experienced wedding photographer', 'affordable wedding photography',
    'best wedding photographer Betul', 'top photographer MP', 'creative photography Betul', 'artistic photography',
    
    // Equipment and style
    'DSLR photography', 'mirrorless camera', 'professional lighting', 'photo editing', 'album design',
    'digital photography', 'film photography', 'black and white photography', 'color photography',
    
    // Priyanshu Malviya specific
    'Priyanshu Malviya photographer', 'Wedding Vibes Photography', 'Priyanshu Malviya Betul', 'wedding_vibes_rp'
  ].join(', '),
  authors: [{ name: 'Priyanshu Malviya', url: 'https://instagram.com/wedding_vibes_rp' }],
  creator: 'Priyanshu Malviya',
  publisher: 'Wedding Vibes Photography',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  alternates: {
    canonical: 'https://weddingvibes.com'
  },
  openGraph: {
    title: 'Wedding Vibes Photography Betul | Best Wedding Photographer in Betul MP',
    description: 'Professional wedding photographer Priyanshu Malviya in Betul, Madhya Pradesh. Capturing beautiful Indian weddings, pre-wedding shoots, and events with 8+ years experience.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://weddingvibes.com',
    siteName: 'Wedding Vibes Photography',
    images: [
      {
        url: 'https://weddingvibes.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Wedding Vibes Photography - Best Wedding Photographer in Betul MP'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wedding Vibes Photography Betul | Best Wedding Photographer in Betul MP',
    description: 'Professional wedding photographer Priyanshu Malviya in Betul, Madhya Pradesh. Capturing beautiful moments with 8+ years experience.',
    creator: '@wedding_vibes_rp',
    images: ['https://weddingvibes.com/twitter-image.jpg']
  },
  verification: {
    google: 'google-site-verification-code-here',
    other: {
      'facebook-domain-verification': 'facebook-domain-verification-code-here',
      'msvalidate.01': 'bing-verification-code-here'
    }
  },
  manifest: '/manifest.json',
  category: 'Photography Services',
  classification: 'Wedding Photography, Event Photography, Portrait Photography'
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#7c3aed" />
        
        {/* Local Business Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://weddingvibes.com",
              "name": "Wedding Vibes Photography",
              "alternateName": "Photography in Betul",
              "description": "Professional photography studio in Betul, Madhya Pradesh. Best photo studio for weddings, pre-wedding shoots, and events.",
              "url": "https://weddingvibes.com",
              "telephone": "+91-9425383179",
              "email": "priyanshu@weddingvibes.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Betul",
                "addressRegion": "Madhya Pradesh",
                "postalCode": "460001",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "21.9081",
                "longitude": "77.8986"
              },
              "areaServed": [
                "Betul",
                "Madhya Pradesh",
                "Central India"
              ],
              "priceRange": "₹₹",
              "openingHours": "Mo-Su 09:00-20:00",
              "image": "https://weddingvibes.com/og-image.jpg",
              "logo": "https://weddingvibes.com/logo.png",
              "sameAs": [
                "https://instagram.com/wedding_vibes_rp"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Photography Services in Betul",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Wedding Photography in Betul",
                      "description": "Professional wedding photography services in Betul, MP"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Photo Studio Services Betul",
                      "description": "Complete photo studio services in Betul for all occasions"
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body className="antialiased">
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster position="top-right" />
            <Analytics />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}