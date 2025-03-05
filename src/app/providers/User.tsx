'use client'

import { createContext, useEffect } from 'react'

import { useMe, type User } from '@/entities/user'
import { useAuth } from '@/shared/hooks'

type UserContextProps = {
  user?: User
  isUserLoading: boolean
}

export const UserContext = createContext({} as UserContextProps)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isLoading: isUserLoading, refetch: refetchUser } = useMe()
  const { isAuth, setAuth } = useAuth()

  // when /me returned 401 and user logged in
  useEffect(() => {
    if (isAuth && !user) {
      refetchUser()
    }
  }, [isAuth])

  useEffect(() => {
    setAuth(Boolean(user))
  }, [user])

  return (
    <UserContext.Provider
      value={{
        user,
        isUserLoading
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
