'use client'

import { useMutation } from '@tanstack/react-query'
import { useSearchParams, useRouter } from 'next/navigation'
import { AxiosError, AxiosResponse } from 'axios'

import { useAuth } from '@/shared/hooks'
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

type UseSignInProps = {
  onSuccess: () => void
}

export const useSignIn = ({ onSuccess }: UseSignInProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setAuth } = useAuth()

  const redirectURL = searchParams?.get('redirect_url')

  return useMutation<AxiosResponse<SignInResponse>, AxiosError<SignInError>, AuthProps>({
    mutationFn: signIn,
    onSuccess: () => {
      setAuth(true)
      onSuccess()

      if (redirectURL) {
        router.push(redirectURL)
      } else {
        router.replace(window.location.pathname)
      }
    }
  })
}
