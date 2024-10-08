import { TransactionTypes, TransactionWithoutBalance } from '@/types'

const randomDate = (): string => {
  return new Date(
    Math.floor(Math.random() * 3) + 2022,
    Math.floor(Math.random() * 9),
    Math.floor(Math.random() * 28) + 1,
    Math.floor(Math.random() * 24),
    Math.floor(Math.random() * 60)
  ).toISOString()
}

const yesterday = (): string => {
  const date = new Date()
  date.setDate(date.getDate() - 1)
  return date.toISOString()
}

const randomAmount = (): number => Number((Math.random() * 10000).toFixed(2))

export const accountStatement: TransactionWithoutBalance[] = [
  {
    id: '9360e53a-7367-4124-b96b-8dae6575c880',
    date: new Date().toISOString(),
    amount: randomAmount(),
    type: TransactionTypes.deposit,
  },
  {
    id: '37e714c1-b40f-4d08-b362-5795f1885b2a',
    date: yesterday(),
    amount: randomAmount(),
    type: TransactionTypes.deposit,
  },
  {
    id: 'ce2b7393-7ddb-4c78-bbc0-d1319224585f',
    date: randomDate(),
    amount: randomAmount(),
    type: TransactionTypes.deposit,
  },
  {
    id: '7cb9ed16-e1fb-421c-8241-ca1b93f40911',
    date: randomDate(),
    amount: randomAmount(),
    type: TransactionTypes.withdraw,
  },
  {
    id: 'b040d366-e3f5-44e5-ae3d-5ba23cdd968d',
    date: randomDate(),
    amount: randomAmount(),
    type: TransactionTypes.deposit,
  },
  {
    id: 'ec11d8cb-7c64-43c3-9847-edf4d44fdd93',
    date: randomDate(),
    amount: randomAmount(),
    type: TransactionTypes.transfer,
  },
  {
    id: '3282e12a-83da-4385-bba7-510a02e85d99',
    date: randomDate(),
    amount: randomAmount(),
    type: TransactionTypes.deposit,
  },
  {
    id: '51009858-b518-469f-9e03-54a0e01b2efe',
    date: randomDate(),
    amount: randomAmount(),
    type: TransactionTypes.withdraw,
  },
  {
    id: '929bdea1-d661-48d5-8439-c18edc45d71e',
    date: randomDate(),
    amount: randomAmount(),
    type: TransactionTypes.deposit,
  },
  {
    id: '42dfba2b-f54a-463b-b7ab-0d12e7463a38',
    date: randomDate(),
    amount: randomAmount(),
    type: TransactionTypes.withdraw,
  },
  {
    id: 'ea385525-3818-48ac-93b5-e8d520200e06',
    date: randomDate(),
    amount: randomAmount(),
    type: TransactionTypes.deposit,
  },
  {
    id: 'eeb5f548-a351-41a2-a758-a6ab643d8a0c',
    date: randomDate(),
    amount: randomAmount(),
    type: TransactionTypes.transfer,
  },
  {
    id: '6ede18d7-22b7-4865-9f34-087f6775e2b2',
    date: randomDate(),
    amount: randomAmount(),
    type: TransactionTypes.deposit,
  },
  {
    id: 'f5981c60-c6f6-4610-9c98-1d3529c892c3',
    date: randomDate(),
    amount: randomAmount(),
    type: TransactionTypes.withdraw,
  },
  {
    id: 'e026de38-1b49-4e85-bc15-eeb6a10235a1',
    date: randomDate(),
    amount: randomAmount(),
    type: TransactionTypes.deposit,
  },
  {
    id: '7b0a546f-b978-4f24-8e18-84bca5077338',
    date: randomDate(),
    amount: randomAmount(),
    type: TransactionTypes.withdraw,
  },
  {
    id: 'cc6d5cfa-5ba7-4024-bbdb-a5714f5ed12b',
    date: randomDate(),
    amount: randomAmount(),
    type: TransactionTypes.deposit,
  },
  {
    id: 'a854028b-2daf-4333-8d04-69518e658e39',
    date: randomDate(),
    amount: randomAmount(),
    type: TransactionTypes.transfer,
  },
  {
    id: 'ebfae638-67f8-421a-8fe2-f41896177dec',
    date: randomDate(),
    amount: randomAmount(),
    type: TransactionTypes.deposit,
  },
  {
    id: 'f1d81e4c-732f-4f63-9228-be37d19e2720',
    date: randomDate(),
    amount: randomAmount(),
    type: TransactionTypes.deposit,
  },
  {
    id: 'bd48a10c-bbb9-459e-8124-30e17cdd7692',
    date: randomDate(),
    amount: randomAmount(),
    type: TransactionTypes.deposit,
  },
  {
    id: '12069ca8-c0dc-44b5-91da-fac030b8ed6a',
    date: randomDate(),
    amount: randomAmount(),
    type: TransactionTypes.transfer,
  },
]
export const accounts = ['ES91 2100 0418 4502 0005 1332']

export const recipientAccounts = [
  'FR14 2004 1010 0505 0001 3M02 606',
  'DE89370400440532013000',
  'GB29NWBK60161331926819',
  'FR7630006000011234567890189',
]
