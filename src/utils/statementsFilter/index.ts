import { formatDate } from '@/elements'
import { SortOrderOptions, StatementFilters, Transaction, TransactionTypes } from '@/types'

export const search = (searchTerm: string, data: Transaction[]) => {
  const searchTermLower = searchTerm.toLowerCase()

  return data.filter(
    entry =>
      entry.date.toLowerCase().includes(searchTermLower) ||
      formatDate(entry.date).toLowerCase().includes(searchTermLower) ||
      entry.amount.toString().includes(searchTermLower) ||
      entry.balance?.toString().includes(searchTermLower)
  )
}

export const filterByTransactionType = (filter: StatementFilters, data: Transaction[]) => {
  switch (filter) {
    case StatementFilters.deposit:
      return data.filter(entry => entry.type === TransactionTypes.deposit)
    case StatementFilters.withdrawal:
      return data.filter(entry => entry.type === TransactionTypes.withdraw)
    case StatementFilters.transfer:
      return data.filter(entry => entry.type === TransactionTypes.transfer)
    default:
      return data
  }
}

export const filterByDateRange = (startDate: string, endDate: string, data: Transaction[]) => {
  const start = new Date(startDate).getTime()
  const end = new Date(endDate).getTime()

  return data.filter(entry => {
    const entryDate = new Date(entry.date).getTime()

    if (!startDate) return entryDate <= end

    if (!endDate) return entryDate <= start

    return entryDate >= start && entryDate <= end
  })
}

/**
 * Sorts by date(default: latest date)
 * @param filteredData
 * @param sortOrder
 * @returns
 */
export const sortByDate = (filteredData: Transaction[], sortOrder: SortOrderOptions) => {
  return filteredData.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return sortOrder === 'desc' ? dateB - dateA : dateA - dateB
  })
}
