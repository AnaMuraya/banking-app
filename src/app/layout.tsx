import type { Metadata } from 'next'
import localFont from 'next/font/local'

import { Header } from '@/components'
import Providers from '@/providers'

import './globals.css'
import styles from './page.module.css' //!Fix styling

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Banking App',
  description: 'Banking made simpler',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <div className={styles.page}>
            {/* <Header /> */}
            <div className={styles.main}>{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
