'use client'

import { useState } from 'react'

import { Actions } from '@/types'
import Deposit from '../deposit'
import TabItem from '../tabItem'
import Transfer from '../transfer'
import Withdraw from '../withdraw'

import styles from './styles.module.scss'

export default function Tabs() {
  const [activeTab, setActiveTab] = useState<Actions>(Actions.Deposit)

  const handleTabClick = (label: Actions) => {
    setActiveTab(label)
  }

  return (
    <div className={styles.tabs}>
      <div className={styles.tabHeaders}>
        {Object.values(Actions).map((label, index) => (
          <button
            key={index}
            className={`${styles.tabButton} ${
              activeTab === label ? styles.active : ''
            }`}
            onClick={() => handleTabClick(label)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className={styles.tabContent}>
        <TabItem content={Actions.Deposit} activeTab={activeTab}>
          <Deposit />
        </TabItem>

        <TabItem content={Actions.Withdraw} activeTab={activeTab}>
          <Withdraw />
        </TabItem>

        <TabItem content={Actions.Transfer} activeTab={activeTab}>
          <Transfer />
        </TabItem>
      </div>
    </div>
  )
}
