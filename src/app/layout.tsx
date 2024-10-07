import cn from 'classnames'
import { Afacad, Playfair_Display } from 'next/font/google'

import { Header } from '@/components'
import Providers from '@/providers'

import './globals.scss'

const afacad = Afacad({ subsets: ['latin'], display: 'swap', adjustFontFallback: false })
const playfair = Playfair_Display({ subsets: ['latin'], display: 'swap', adjustFontFallback: false })

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={cn(afacad.className, playfair.className)}>
        <Providers>
          <Header />
          <main className="main">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
