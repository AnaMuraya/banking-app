import { ReactNode } from 'react'

import { Transaction, TransactionTypes } from '../actions'

export type newStatement = {
  amount: string
  balance: number
  type: TransactionTypes
}

export interface IStatements {
  statements: Transaction[]
  updateStatements: (statement: newStatement) => void
  balance: number
}

export interface StatementsContextProps {
  children: ReactNode
}
