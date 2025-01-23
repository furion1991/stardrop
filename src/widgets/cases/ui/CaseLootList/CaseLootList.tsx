import { LootItem } from '@/entities/loot'

import classes from './CaseLootList.module.scss'

type Loot = {
  id: string
  name: string
  rarity: number
  isVisible: boolean
  game: string
  image: string
}

type CaseLootListProps = {
  loot: Loot[]
}

export const CaseLootList = ({ loot }: CaseLootListProps) => {
  const sortByRarirty = (items: Loot[]) => {
    return items.sort((a, b) => b.rarity - a.rarity)
  }

  return (
    <ul className={classes.caseLootList}>
      {sortByRarirty(loot.filter(({ isVisible }) => isVisible)).map(
        ({ id, name, rarity, game, image }) => {
          return (
            <li key={id}>
              <LootItem
                className={classes.lootItem}
                game={game}
                image={image}
                name={name}
                rarity={rarity}
              />
            </li>
          )
        }
      )}
    </ul>
  )
}
