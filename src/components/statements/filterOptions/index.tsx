import cn from 'classnames'

import { StatementFilters } from '@/types'

import styles from './styles.module.scss'

interface FilterOptionsProps {
  handleFilter: (filter: StatementFilters) => void
  filter: StatementFilters
}

export default function FilterOptions({ handleFilter, filter }: FilterOptionsProps) {
  return (
    <div className={styles.filters}>
      <button
        onClick={() => handleFilter(StatementFilters.all)}
        className={cn({ [styles.active]: filter === StatementFilters.all })}
      >
        All
      </button>
      <button
        onClick={() => handleFilter(StatementFilters.deposit)}
        className={cn({ [styles.active]: filter === StatementFilters.deposit })}
      >
        Deposits
      </button>
      <button
        onClick={() => handleFilter(StatementFilters.withdrawal)}
        className={cn({ [styles.active]: filter === StatementFilters.withdrawal })}
      >
        Withdrawals
      </button>
    </div>
  )
}
