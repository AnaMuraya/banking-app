'use client'

import React, { useState } from 'react'

import styles from './styles.module.scss'

interface CollapsibleSectionProps {
  title: string
  children: React.ReactNode
}

export default function CollapsibleSection({ title, children }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSection = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={styles.collapsibleSection}>
      <button className={styles.title} onClick={toggleSection}>
        {title}
        <span className={styles.arrow}>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && <div className={styles.content}>{children}</div>}
    </div>
  )
}
