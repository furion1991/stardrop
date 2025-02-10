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
  const { data: user, isLoading: isUserLoading, refetch: getUser } = useMe()
  const { isAuth, setAuth } = useAuth()

  // when /me return 401 and user logged in
  useEffect(() => {
    if (isAuth && !user) {
      getUser()
    }
  }, [isAuth])

  useEffect(() => {
    if (isUserLoading) return

    setAuth(Boolean(user))
  }, [user, isUserLoading])

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
