import { API } from '@/shared/api'

import type { Item } from './loot.types'

export const getCaseItem = async (itemId: string) => {
  const { data } = await API.get<Item>(`/items/get/${itemId}`)

  return data
}
