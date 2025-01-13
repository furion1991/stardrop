'use client'

import { useQuery } from '@tanstack/react-query'

import { getCaseItem } from '../api/loot'

type UseCaseItemProps = {
  itemId: string
  enabled: boolean
}

export const useCaseItem = ({ itemId, enabled }: UseCaseItemProps) => {
  return useQuery({
    queryKey: ['case-item', itemId],
    queryFn: () => getCaseItem(itemId),
    enabled
  })
}
