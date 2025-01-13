import Image from 'next/image'
import cn from 'classnames'

import type { OpenedCase } from '../../types/latestOpenCases.types'
import { LootRarity } from '@/entities/loot'

import classes from './LastOpenedCaseItem.module.scss'

export const LastOpenedCaseItem = ({ rarity, name }: OpenedCase) => {
  return (
    <div
      className={cn(classes.lastOpenedCaseItem, {
        [classes.common]: rarity === LootRarity.COMMON,
        [classes.rare]: rarity === LootRarity.RARE,
        [classes.superRare]: rarity === LootRarity.SUPER_RARE,
        [classes.epic]: rarity === LootRarity.EPIC,
        [classes.mythical]: rarity === LootRarity.MYTHICAL,
        [classes.legendary]: rarity === LootRarity.LEGENDARY
      })}
    >
      <div className={classes.image}>
        <Image src='/placeholders/case-loot.png' width={106} height={54} alt='содержимое кейса' />
      </div>

      <p>{name}</p>

      <div className={cn(classes.angleCut, classes.left)} />
      <div className={cn(classes.angleCut, classes.right)} />
    </div>
  )
}
