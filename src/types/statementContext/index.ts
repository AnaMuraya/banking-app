import { ReactNode } from 'react'

import { Transaction, TransactionTypes } from '../actions'

export type newStatement = {
  amount: number
  type: TransactionTypes
}

export interface Balance {
  balance: number
  deposits: number
  withdrawals: number
  transfers: number
}

export interface IStatements {
  statements: Transaction[]
  updateStatements: (statement: newStatement) => void
  balance: Balance
}

export interface StatementsContextProps {
  children: ReactNode
}
