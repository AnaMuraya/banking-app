'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useActiveTabContext } from '@/contexts'
import { TransactionTypes } from '@/types'

import styles from './styles.module.scss'

export default function Header() {
  const { activeTab } = useActiveTabContext()
  const pathname = usePathname()

  return (
    <header className={styles.header}>
      <Link className={styles.logo} href={'/'}>
        {/* <Image src={'/logo'} alt={'My bank'} width={100} height={100} /> */}
        My Bank
      </Link>

      <div className={styles.nav}>
        {Object.values(TransactionTypes).map((label, _) => (
          <Link
            key={_}
            className={`${styles.navButton} ${pathname !== '/' && activeTab === label ? styles.active : styles.inActive}`}
            href={`/transactions/${label}`}
          >
            {label}
          </Link>
        ))}
      </div>
    </header>
  )
}
