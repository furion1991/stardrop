import { LastOpenedCaseItem } from '../LastOpenedCaseItem/LastOpenedCaseItem'

import { type OpenedCase, LootRarity } from '../../types/latestOpenCases.types'

import classes from './LatestOpenCasesList.module.scss'

export const LatestOpenCasesList = () => {
  const casesList: OpenedCase[] = [
    {
      id: 0,
      name: 'Dream Starter',
      rarity: LootRarity.COMMON
    },
    {
      id: 1,
      name: 'Dream Starter',
      rarity: LootRarity.RARE
    },
    {
      id: 2,
      name: 'Dream Starter',
      rarity: LootRarity.SUPER_RARE
    },
    {
      id: 3,
      name: 'Dream Starter',
      rarity: LootRarity.EPIC
    },
    {
      id: 4,
      name: 'Dream Starter',
      rarity: LootRarity.MYTHICAL
    },
    {
      id: 5,
      name: 'Dream Starter',
      rarity: LootRarity.LEGENDARY
    }
    // {
    //   id: 6,
    //   name: 'Dream Starter',
    //   rarity: LootRarity.COMMON
    // },
    // {
    //   id: 7,
    //   name: 'Dream Starter',
    //   rarity: LootRarity.RARE
    // },
    // {
    //   id: 8,
    //   name: 'Dream Starter',
    //   rarity: LootRarity.SUPER_RARE
    // },
    // {
    //   id: 9,
    //   name: 'Dream Starter',
    //   rarity: LootRarity.EPIC
    // }
  ]

  return (
    <div className={classes.LatestOpenCasesList}>
      {casesList.map(({ id, rarity, name }) => (
        <LastOpenedCaseItem key={id} id={id} rarity={rarity} name={name} />
      ))}
    </div>
  )
}
