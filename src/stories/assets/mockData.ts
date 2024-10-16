import { TransactionTypes } from '@/types'

export const mockStatements = [
  { id: '1', amount: 100, date: '2024-09-01T10:06:21.614Z', type: 'transfer', balance: 900 },
  { id: '2', amount: 200, date: '2018-08-11T05:33:00.000Z', type: 'deposit', balance: 1100 },
  { id: '3', amount: 398, date: '2016-04-09T06:37:00.000Z', type: 'withdraw', balance: 702 },
  { id: '4', amount: 1890, date: '2022-01-01T19:37:00.000Z', type: 'deposit', balance: 2592 },
  { id: '5', amount: 2094, date: '2019-11-22T02:04:00.000Z', type: 'transfer', balance: 498 },
  { id: '6', amount: 150, date: '2024-06-01T16:23:00.000Z', type: 'withdraw', balance: 850 },
  { id: '7', amount: 250, date: '2023-07-15T08:02:00.000Z', type: 'deposit', balance: 1100 },
  { id: '8', amount: 320, date: '2023-08-10T03:08:00.000Z', type: 'withdraw', balance: 780 },
  { id: '9', amount: 460, date: '2023-05-21T22:49:00.000Z', type: 'deposit', balance: 1240 },
  { id: '10', amount: 780, date: '2023-04-09T02:19:00.000Z', type: 'transfer', balance: 460 },
  { id: '11', amount: 220, date: '2023-09-13T12:14:00.000Z', type: 'withdraw', balance: 680 },
  { id: '12', amount: 600, date: '2023-03-03T15:50:00.000Z', type: 'deposit', balance: 1280 },
]

//* add up all the deposits
export const deposits = mockStatements.reduce((acc, curr) => {
  if (curr.type === TransactionTypes.deposit) {
    return acc + curr.amount
  }
  return acc
}, 0)

//* add up all the withdrawals
export const withdrawals = mockStatements.reduce((acc, curr) => {
  if (curr.type === TransactionTypes.withdraw) {
    return acc + curr.amount
  }
  return acc
}, 0)

//* add up all the transfers
export const transfers = mockStatements.reduce((acc, curr) => {
  if (curr.type === TransactionTypes.transfer) {
    return acc + curr.amount
  }
  return acc
}, 0)

//* add up all the balance
export const balance = mockStatements[mockStatements.length - 1].balance
