'use client'

import { formatCurrency } from '@/elements'

import styles from './styles.module.scss'

export default function AccountBalance({ balance, title }: { balance: number; title: string }) {
  return (
    <div className={styles.account}>
      <p className={styles.subtitle}>{title}</p>
      <p className={styles.balance}>
        {balance < 0 && '-'}$
        {formatCurrency(Math.abs(balance).toString())
          .split('')
          .map((digit, index) => (
            <span
              key={index}
              className={styles.currencyNumber}
              data-testid={title === 'New Balance' && 'currency-number'}
            >
              {digit}
            </span>
          ))}
      </p>
    </div>
  )
}
