import { API } from '@/shared/api'

import type { AuthProps } from './api.types'

export const checkIsEmailExist = async ({ email }: { email: string }) => {
  const { data } = await API.get<boolean>(`/exists/${email}`)

  return data
}

export const signUp = async ({ email, password }: AuthProps) => {
  return API.post('/auth/register', {
    email,
    password,
    role: 'User'
  })
}

export const signIn = ({ email, password }: AuthProps) => {
  return API.post('/auth/login', {
    email,
    password
  })
}

export const signOut = () => {
  return API.post('/auth/logout')
}
