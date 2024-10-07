'use client'

import Link from 'next/link'
import { ReactNode } from 'react'

import { useActiveTabContext } from '@/contexts'
import { StatementFilters, TransactionTypes } from '@/types'
import Statements from '../statements'

import styles from './styles.module.scss'

interface TabsProps {
  children: ReactNode
}

export default function Tabs({ children }: TabsProps) {
  const { activeTab, updateActiveTab } = useActiveTabContext()

  const handleTabClick = (label: TransactionTypes) => updateActiveTab(label)

  const handleStatementFilter = () => {
    switch (activeTab) {
      case TransactionTypes.deposit:
        return StatementFilters.deposit

      case TransactionTypes.withdraw:
        return StatementFilters.withdrawal

      case TransactionTypes.transfer:
        return StatementFilters.transfer

      default:
        return StatementFilters.all
    }
  }

  return (
    <div className={styles.tabs}>
      <div className={styles.tabHeaders}>
        {Object.values(TransactionTypes).map((label, _) => (
          <Link
            key={_}
            className={`${styles.tabButton} ${activeTab === label ? styles.active : ''}`}
            onClick={() => handleTabClick(label)}
            href={`${label}`}
          >
            {label}
          </Link>
        ))}
      </div>

      <div className={styles.tabContent}>{children}</div>

      <Statements selectedFilter={handleStatementFilter()} />
    </div>
  )
}
