import { formatCurrency, formatDate } from '@/elements'
import { SortOrderOptions, Transaction, TransactionTypes } from '@/types'

import SortDate from './sortDate'

import styles from './styles.module.scss'

interface TableProps {
  processedData: Transaction[]
  toggleSortOrder: () => void
  sortOrder: SortOrderOptions
}

export default function Table({ processedData, toggleSortOrder, sortOrder }: TableProps) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>
            <div>
              Date
              <SortDate toggleSortOrder={toggleSortOrder} sortOrder={sortOrder} />
            </div>
          </th>
          <th className={styles.alignRight}>Amount</th>
          <th className={styles.alignRight}>Balance</th>
        </tr>
      </thead>

      <tbody>
        {processedData.map((entry, index) => (
          <tr key={index}>
            <td>{formatDate(entry.date)}</td>
            <td className={styles.alignRight}>
              {(entry.type === TransactionTypes.withdraw || entry.type === TransactionTypes.transfer) && '-'}$
              {formatCurrency(entry.amount.toString())}
            </td>
            <td className={styles.alignRight}>
              {entry.balance && entry.balance < 0
                ? `-$${formatCurrency(Math.abs(entry.balance).toString())}`
                : `$${formatCurrency(entry.balance?.toString() ?? '')}`}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
