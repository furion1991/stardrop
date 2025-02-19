'use client'

import { useMutation } from '@tanstack/react-query'
import { createContext, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { signOut } from '@/features/auth'

type AuthContextProps = {
  isAuth: boolean
  setAuth: (value: boolean) => void
  logout: () => void
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setAuth] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const { mutate: logout } = useMutation({
    mutationFn: signOut
  })

  const handleLogout = () => {
    logout()
    setAuth(false)

    if (pathname === '/profile') {
      router.push('/')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setAuth,
        logout: handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
