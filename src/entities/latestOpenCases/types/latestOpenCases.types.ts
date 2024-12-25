export enum LootRarity {
  COMMON = 'common',
  RARE = 'rare',
  SUPER_RARE = 'super-rare',
  EPIC = 'epic',
  MYTHICAL = 'mythical',
  LEGENDARY = 'legendary'
}

export type OpenedCase = {
  id: number
  rarity: LootRarity
  name: string
}
