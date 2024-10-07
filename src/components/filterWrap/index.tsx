'use client'

import { ReactNode, useEffect } from 'react'

import { useActiveTabContext } from '@/contexts'
import { TransactionTypes } from '@/types'

interface FilterProps {
  tab: TransactionTypes
  children: ReactNode
}

export default function FilterWrap({ tab, children }: FilterProps) {
  const { updateActiveTab } = useActiveTabContext()

  useEffect(() => {
    updateActiveTab(tab)
  }, [])

  return <div>{children}</div>
}
