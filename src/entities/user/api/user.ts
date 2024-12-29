import { API } from '@/shared/api'

import type { UserResponse } from './user.types'

export const getMe = async () => {
  const { data } = await API.get<UserResponse>('/users/me')

  return data.result
}
