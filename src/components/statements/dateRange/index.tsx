import styles from './styles.module.scss'

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
        <input
          type="date"
          data-testid="start-date"
          value={startDate}
          onChange={e => handleStartDate(e.target.value)}
          placeholder="from"
        />
      </label>
      <p>to</p>
      <label>
        <input type="date" data-testid="end-date" value={endDate} onChange={e => handleEndDate(e.target.value)} />
      </label>
    </div>
  )
}
