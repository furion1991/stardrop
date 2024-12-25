import type { Metadata } from 'next'
import { Exo, Exo_2 } from 'next/font/google'
import localFont from 'next/font/local'
import cn from 'classnames'

import { Header } from '@/widgets/header'

import '@/app/styles/reset.css'
import '@/app/styles/variables.css'
import '@/app/styles/global.css'

const fontExo = Exo({
  variable: '--font-exo',
  subsets: ['latin']
})

const fontExo2 = Exo_2({
  variable: '--font-exo2',
  subsets: ['latin']
})

const fontRepublicaMinor = localFont({
  src: '../public/fonts/RepublicaMinor.ttf',
  variable: '--font-republica-minor'
})

export const metadata: Metadata = {
  title: 'StarDrop',
  description: 'StarDrop'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ru'>
      <body className={cn(fontExo.variable, fontExo2.variable, fontRepublicaMinor.variable)}>
        <Header />

        {children}
      </body>
    </html>
  )
}
