import { API } from '@/shared/api'

import type { Item } from './loot.types'

export const getCaseItem = (itemId: string) => {
  return API.get<Item>(`/items/get/${itemId}`)
}
