"use client"
import { SessionProvider } from "next-auth/react"
const Provider = ({children}: {children: React.ReactNode}) => {
  return (
    <SessionProvider refetchInterval={0}>
      {children}
    </SessionProvider>
  )
}

export default Provider