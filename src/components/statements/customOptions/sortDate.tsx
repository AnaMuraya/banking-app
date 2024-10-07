import { SortOrderOptions } from '@/types'

import styles from '../styles.module.scss'

interface SortDateProps {
  toggleSortOrder: () => void
  sortOrder: SortOrderOptions
}

export default function SortDate({ toggleSortOrder, sortOrder }: SortDateProps) {
  return (
    <button onClick={toggleSortOrder} className={styles.sortButton}>
      Sort by Date ({sortOrder === 'desc' ? 'Newest First' : 'Oldest First'})
    </button>
  )
}
