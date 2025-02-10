import Image from 'next/image'
import cn from 'classnames'

import { LootRarity } from '@/entities/loot'

import classes from './LatestOpenCasesList.module.scss'

type Case = {
  key: string
  image: string
  name: string
  rarity: LootRarity
}

type LatestOpenCasesListProps = {
  cases: Case[]
}

export const LatestOpenCasesList = ({ cases }: LatestOpenCasesListProps) => {
  return (
    <ul className={classes.latestOpenCasesList}>
      {cases.map(({ key, rarity, image, name }) => {
        return (
          <li
            key={key}
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
              <Image src={image} width={54} height={54} alt={name} />
            </div>

            <p>{name}</p>

            <div className={cn(classes.angleCut, classes.left)} />
            <div className={cn(classes.angleCut, classes.right)} />
          </li>
        )
      })}
    </ul>
  )
}
