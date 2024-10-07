import { ReactNode } from 'react'

import { TransactionTypes } from '../actions'

export interface ITab {
  activeTab: TransactionTypes | undefined
  updateActiveTab: (currentTab: TransactionTypes) => void
}

export interface ActiveTabContextProps {
  children: ReactNode
}
