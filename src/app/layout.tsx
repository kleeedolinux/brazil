import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Ferramenta Brasil - Dashboard Financeiro',
    template: '%s | Ferramenta Brasil'
  },
  description: 'Dashboard financeiro do Brasil com informações em tempo real sobre Taxa SELIC, PIB e Câmbio USD/BRL. Acompanhe os principais indicadores econômicos brasileiros.',
  keywords: [
    'Brasil',
    'Economia',
    'Finanças',
    'Dashboard',
    'Taxa SELIC',
    'PIB Brasil',
    'Dólar',
    'Câmbio',
    'USD/BRL',
    'Banco Central',
    'COPOM',
    'Indicadores Econômicos'
  ],
  authors: [{ name: 'Klee', url: 'https://github.com/kleeedolinux' }],
  creator: 'Klee',
  publisher: 'Klee',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  metadataBase: new URL('https://ferramenta-brasil.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Ferramenta Brasil - Dashboard Financeiro',
    description: 'Acompanhe em tempo real os principais indicadores econômicos do Brasil: Taxa SELIC, PIB e Câmbio USD/BRL',
    url: 'https://ferramenta-brasil.vercel.app',
    siteName: 'Ferramenta Brasil',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ferramenta Brasil - Dashboard Financeiro'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ferramenta Brasil - Dashboard Financeiro',
    description: 'Acompanhe em tempo real os principais indicadores econômicos do Brasil',
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
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
  manifest: '/manifest.json',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    google: 'google-site-verification-code',
  },
  category: 'finance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="application-name" content="Ferramenta Brasil" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Ferramenta Brasil" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
