import styles from '../styles.module.scss'

interface DateRangeProps {
  startDate: string
  handleStartDate: (value: string) => void
  endDate: string
  handleEndDate: (value: string) => void
  
}

export default function DateRange({ startDate, handleStartDate, endDate, handleEndDate }: DateRangeProps) {
  return (
    <div className={styles.dateRange}>
      <label>
        Start Date:
        <input type="date" value={startDate} onChange={e => handleStartDate(e.target.value)} />
      </label>
      <label>
        End Date:
        <input type="date" value={endDate} onChange={e => handleEndDate(e.target.value)} />
      </label>
    </div>
  )
}
