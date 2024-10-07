'use client'

import { createContext, useContext, useState } from 'react'

import { ActiveTabContextProps, ITab, TransactionTypes } from '@/types'

const Context = createContext<ITab>({} as ITab)

export const useActiveTabContext = () => useContext(Context)

export const ActiveTabContext: React.FC<ActiveTabContextProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TransactionTypes>()

  const updateActiveTab = (currentTab: TransactionTypes) => setActiveTab(currentTab)

  return <Context.Provider value={{ activeTab, updateActiveTab }} children={children} />
}
