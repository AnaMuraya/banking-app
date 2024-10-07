import styles from './styles.module.scss'

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
