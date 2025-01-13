'use client'

import { useMutation } from '@tanstack/react-query'
import { useSearchParams, useRouter } from 'next/navigation'

import { useAuth } from '@/shared/hooks/useAuth'
import { useAuthModal } from '@/shared/hooks/useAuthModal'
import { signIn } from '../api/auth'

export const useSignIn = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setAuth } = useAuth()
  const { closeModal } = useAuthModal()

  const redirectURL = searchParams?.get('redirect_url')

  return useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      setAuth(true)
      closeModal()

      if (redirectURL) {
        router.push(redirectURL)
      }
    }
  })
}
