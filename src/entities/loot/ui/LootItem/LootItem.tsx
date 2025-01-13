import Image from 'next/image'
import cn from 'classnames'

import { LootRarity, LootRarityBox } from '@/entities/loot'

import classes from './LootItem.module.scss'

type LootItemProps = {
  className?: string
  image?: string
  rarity: LootRarity
  price?: number
  game: string
  name: string
  imageSize: {
    width: number
    height: number
    style?: React.CSSProperties
  }
  state?: 'sold' | 'withdrawn'
}

export const LootItem = ({
  className,
  image,
  rarity,
  price,
  game,
  name,
  state,
  imageSize
}: LootItemProps) => {
  return (
    <LootRarityBox className={cn(classes.lootItem, className)} rarity={rarity}>
      <div className={classes.topLine}>
        {state === 'sold' ? (
          <Image src='/icons/wallet-cyan.svg' width={22.73} height={22.73} alt='Кошелек' />
        ) : null}

        {state === 'withdrawn' ? (
          <Image src='/icons/square-arrow-up.svg' width={22.73} height={22.73} alt='Кошелек' />
        ) : null}

        {price ? (
          <div className={classes.price}>
            <span>{price}</span>
            <Image src='/icons/logo-mini.svg' width={20.26} height={19.8} alt='Валюта' />
          </div>
        ) : null}
      </div>

      <div className={classes.image}>
        <Image
          src={image ?? '/placeholders/case-loot.png'}
          width={imageSize.width}
          height={imageSize.height}
          style={imageSize.style}
          quality={100}
          alt={name}
        />
      </div>

      <p className={classes.game}>{game}</p>

      <p className={classes.name}>{name}</p>
    </LootRarityBox>
  )
}
