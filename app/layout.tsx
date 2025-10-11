import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wedding Vibes Photography Betul | Best Wedding Photographer in Betul MP | Priyanshu Malviya',
  description: 'Professional wedding photographer in Betul, Madhya Pradesh. Priyanshu Malviya captures stunning Indian weddings, pre-wedding shoots, and events. Best photography services in Betul MP with 8+ years experience.',
  keywords: [
    // Location-based keywords
    'wedding photographer Betul', 'Betul wedding photography', 'photographer in Betul MP', 'Betul Madhya Pradesh photographer',
    'wedding photography Betul', 'pre wedding photographer Betul', 'candid photography Betul', 'event photographer Betul',
    'marriage photographer Betul', 'shaadi photographer Betul', 'destination wedding Betul', 'outdoor photography Betul',
    
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
    google: 'your-google-verification-code',
    other: {
      'facebook-domain-verification': 'your-facebook-verification-code'
    }
  },
  category: 'Photography Services',
  classification: 'Wedding Photography, Event Photography, Portrait Photography'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}