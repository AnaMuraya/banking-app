import styles from '../styles.module.scss'

interface SearchProps {
  searchTerm: string
  handleSearchTerm: (value: string) => void
}

export default function Search({ searchTerm, handleSearchTerm }: SearchProps) {
  return (
    <input
      type="text"
      placeholder="Search by date or amount"
      value={searchTerm}
      onChange={e => handleSearchTerm(e.target.value)}
      className={styles.searchInput}
    />
  )
}

// export function DateRange() {
//   const [startDate, setStartDate] = useState('')
//   const [endDate, setEndDate] = useState('')

//   return (
//     <div className={styles.dateRange}>
//       <label>
//         Start Date:
//         <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
//       </label>
//       <label>
//         End Date:
//         <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
//       </label>
//     </div>
//   )
// }

// interface FilterOptionsProps {
//   handleFilter: (filter: StatementFilters) => void
// }

// export function FilterOptions({ handleFilter }: FilterOptionsProps) {
//   return (
//     <div className={styles.filters}>
//       <button onClick={() => handleFilter(StatementFilters.all)}>All</button>
//       <button onClick={() => handleFilter(StatementFilters.deposit)}>Deposits</button>
//       <button onClick={() => handleFilter(StatementFilters.withdrawal)}>Withdrawals</button>
//     </div>
//   )
// }

// interface SortDateProps {
//   toggleSortOrder: () => void
//   sortOrder: SortOrderOptions
// }

// export function SortDate({ toggleSortOrder, sortOrder }: SortDateProps) {
//   return (
//     <button onClick={toggleSortOrder} className={styles.sortButton}>
//       Sort by Date ({sortOrder === 'desc' ? 'Newest First' : 'Oldest First'})
//     </button>
//   )
// }
