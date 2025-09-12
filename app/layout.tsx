import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'functions.codes - Web Tools Made Simple',
  description: 'A collection of powerful, easy-to-use web tools designed to boost your productivity. Fast, reliable, and built for everyone who needs quick solutions.',
  keywords: 'web tools, background removal, QR code generator, online tools, utilities, photo editor',
  authors: [{ name: 'functions.codes' }],
  creator: 'functions.codes',
  publisher: 'functions.codes',
  openGraph: {
    title: 'functions.codes - Web Tools Made Simple',
    description: 'A collection of powerful, easy-to-use web tools designed to boost your productivity.',
    url: 'https://functions.codes',
    siteName: 'functions.codes',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'functions.codes - Web Tools Made Simple',
    description: 'A collection of powerful, easy-to-use web tools designed to boost your productivity.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}