'use client'

import { useQuery } from '@tanstack/react-query'
import { createContext, useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import ErrorTemplate from '@/components/errorTemplate'
import LoadingTemplate from '@/components/loadingTemplate'
import {
  Balance,
  IStatements,
  newStatement,
  SortOrderOptions,
  StatementsContextProps,
  Transaction,
  TransactionTypes,
} from '@/types'
import { sortByDate } from '@/utils'

const Context = createContext<IStatements>({} as IStatements)

export const useStatementsContext = () => useContext(Context)

export const StatementsContext: React.FC<StatementsContextProps> = ({ children }) => {
  const [statements, setStatements] = useState<Transaction[]>([])
  const [balance, setBalance] = useState<Balance>({
    balance: 0,
    deposits: 0,
    withdrawals: 0,
    transfers: 0,
  })

  const { isPending, isError, error } = useQuery({
    queryKey: ['statements'],
    queryFn: async () => {
      const data = await fetch('/api/statements')
      const statements = await data.json()

      const processedStatements = initializeStatements(statements.accountStatement)
      setStatements(processedStatements)

      return statements
    },
  })

  const updateStatements = (statement: newStatement): void => {
    let bal = balance.balance
    if (statement.type === TransactionTypes.deposit) bal += statement.amount
    else bal -= statement.amount

    let deposits = balance.deposits
    if (statement.type === TransactionTypes.deposit) deposits += statement.amount

    let withdrawals = balance.withdrawals
    if (statement.type === TransactionTypes.withdraw) withdrawals += statement.amount

    let transfers = balance.transfers
    if (statement.type === TransactionTypes.transfer) transfers += statement.amount

    setStatements(prev => [
      ...prev,
      {
        id: uuidv4(),
        amount: statement.amount,
        balance: bal,
        date: new Date().toISOString(),
        type: statement.type,
      },
    ])

    setBalance({
      balance: bal,
      deposits,
      withdrawals,
      transfers,
    })
  }

  const initializeStatements = (initialStatements: Transaction[]) => {
    const sortedStatements = sortByDate(initialStatements, SortOrderOptions.asc)

    let balance = 0
    const updatedStatements = sortedStatements.map(statement => {
      if (statement.type === TransactionTypes.deposit) balance += statement.amount
      else balance -= statement.amount

      return {
        ...statement,
        balance,
      }
    })

    setBalance({
      balance,
      deposits: updatedStatements
        .filter(statement => statement.type === TransactionTypes.deposit)
        .reduce((acc, curr) => acc + curr.amount, 0),
      withdrawals: updatedStatements
        .filter(statement => statement.type === TransactionTypes.withdraw)
        .reduce((acc, curr) => acc + curr.amount, 0),
      transfers: updatedStatements
        .filter(statement => statement.type === TransactionTypes.transfer)
        .reduce((acc, curr) => acc + curr.amount, 0),
    })

    return updatedStatements
  }

  if (isPending) return <LoadingTemplate />

  if (isError) return <ErrorTemplate error={error.message} />

  return (
    <Context.Provider
      value={{
        statements,
        updateStatements,
        balance,
      }}
    >
      {children}
    </Context.Provider>
  )
}
