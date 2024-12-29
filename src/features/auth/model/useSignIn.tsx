'use client'

import { useMutation } from '@tanstack/react-query'

import { useAuth } from '@/shared/hooks/useAuth'
import { useAuthModal } from '@/shared/hooks/useAuthModal'
import { signIn } from '../api/auth'

export const useSignIn = () => {
  const { setAuth } = useAuth()
  const { closeModal } = useAuthModal()

  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      setAuth(true)
      closeModal()
    }
  })
}
