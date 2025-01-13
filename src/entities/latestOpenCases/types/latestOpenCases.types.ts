import { LootRarity } from '@/entities/loot'

export type OpenedCase = {
  id: number
  rarity: LootRarity
  name: string
}
