import cn from 'classnames'
import { Afacad, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { Metadata } from 'next'

import { Header } from '@/components'
import Providers from '@/providers'

import './globals.scss'

const afacad = Afacad({ subsets: ['latin'], display: 'swap', adjustFontFallback: false })
const playfair = Playfair_Display({ subsets: ['latin'], display: 'swap', adjustFontFallback: false })

export const metadata: Metadata = {
  title: 'Banking App',
  description: 'Banking made simpler',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={cn(afacad.className, playfair.className)}>
        <Analytics />
        <Providers>
          <Header />
          <main className="main">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
