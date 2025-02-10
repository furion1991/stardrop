'use client'

import { useContext, useEffect, useState } from 'react'

import { SignalRContext } from '@/app/providers'

export enum SignalRKeys {
  USERS_ONLINE = 'users_logged_in',
  CASES_OPENED_NUMBER = 'cases_opened_count',
  LAST_OPENED_CASES = 'cases_logs',
  LAST_OPENED_CASES_TOP = 'cases_logs_by_cost'
}

export const useSignalR = <T,>(key: SignalRKeys) => {
  const { connection } = useContext(SignalRContext)
  // const [isLo  ading, setLoading] = useState(true)
  const [data, setData] = useState<T | null>(null)

  useEffect(() => {
    if (!connection) return

    connection.on(key, (data: T) => setData(data))
  }, [connection])

  return {
    data
  }
}
