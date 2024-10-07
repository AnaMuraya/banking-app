import cn from 'classnames'
import { IoMdArrowRoundDown, IoMdArrowRoundUp } from 'react-icons/io'

import { SortOrderOptions } from '@/types'
import styles from './styles.module.scss'

interface SortDateProps {
  toggleSortOrder: () => void
  sortOrder: SortOrderOptions
}

export default function SortDate({ toggleSortOrder, sortOrder }: SortDateProps) {
  return (
    <button onClick={toggleSortOrder} className={styles.sortButton} data-testid="sort-button">
      <IoMdArrowRoundUp className={cn({ [styles.active]: sortOrder === SortOrderOptions.asc })} />
      <IoMdArrowRoundDown className={cn({ [styles.active]: sortOrder === SortOrderOptions.desc })} />
    </button>
  )
}
