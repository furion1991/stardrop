'use client'

import { useMutation } from '@tanstack/react-query'

import { useAuth } from '@/shared/hooks/useAuth'
import { useAuthModal } from '@/shared/hooks/useAuthModal'
import { signUp } from '../api/auth'

export const useSignUp = () => {
  const { setAuth } = useAuth()
  const { closeModal } = useAuthModal()

  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      setAuth(true)
      closeModal()
    }
  })
}
