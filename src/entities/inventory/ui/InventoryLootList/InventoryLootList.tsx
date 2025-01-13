'use client'

import { LootItem, LootRarity } from '@/entities/loot'
import { Button } from '@/shared/ui'
import { useUser } from '@/shared/hooks/useUser'

import classes from './InventoryLootList.module.scss'

export const InventoryLootList = () => {
  // const { user } = useUser()

  const inventory = [
    {
      rarity: LootRarity.COMMON,
      game: 'Melinor',
      name: 'Starned Corbem 1',
      state: 'sold' as const,
      price: 980
    },
    {
      rarity: LootRarity.RARE,
      game: 'Melinor',
      name: 'Starned Corbem 2',
      state: 'withdrawn' as const,
      price: 980
    },
    {
      rarity: LootRarity.SUPER_RARE,
      game: 'Melinor',
      name: 'Starned Corbem 3',
      price: 980
    },
    {
      rarity: LootRarity.EPIC,
      game: 'Melinor',
      name: 'Starned Corbem 4',
      price: 980
    },

    {
      rarity: LootRarity.MYTHICAL,
      game: 'Melinor',
      name: 'Starned Corbem 5',
      price: 980
    },
    {
      rarity: LootRarity.LEGENDARY,
      game: 'Melinor',
      name: 'Starned Corbem 6',
      price: 980
    }
  ]

  // if (!user) return 'Loading...'

  return (
    <ul className={classes.inventoryLootList}>
      {/* {user.userInventory.itemsUserInventory.map(({ id, itemId,  }) => {
        return (
          <li key={name}>
            <div className={classes.lootItem}>
              <LootItem
                rarity={rarity}
                game={game}
                name={name}
                state={state}
                price={price}
                imageSize={{
                  width: 146,
                  height: 73
                }}
              />

              <div className={classes.actions}>
                <Button>Продать</Button>

                <Button color='purple'>Вывести</Button>
              </div>
            </div>
          </li>
        )
      })} */}

      {inventory.map(({ rarity, game, name, state, price }) => {
        return (
          <li key={name}>
            <div className={classes.lootItem}>
              <LootItem
                rarity={rarity}
                game={game}
                name={name}
                state={state}
                price={price}
                imageSize={{
                  width: 146,
                  height: 73
                }}
              />

              <div className={classes.actions}>
                <Button>Продать</Button>

                <Button color='purple'>Вывести</Button>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
