'use client'

import { useQuery } from '@tanstack/react-query'
import { createContext, useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { IStatements, newStatement, StatementsContextProps, Transaction } from '@/types'

const Context = createContext<IStatements>({} as IStatements)

export const useStatementsContext = () => useContext(Context)

export const StatementsContext: React.FC<StatementsContextProps> = ({ children }) => {
  const [statements, setStatements] = useState<Transaction[]>([])
  const [balance, setBalance] = useState<number>(0)

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['statements'],
    queryFn: async () => {
      let data = await fetch('/api/statements')
      let statements = await data.json()
      console.log('statements', statements)

      initializeStatements(statements.accountStatement)
      return statements
    },
  })

  const updateStatements = (statement: newStatement): void => {
    setStatements(prev => [
      ...prev,
      {
        id: uuidv4(),
        amount: statement.amount,
        balance: statement.balance,
        date: new Date().toISOString(),
        type: statement.type,
      },
    ])

    setBalance(statement.balance)
  }

  const initializeStatements = (initialStatements: Transaction[]) => {
    setStatements(initialStatements)

    const recentStatement = initialStatements[initialStatements.length - 1]
    setBalance(recentStatement.balance)
  }

  if (isPending) return <span>Loading...</span>

  if (isError) return <span>Error: {error.message}</span>

  return (
    <Context.Provider
      children={children}
      value={{
        statements,
        updateStatements,
        balance,
      }}
    />
  )
}
