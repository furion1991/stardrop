'use client'

import { createContext, useState } from 'react'

import { AuthModal } from '@/features/auth'

type AuthModalContextProps = {
  isOpen: boolean
  openAuthModal: () => void
  closeModal: () => void
}

export const AuthModalContext = createContext({} as AuthModalContextProps)

export const AuthModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false)

  return (
    <AuthModalContext.Provider
      value={{
        isOpen: isAuthModalOpen,
        openAuthModal: () => {
          setAuthModalOpen(true)
        },
        closeModal: () => {
          setAuthModalOpen(false)
        }
      }}
    >
      {children}

      <AuthModal
        open={isAuthModalOpen}
        onClose={() => {
          setAuthModalOpen(false)
        }}
      />
    </AuthModalContext.Provider>
  )
}
