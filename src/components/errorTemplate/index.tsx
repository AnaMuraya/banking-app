import styles from './styles.module.scss'

export default function ErrorTemplate({ error }: { error: string }) {
  return (
    <div className={styles.wrapper}>
      <p>Something went wrong❗️</p>
      <p className={styles.details}>{error}</p>
    </div>
  )
}
