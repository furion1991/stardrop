'use client'

import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { createContext, useEffect, useState } from 'react'

type SignalRContextProps = {
  connection: HubConnection | null
}

export const SignalRContext = createContext({} as SignalRContextProps)

export const SignalRProvider = ({ children }: { children: React.ReactNode }) => {
  const [connection, setConnection] = useState<HubConnection | null>(null)

  const createHubConnection = () => {
    const connect = new HubConnectionBuilder()
      .withUrl(`${process.env.NEXT_PUBLIC_API_BASE}/statistics`, {
        withCredentials: false
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build()

    return connect
  }

  useEffect(() => {
    const connection = createHubConnection()

    connection
      .start()
      .then(() => {
        console.log('SignalR connection success')
      })
      .catch((err) => console.error('Error while connecting to SignalR Hub:', err))

    setConnection(connection)
  }, [])

  return (
    <SignalRContext.Provider
      value={{
        connection
      }}
    >
      {children}
    </SignalRContext.Provider>
  )
}
