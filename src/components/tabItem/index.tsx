import cn from 'classnames'
import { ReactNode } from 'react'

import { TransactionTypes } from '@/types'

import styles from './styles.module.scss'

interface TabItemProps {
  children: ReactNode
  content: string
  activeTab: TransactionTypes
}

export default function TabItem({ children, activeTab, content }: TabItemProps) {
  return (
    <div className={cn(styles.tabItem, activeTab === content ? styles.activeItem : styles.hiddenItem)}>{children}</div>
  )
}
