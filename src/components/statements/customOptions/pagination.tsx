import styles from '../styles.module.scss'

interface PaginationProps {
  currentPage: number
  handleCurrentPage: (value: number) => void
  totalPages: number
}

export default function Pagination({ currentPage, handleCurrentPage, totalPages }: PaginationProps) {
  return (
    <div className={styles.pagination}>
      <button onClick={() => handleCurrentPage(1)} disabled={currentPage === 1}>
        First
      </button>

      <button onClick={() => handleCurrentPage(Math.max(currentPage - 1, 1))} disabled={currentPage <= 1}>
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handleCurrentPage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage !== 0 && currentPage === totalPages}
      >
        Next
      </button>
      <button onClick={() => handleCurrentPage(totalPages)} disabled={currentPage === totalPages}>
        Last
      </button>
    </div>
  )
}
