import type { Metadata } from 'next'
import { Manrope, Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Layr.plus - Stack your Ambition',
  description: 'The comprehensive suite for modern builders. Concept. Design. Code. Deploy. One seamless flow.',
  keywords: ['design', 'development', 'deployment', 'productivity', 'tools', 'stack'],
  authors: [{ name: 'Layr.plus' }],
  creator: 'Layr.plus',
  publisher: 'Layr.plus',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://layr.plus'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Layr.plus - Stack your Ambition',
    description: 'The comprehensive suite for modern builders. Concept. Design. Code. Deploy. One seamless flow.',
    url: 'https://layr.plus',
    siteName: 'Layr.plus',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Layr.plus',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Layr.plus - Stack your Ambition',
    description: 'The comprehensive suite for modern builders. Concept. Design. Code. Deploy. One seamless flow.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} ${inter.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

