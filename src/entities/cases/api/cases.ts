import { API } from '@/shared/api'

import type { Case } from './cases.types'

export const getAllCases = async () => {
  const { data } = await API.get<Case[]>('/items/getall')

  return data
}
