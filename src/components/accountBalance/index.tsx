import { formatCurrency } from '@/utils'

import AnimatedNumber from './animatedNumber'

import styles from './styles.module.scss'

export default function AccountBalance({ balance, title }: { balance: number; title: string }) {
  return (
    <div className={styles.account}>
      <p className={styles.subtitle}>{title}</p>
      <p className={styles.balance} data-testid="balance">
        {balance < 0 && '-'}$
        {formatCurrency(Math.abs(balance).toString())
          .split('')
          .map((digit, index) => {
            if (isNaN(Number(digit))) {
              return (
                <span
                  key={index}
                  className={styles.currencyNumber}
                  data-testid={title === 'New Balance' && 'currency-number'}
                >
                  {digit}
                </span>
              )
            }

            return <AnimatedNumber key={index} value={Number(digit)} title={title} className={styles.currencyNumber} />
          })}
      </p>
    </div>
  )
}
