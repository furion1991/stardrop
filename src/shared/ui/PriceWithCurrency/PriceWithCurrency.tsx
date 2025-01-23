import Image from 'next/image'

import classes from './PriceWithCurrency.module.scss'

type PriceWithCurrencyProps = {
  children: React.ReactNode
  image?: {
    width?: number
    height?: number
  }
}

export const PriceWithCurrency = ({ children, image }: PriceWithCurrencyProps) => {
  return (
    <span className={classes.priceWithCurrency}>
      {children}{' '}
      <Image
        src='/icons/logo-mini.svg'
        width={image?.width || 20}
        height={image?.height || 20}
        alt='Валюта'
      />
    </span>
  )
}
