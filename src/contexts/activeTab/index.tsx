'use client'

import { usePathname } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

import { ActiveTabContextProps, ITab, TransactionTypes } from '@/types'

const Context = createContext<ITab>({} as ITab)

export const useActiveTabContext = () => useContext(Context)

export const ActiveTabContext: React.FC<ActiveTabContextProps> = ({ children }) => {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState<TransactionTypes>()

  useEffect(() => {
    const tab = pathname.split('/')[1] as TransactionTypes
    if (tab) setActiveTab(tab)
    else setActiveTab(undefined)
  }, [pathname])

  return <Context.Provider value={{ activeTab }}>{children}</Context.Provider>
}
