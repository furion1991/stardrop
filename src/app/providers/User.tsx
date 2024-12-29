'use client'

import { createContext, useEffect } from 'react'

import { useMe, type User } from '@/entities/user'
import { useAuth } from '@/shared/hooks/useAuth'

type UserContextProps = {
  user?: User
}

export const UserContext = createContext({} as UserContextProps)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { isAuth, setAuth } = useAuth()

  const {
    data: user,
    isLoading: isUserLoading,
    refetch: getUser
  } = useMe({
    enabled: true
  })

  useEffect(() => {
    if (!user || isUserLoading) return

    setAuth(true)
  }, [user, isUserLoading])

  useEffect(() => {
    if (!isAuth && !user) return

    getUser()
  }, [isAuth])

  return (
    <UserContext.Provider
      value={{
        user
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
