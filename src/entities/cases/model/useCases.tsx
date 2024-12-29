'use client'

import { useQuery } from '@tanstack/react-query'

import { getAllCases } from '../api/cases'

export const useCases = () => {
  return useQuery({
    queryKey: ['cases'],
    queryFn: getAllCases
  })
}
