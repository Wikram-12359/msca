"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

interface QueryProviderProps {  
  children: React.ReactNode
}

const QueryProvider = ({children}: QueryProviderProps) => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries:{
           staleTime: 1000 * 60 * 10,  // data is fresh for 10 min — no refetch
          gcTime: 1000 * 60 * 30,     // keep in cache for 30 min
          refetchOnWindowFocus: false, // don't refetch when tab regains focus
          refetchOnReconnect: false,   // don't refetch on network reconnect
          retry: 1,
      }
    }
  }))
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export default QueryProvider