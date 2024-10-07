'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

import { ActiveTabContext, StatementsContext } from '@/contexts'

interface ProvidersProps {
  children?: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <StatementsContext>
        <ActiveTabContext>{children}</ActiveTabContext>
      </StatementsContext>
    </QueryClientProvider>
  )
}
