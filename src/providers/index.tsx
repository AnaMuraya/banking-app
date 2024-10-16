'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

import { ActiveTabContextProvider, StatementsContextProvider } from '@/contexts'

interface ProvidersProps {
  children?: ReactNode
}

//* Acts as a 'client-safe' wrapper to provide all the contexts required by the app

export default function Providers({ children }: ProvidersProps) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <StatementsContextProvider>
        <ActiveTabContextProvider>{children}</ActiveTabContextProvider>
      </StatementsContextProvider>
    </QueryClientProvider>
  )
}
