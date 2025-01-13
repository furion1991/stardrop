import cn from 'classnames'

import { LootRarity } from '../../types/loot.types'

import classes from './LootRarityBox.module.scss'

type LootRarityBoxProps = {
  rarity: LootRarity
  className?: string
  children: React.ReactNode
}

export const LootRarityBox = ({ rarity, className, children }: LootRarityBoxProps) => {
  return <div className={cn(classes.lootRarityBox, classes[rarity], className)}>{children}</div>
}
