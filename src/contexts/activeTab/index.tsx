'use client'

import { usePathname } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

import { ActiveTabContextProps, ITab, TransactionTypes } from '@/types'

export const ActiveTabContext = createContext<ITab>({} as ITab)

export const useActiveTabContext = () => useContext(ActiveTabContext)

export const ActiveTabContextProvider: React.FC<ActiveTabContextProps> = ({ children }) => {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState<TransactionTypes>()

  useEffect(() => {
    const tab = pathname.split('/')[1] as TransactionTypes
    if (tab) setActiveTab(tab)
    else setActiveTab(undefined)
  }, [pathname])

  return <ActiveTabContext.Provider value={{ activeTab }}>{children}</ActiveTabContext.Provider>
}
