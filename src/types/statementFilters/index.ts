export enum StatementFilters {
  all = 'all',
  deposit = 'deposit',
  withdrawal = 'withdrawal',
  transfer = 'transfer',
}

export enum SortOrderOptions {
  asc = 'asc',
  desc = 'desc',
}

export interface FormInputs {
  senderAccountNumber?: string
  recipientAccountNumber?: string
  amount?: number
}
