import type { Metadata } from 'next'
import cn from 'classnames'

import { AuthModalProvider, AuthProvider, QueryClientProvider, UserProvider } from '@/app/providers'
import { PageLayout } from '@/widgets/layout'

import { fontExo, fontExo2, fontRepublicaMinor } from '@/shared/assets/fonts'
import '@/app/styles/reset.css'
import '@/app/styles/variables.css'
import '@/app/styles/global.css'

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
        <QueryClientProvider>
          <AuthProvider>
            <UserProvider>
              <AuthModalProvider>
                <PageLayout>{children}</PageLayout>
              </AuthModalProvider>
            </UserProvider>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
