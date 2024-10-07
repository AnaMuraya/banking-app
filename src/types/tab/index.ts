import { ReactNode } from 'react'

import { TransactionTypes } from '../actions'

export interface ITab {
  activeTab: TransactionTypes | undefined
}

export interface ActiveTabContextProps {
  children: ReactNode
}
