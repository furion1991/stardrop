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
        [classes.common]: rarity === LootRarity.COMMON,
        [classes.rare]: rarity === LootRarity.RARE,
        [classes.superRare]: rarity === LootRarity.SUPER_RARE,
        [classes.epic]: rarity === LootRarity.EPIC,
        [classes.mythical]: rarity === LootRarity.MYTHICAL,
        [classes.legendary]: rarity === LootRarity.LEGENDARY
      })}
    >
      {children}
    </div>
  )
}
