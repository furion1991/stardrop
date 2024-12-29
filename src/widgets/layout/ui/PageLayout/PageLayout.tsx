import { Header } from '@/widgets/header'
import { Footer } from '@/widgets/footer'

import classes from './PageLayout.module.scss'

type PageLayoutProps = {
  children: React.ReactNode
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className={classes.pageLayout}>
      <Header />

      <main>{children}</main>

      <Footer />
    </div>
  )
}
