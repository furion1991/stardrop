import Image from 'next/image'

import { PriceWithCurrency } from '@/shared/ui'

import { useBestDrop } from '../../model/useBestDrop'

import classes from './BestDroppedItem.module.scss'

type BestDroppedItemProps = {
  userId: string
}

export const BestDroppedItem = ({ userId }: BestDroppedItemProps) => {
  const { data: bestDrop, isLoading } = useBestDrop({ userId })

  if (isLoading || !bestDrop) return null

  return (
    <div className={classes.bestDroppedItem}>
      <p className={classes.title}>Лучший дроп</p>

      <div className={classes.image}>
        <Image src={bestDrop.image} width={73} height={73} alt={bestDrop.name} quality={100} />
      </div>

      <div className={classes.info}>
        <div className={classes.infoLeft}>
          <p>{bestDrop.name}</p>
          <p>{bestDrop.game}</p>
        </div>

        <div className={classes.price}>
          <PriceWithCurrency>{bestDrop.sellPrice}</PriceWithCurrency>
        </div>
      </div>
    </div>
  )
}
