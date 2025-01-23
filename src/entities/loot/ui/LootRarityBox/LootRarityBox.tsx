import cn from 'classnames'

import { LootRarity } from '../../types/loot.types'

import classes from './LootRarityBox.module.scss'

type LootRarityBoxProps = {
  rarity: LootRarity
  className?: string
  children: React.ReactNode
}

export const LootRarityBox = ({ rarity, className, children }: LootRarityBoxProps) => {
  return (
    <div
      className={cn(classes.lootRarityBox, className, {
        [classes.common]: rarity === 0,
        [classes.rare]: rarity === 1,
        [classes.superRare]: rarity === 2,
        [classes.epic]: rarity === 3,
        [classes.mythical]: rarity === 4,
        [classes.legendary]: rarity === 5
      })}
    >
      {children}
    </div>
  )
}
