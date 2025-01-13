import Image from 'next/image'
import cn from 'classnames'

import { Button } from '@/shared/ui'

import classes from './CasePreview.module.scss'

type CasePreviewProps = {
  name: string
  image?: string
  price: number
  oldPrice: number
  openLimit: number
}

export const CasePreview = ({
  name,
  image = '/placeholders/case.png',
  price,
  oldPrice,
  openLimit
}: CasePreviewProps) => {
  const openedCasesNumber = 500
  const limitFillInPercentage = Number(Number((openedCasesNumber / openLimit) * 100).toFixed(2))

  return (
    <div className={classes.casePreview}>
      <div className={classes.image}>
        <Image src={image} width={328} height={315} alt={`Кейс ${name}`} />
      </div>

      <div className={classes.caseOpenLimits}>
        <span>
          {openedCasesNumber} / {openLimit}
        </span>

        <div
          className={cn(classes.fillGradient, {
            [classes.fillGradientFull]: limitFillInPercentage === 100
          })}
          style={{
            width: `${limitFillInPercentage}%`
          }}
        />
      </div>

      <h4 className={classes.name}>{name}</h4>

      <div className={classes.price}>
        <Button className={classes.priceBtn}>
          {price} <Image src='/icons/logo-mini.svg' width={18.42} height={18} alt='логотип' />
        </Button>

        <div className={classes.oldPrice}>
          {oldPrice} <Image src='/icons/logo-mini.svg' width={12.42} height={12} alt='логотип' />
        </div>
      </div>
    </div>
  )
}
