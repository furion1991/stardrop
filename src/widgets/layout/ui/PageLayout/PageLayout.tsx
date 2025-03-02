'use client'

import { Header } from '@/widgets/header'
import { Footer } from '@/widgets/footer'
import { MainLoadingIndicator } from '@/shared/ui'

import { useUser } from '@/shared/hooks'

import classes from './PageLayout.module.scss'
import { Suspense } from 'react'

type PageLayoutProps = {
  children: React.ReactNode
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  const { isUserLoading } = useUser()

  return (
    <div className={classes.pageLayout}>
      <Header />

      <Suspense fallback={<MainLoadingIndicator />}>
        <main>{!isUserLoading ? children : <MainLoadingIndicator />}</main>
      </Suspense>

      <Footer />
    </div>
  )
}
