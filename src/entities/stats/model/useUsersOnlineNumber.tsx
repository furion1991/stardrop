'use client'

import { useSignalR } from '@/shared/hooks'
import { SignalRKeys } from '@/shared/hooks/useSignalR'

export const useUsersOnlineNumber = () => {
  const { data: usersOnlineNumber } = useSignalR<number>(SignalRKeys.USERS_ONLINE)

  return {
    usersOnlineNumber
  }
}
