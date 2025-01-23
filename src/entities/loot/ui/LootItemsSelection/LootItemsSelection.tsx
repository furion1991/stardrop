import Image from 'next/image'
import cn from 'classnames'

import { LootItem } from '../LootItem/LootItem'

import classes from './LootItemsSelection.module.scss'

type Item = {
  id: string
  game: string
  name: string
  rarity: number
  sellPrice: number
  image: string
}

type LootItemsSelectionProps = {
  items: Item[]
  selectedItem: Item | null
  onItemSelect: (item: Item) => void
}

export const LootItemsSelection = ({
  items,
  selectedItem,
  onItemSelect
}: LootItemsSelectionProps) => {
  return (
    <>
      {items.map(({ game, name, id, image, sellPrice, rarity }) => {
        return (
          <li
            key={id}
            className={classes.listItem}
            onClick={() => {
              onItemSelect({ game, name, id, image, sellPrice, rarity })
            }}
          >
            <LootItem
              className={classes.lootItem}
              name={name}
              image={image}
              price={sellPrice}
              rarity={rarity}
              game={game}
            />

            <div
              className={cn(classes.itemSelectedContainer, {
                [classes.selected]: selectedItem?.id === id
              })}
            >
              <Image src='/icons/checkmark-white.svg' width={73} height={73} alt='Галочка' />
            </div>
          </li>
        )
      })}
    </>
  )
}
