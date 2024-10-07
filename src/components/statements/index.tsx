'use client'

import { useEffect, useMemo, useState } from 'react'

import { useStatementsContext } from '@/contexts'
import { SortOrderOptions, StatementFilters } from '@/types'
import { filterByDateRange, filterByTransactionType, search, sortByDate } from '@/utils'
import DateRange from './dateRange'
import FilterOptions from './filterOptions'
import Pagination from './pagination'
import Search from './search'
import Table from './table'

import styles from './styles.module.scss'

interface StatementsProps {
  title: string
  selectedFilter?: StatementFilters
}

const ROW_PER_PAGE = 10

export default function Statements({ title, selectedFilter }: StatementsProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<StatementFilters>(selectedFilter || StatementFilters.all)
  const [sortOrder, setSortOrder] = useState<SortOrderOptions>(SortOrderOptions.desc)
  const [currentPage, setCurrentPage] = useState(1)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const { statements } = useStatementsContext()

  useEffect(() => {
    if (selectedFilter) setFilter(selectedFilter)
  }, [selectedFilter])

  const filteredData = useMemo(() => {
    let data = statements

    if (searchTerm) data = search(searchTerm, data)
    data = filterByTransactionType(filter, data)
    if (startDate && endDate) data = filterByDateRange(startDate, endDate, data)

    return data
  }, [searchTerm, filter, statements, startDate, endDate])

  const processedData = useMemo(() => {
    const newData = sortByDate(filteredData, sortOrder)

    const startIndex = (currentPage - 1) * ROW_PER_PAGE
    return newData.slice(startIndex, startIndex + ROW_PER_PAGE)
  }, [filteredData, sortOrder, currentPage])

  const toggleSortOrder = () =>
    setSortOrder(prevOrder => (prevOrder === SortOrderOptions.asc ? SortOrderOptions.desc : SortOrderOptions.asc))
  const handleSearchTerm = (value: string) => setSearchTerm(value) //? debounce or callback
  const handleFilter = (filter: StatementFilters) => setFilter(filter)
  const handleCurrentPage = (value: number) => setCurrentPage(value)
  const handleStartDate = (value: string) => setStartDate(value)
  const handleEndDate = (value: string) => setEndDate(value)

  const totalPages = Math.ceil(filteredData.length / ROW_PER_PAGE)

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}.</h3>

      {!selectedFilter && (
        <div className={styles.filters}>
          <Search searchTerm={searchTerm} handleSearchTerm={handleSearchTerm} />

          <DateRange
            startDate={startDate}
            handleStartDate={handleStartDate}
            endDate={endDate}
            handleEndDate={handleEndDate}
          />

          <FilterOptions handleFilter={handleFilter} filter={filter} />
        </div>
      )}

      <Table processedData={processedData} toggleSortOrder={toggleSortOrder} sortOrder={sortOrder} />

      <Pagination currentPage={currentPage} handleCurrentPage={handleCurrentPage} totalPages={totalPages} />
    </div>
  )
}
