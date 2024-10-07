import { Transaction } from '@/types'

import styles from '../styles.module.scss'

interface TableProps {
  processedData: Transaction[]
}

export default function Table({ processedData }: TableProps) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        {processedData.map((entry, index) => (
          <tr key={index}>
            <td>{entry.date}</td>
            <td>{entry.amount}</td>
            <td>{entry.balance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
