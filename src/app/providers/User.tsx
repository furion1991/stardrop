'use client'

import { createContext, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { useMe, type User } from '@/entities/user'
import { useAuth } from '@/shared/hooks'

type InvokeAuthRedirectsProps = {
  isAuth: boolean
  user?: User
  isUserLoading: boolean
  pathname: string
}

type UserContextProps = {
  user?: User
  isUserLoading: boolean
}

export const UserContext = createContext({} as UserContextProps)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const { data: user, isLoading: isUserLoading, refetch: getUser } = useMe()
  const { isAuth, setAuth } = useAuth()

  const invokeAuthRedirects = ({
    user,
    isAuth,
    isUserLoading,
    pathname
  }: InvokeAuthRedirectsProps) => {
    const protectedRoutes = ['/profile', '/deposit']

    const userNotLoggedIn = !isAuth && !user && !isUserLoading

    if (userNotLoggedIn && pathname && protectedRoutes.includes(pathname)) {
      router.replace(`/auth-required?redirect_url=${pathname}`)
    }

    if (pathname === '/auth-required' && isAuth) {
      const redirectUrl = searchParams?.get('redirect_url')
      router.replace(redirectUrl || '/')
    }
  }

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

  useEffect(() => {
    if (!pathname) return

    invokeAuthRedirects({ user, isAuth, isUserLoading, pathname })
  }, [isAuth, user, isUserLoading])

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
