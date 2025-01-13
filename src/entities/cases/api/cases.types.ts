export type Case = {
  id: string
  name: string
  image: string
  type: number
  price: number
  openLimit: number
  discount: number
  oldPrice: number
  items: CaseItem[]
}

export type CaseItem = {
  id: string
  name: string
  type: number
  rarity: number
  baseCost: number
  sellPrice: number
  isVisible: boolean
  dropChance: number | null
  game: string
  image: string
}

export type GetAllCasesProps = {
  page?: number
  pageItems?: number
}
