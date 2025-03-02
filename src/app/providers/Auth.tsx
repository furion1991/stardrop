'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createContext, useState, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { signOut, socialAuth } from '@/features/auth'

type AuthContextProps = {
  isAuth: boolean
  setAuth: (value: boolean) => void
  getTelegramAuthLink: () => string
  getVkAuthLink: () => Promise<string>
  logout: () => void
}

export const AuthContext = createContext({} as AuthContextProps)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient()
  const [isAuth, setAuth] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const { mutate: logout } = useMutation({
    mutationFn: signOut
  })

  const { mutate: authFromSocial } = useMutation({
    mutationFn: socialAuth,
    onSuccess: () => {
      setAuth(true)
      router.push(window.location.pathname)
    }
  })

  const telegramAuth = () => {
    const hash = window.location.hash
    const isTelegramHashExist = hash.startsWith('#tgAuthResult=')

    if (!isTelegramHashExist) return
    const hashValue = hash.split('=')[1]

    authFromSocial({
      provider: 'telegram',
      data: hashValue
    })
  }

  const vkAuth = () => {
    const state = localStorage.getItem('state')
    const deviceId = searchParams?.get('device_id')
    const codeVerifier = localStorage.getItem('codeVerifier')
    const code = searchParams?.get('code')

    if (!state || !deviceId || !codeVerifier || !code) return

    authFromSocial({
      provider: 'vk',
      vkData: {
        state,
        deviceId,
        codeVerifier,
        code
      }
    })
  }

  useEffect(() => {
    telegramAuth()
    vkAuth()
  }, [])

  const handleLogout = () => {
    logout()
    queryClient.removeQueries({
      queryKey: ['/me']
    })
    setAuth(false)

    if (pathname === '/profile') {
      router.push('/')
    }
  }

  const getTelegramAuthLink = () => {
    const botId = process.env.NEXT_PUBLIC_TELEGRAM_BOT_ID
    const scope = 'user'
    const nonce = Math.random().toString().substring(7)
    const redirectUri = 'https://stardrop.vercel.app'

    return (
      `https://oauth.telegram.org/auth` +
      `?bot_id=${botId}` +
      `&scope=${scope}` +
      `&nonce=${nonce}` +
      `&origin=${redirectUri}`
    )
  }

  const getVkAuthLink = async () => {
    const generateRandomString = (length: number) => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
      let result = ''
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      return result
    }

    const generateCodeChallenge = async (verifier: string) => {
      const encoder = new TextEncoder()
      const data = encoder.encode(verifier)
      const hashBuffer = await crypto.subtle.digest('SHA-256', data)
      const base64 = btoa(String.fromCharCode(...new Uint8Array(hashBuffer)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '')
      return base64
    }

    const clientId = process.env.NEXT_PUBLIC_VK_PROVIDER_CLIENT_ID
    const state = generateRandomString(32)
    const codeChallenge = generateCodeChallenge(generateRandomString(64))
    const redirectUri = 'https://stardrop.vercel.app/'

    localStorage.setItem('state', state)
    localStorage.setItem('codeVerifier', await codeChallenge)

    return (
      `https://id.vk.com/authorize` +
      `?response_type=code` +
      `&client_id=${clientId}` +
      `&redirect_uri=${redirectUri}` +
      `&state=${state}` +
      `&code_challenge=${await codeChallenge}` +
      `&code_challenge_method=S256` +
      `&scope=email` +
      `&v=5.131`
    )
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setAuth,
        getTelegramAuthLink,
        getVkAuthLink,
        logout: handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
