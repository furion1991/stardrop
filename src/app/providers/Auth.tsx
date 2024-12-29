'use client'

import { createContext, useState } from 'react'

type AuthContextProps = {
  isAuth: boolean
  setAuth: (value: boolean) => void
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuth, setAuth] = useState(false)

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
