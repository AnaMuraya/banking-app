export enum TransactionTypes {
  deposit = 'deposit',
  withdraw = 'withdraw',
  transfer = 'transfer',
}

export interface Transaction {
  id: string
  date: string
  balance: number
  amount: string
  type: TransactionTypes
}
