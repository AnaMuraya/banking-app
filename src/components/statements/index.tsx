'use client'

import { useMemo, useState } from 'react'

import { accountStatement } from '@/data'

import styles from './styles.module.scss'

enum StatementFilters {
  all = 'all',
  deposit = 'deposit',
  withdrawal = 'withdrawal',
}

export default function Statements() {
  const [searchTerm, setSearchTerm] = useState('')
  //! combination of filters must be implemented with “AND” logical operator)
  const [filter, setFilter] = useState<StatementFilters>(StatementFilters.all) //! Include date ranges
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  // Date range filter
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [test, setTest] = useState<number | null>(null)

  const rowsPerPage = 3

  //TODO: Search and filter logic
  const filteredData = useMemo(() => {
    let data = accountStatement

    //* Search by date or amount
    if (searchTerm) {
      data = data.filter(
        (entry) =>
          entry.date.includes(searchTerm) ||
          entry.amount.includes(searchTerm) ||
          entry.balance.toString().includes(searchTerm)
      )
    }

    //* Filter by amount type
    if (filter === StatementFilters.deposit) {
      data = data.filter((entry) => parseFloat(entry.amount) > 0)
    } else if (filter === StatementFilters.withdrawal) {
      data = data.filter((entry) => parseFloat(entry.amount) < 0)
    }

    //* Filter by date range
    if (startDate && endDate) {
      const start = new Date(startDate).getTime()
      const end = new Date(endDate).getTime()
      data = data.filter((entry) => {
        const entryDate = new Date(
          entry.date.split('.').reverse().join('-')
        ).getTime()
        return entryDate >= start && entryDate <= end
      })
    }

    return data
  }, [searchTerm, filter, startDate, endDate])

  //TODO: Pagination logic
  const paginatedData = useMemo(() => {
    //* Sort by date (default: latest date)
    const newData = filteredData.sort((a, b) => {
      const dateA = new Date(a.date.split('.').reverse().join('-')).getTime()
      const dateB = new Date(b.date.split('.').reverse().join('-')).getTime()
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB
    })

    const startIndex = (currentPage - 1) * rowsPerPage
    return newData.slice(startIndex, startIndex + rowsPerPage)
  }, [currentPage, filteredData, sortOrder])

  const toggleSortOrder = () =>
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'))

  const totalPages = Math.ceil(filteredData.length / rowsPerPage)

  return (
    <div className={styles.wrapper}>
      <h3>Account Statements</h3>

      {/* Search Input */}
      <input
        type='text'
        placeholder='Search by date or amount'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />

      {/* Date Range Inputs */}
      <div className={styles.dateRange}>
        <label>
          Start Date:
          <input
            type='date'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type='date'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>

      {/* Filter Options */}
      <div className={styles.filters}>
        <button onClick={() => setFilter(StatementFilters.all)}>All</button>
        <button onClick={() => setFilter(StatementFilters.deposit)}>
          Deposits
        </button>
        <button onClick={() => setFilter(StatementFilters.withdrawal)}>
          Withdrawals
        </button>
      </div>

      {/* Sort Button */}
      <button onClick={toggleSortOrder} className={styles.sortButton}>
        Sort by Date ({sortOrder === 'desc' ? 'Newest First' : 'Oldest First'})
      </button>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>{entry.amount}</td>
              <td>{entry.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className={styles.pagination}>
        <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
          First
        </button>

        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage <= 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage !== 0 && currentPage === totalPages}
        >
          Next
        </button>
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>
    </div>
  )
}
