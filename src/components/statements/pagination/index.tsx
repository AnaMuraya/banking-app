import { BiFirstPage, BiLastPage } from 'react-icons/bi'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'

import styles from './styles.module.scss'

interface PaginationProps {
  currentPage: number
  handleCurrentPage: (value: number) => void
  totalPages: number
}

export default function Pagination({ currentPage, handleCurrentPage, totalPages }: PaginationProps) {
  return (
    <div className={styles.pagination}>
      <button onClick={() => handleCurrentPage(1)} disabled={currentPage === 1} data-testid="first-page">
        <BiFirstPage />
      </button>

      <button
        onClick={() => handleCurrentPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage <= 1}
        data-testid="prev-page"
      >
        <GrFormPrevious />
      </button>

      <p>
        Page {currentPage} of {totalPages}
      </p>

      <button
        onClick={() => handleCurrentPage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage !== 0 && currentPage === totalPages}
        data-testid="next-page"
      >
        <GrFormNext />
      </button>

      <button
        onClick={() => handleCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
        data-testid="last-page"
      >
        <BiLastPage />
      </button>
    </div>
  )
}
