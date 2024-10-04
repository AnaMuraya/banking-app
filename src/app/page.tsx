import { Statements, Tabs } from '@/components'

import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>Banking App</h1>

      <div className={styles.main}>
        <Tabs />
        <Statements />
      </div>
    </div>
  )
}
