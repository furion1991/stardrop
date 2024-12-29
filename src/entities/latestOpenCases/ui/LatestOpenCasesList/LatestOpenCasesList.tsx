import { LastOpenedCaseItem } from '../LastOpenedCaseItem/LastOpenedCaseItem'

import { type OpenedCase, LootRarity } from '../../types/latestOpenCases.types'

import classes from './LatestOpenCasesList.module.scss'

export const LatestOpenCasesList = () => {
  const casesList: OpenedCase[] = [
    {
      id: 0,
      name: 'Dream Starter 1',
      rarity: LootRarity.COMMON
    },
    {
      id: 1,
      name: 'Dream Starter 2',
      rarity: LootRarity.RARE
    },
    {
      id: 2,
      name: 'Dream Starter 3',
      rarity: LootRarity.SUPER_RARE
    },
    {
      id: 3,
      name: 'Dream Starter 4',
      rarity: LootRarity.EPIC
    },
    {
      id: 4,
      name: 'Dream Starter 5',
      rarity: LootRarity.MYTHICAL
    },
    {
      id: 5,
      name: 'Dream Starter 6',
      rarity: LootRarity.LEGENDARY
    },
    {
      id: 6,
      name: 'Dream Starter 7',
      rarity: LootRarity.COMMON
    },
    {
      id: 7,
      name: 'Dream Starter 8',
      rarity: LootRarity.RARE
    },
    {
      id: 8,
      name: 'Dream Starter 9',
      rarity: LootRarity.SUPER_RARE
    },
    {
      id: 9,
      name: 'Dream Starter 10',
      rarity: LootRarity.EPIC
    },
    {
      id: 10,
      name: 'Dream Starter 11',
      rarity: LootRarity.MYTHICAL
    },
    {
      id: 11,
      name: 'Dream Starter 12',
      rarity: LootRarity.LEGENDARY
    }
  ]

  return (
    <div className={classes.latestOpenCasesList}>
      {casesList.map(({ id, rarity, name }) => (
        <LastOpenedCaseItem key={id} id={id} rarity={rarity} name={name} />
      ))}
    </div>
  )
}
