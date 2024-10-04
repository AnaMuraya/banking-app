import cn from 'classnames'
import { ReactNode } from 'react'

import { Actions } from '@/types'

import styles from './styles.module.scss'

interface TabItemProps {
  children: ReactNode
  content: string
  activeTab: Actions
}

export default function TabItem({
  children,
  activeTab,
  content,
}: TabItemProps) {
  return (
    <div
      className={cn(
        styles.tabItem,
        activeTab === content ? styles.activeItem : styles.hiddenItem
      )}
    >
      {children}
    </div>
  )
}
