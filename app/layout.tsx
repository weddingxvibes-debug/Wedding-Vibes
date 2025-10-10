import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wedding Vibes Photography | Indian Wedding Photographer',
  description: 'Professional Indian wedding photographer specializing in capturing beautiful moments. Expert in wedding photography, events, and celebrations.',
  keywords: 'Indian wedding photographer, wedding photography, event photography, celebration photography',
  authors: [{ name: 'Wedding Vibes Photography' }],
  openGraph: {
    title: 'Wedding Vibes Photography',
    description: 'Professional Indian wedding photographer capturing beautiful moments',
    type: 'website',
  }
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