'use client'

import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { createContext, useEffect, useState } from 'react'

type SignalRContextProps = {
  data: unknown
}

export const SignalRContext = createContext({} as SignalRContextProps)

export const SignalRProvider = ({ children }: { children: React.ReactNode }) => {
  const [connection, setConnection] = useState<HubConnection | null>(null)
  const [loggedInUsers, setLoggedInUsers] = useState<unknown>()

  // users_logged_in
  // cases_logs_by_cost
  // cases_logs
  // cases_opened_count

  useEffect(() => {
    const connect = new HubConnectionBuilder()
      .withUrl(`${process.env.NEXT_PUBLIC_API_BASE}/statistics`, {
        withCredentials: false
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build()

    setConnection(connect)

    connect.on('users_logged_in', (data) => {
      setLoggedInUsers(data)
    })

    connect
      .start()
      .then(() => {})
      .catch((err) => console.error('Error while connecting to SignalR Hub:', err))
  }, [])

  return (
    <SignalRContext.Provider
      value={{
        data: loggedInUsers
      }}
    >
      {children}
    </SignalRContext.Provider>
  )
}
