'use client'

import { useQuery } from '@tanstack/react-query'
import { getMe } from '../api/user'

type UseMeProps = {
  enabled: boolean
}

export const useMe = ({ enabled }: UseMeProps) => {
  return useQuery({
    queryFn: getMe,
    queryKey: ['me'],
    enabled
  })
}
