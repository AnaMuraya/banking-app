export enum TransactionTypes {
  deposit = 'deposit',
  withdraw = 'withdraw',
  transfer = 'transfer',
}

export interface TransactionWithoutBalance {
  id: string
  date: string
  amount: number
  type: TransactionTypes
}

export interface Transaction extends TransactionWithoutBalance {
  balance: number
}
