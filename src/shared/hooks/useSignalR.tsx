'use client'

import { useContext } from 'react'

import { SignalRContext } from '@/app/providers'

export const useSignalR = () => {
  return useContext(SignalRContext)
}
