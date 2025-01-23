'use client'

import { useMutation } from '@tanstack/react-query'
import { useSearchParams, useRouter } from 'next/navigation'
import { AxiosError, AxiosResponse } from 'axios'

import { useAuth } from '@/shared/hooks/useAuth'
import { useAuthModal } from '@/shared/hooks/useAuthModal'
import { signIn } from '../api/auth'

type SignInError = {
  error: string
  statusCode: number
}

type SignInResponse = {
  message: string
}

type AuthProps = {
  email: string
  password: string
}

export const useSignIn = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setAuth } = useAuth()
  const { closeModal } = useAuthModal()

  const redirectURL = searchParams?.get('redirect_url')

  return useMutation<AxiosResponse<SignInResponse>, AxiosError<SignInError>, AuthProps>({
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
