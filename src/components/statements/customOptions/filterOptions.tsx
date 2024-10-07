import { StatementFilters } from '@/types'

import styles from '../styles.module.scss'

interface FilterOptionsProps {
  handleFilter: (filter: StatementFilters) => void
}

export default function FilterOptions({ handleFilter }: FilterOptionsProps) {
  return (
    <div className={styles.filters}>
      <button onClick={() => handleFilter(StatementFilters.all)}>All</button>
      <button onClick={() => handleFilter(StatementFilters.deposit)}>Deposits</button>
      <button onClick={() => handleFilter(StatementFilters.withdrawal)}>Withdrawals</button>
    </div>
  )
}
