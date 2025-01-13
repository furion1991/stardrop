import { LootRarity } from '../types/loot.types'

export const convertRarity = (rarity: number) => {
  switch (rarity) {
    case 0:
      return LootRarity.COMMON
    case 1:
      return LootRarity.RARE
    case 2:
      return LootRarity.SUPER_RARE
    case 3:
      return LootRarity.EPIC
    case 4:
      return LootRarity.MYTHICAL
    case 5:
      return LootRarity.LEGENDARY
    default:
      return LootRarity.COMMON
  }
}
