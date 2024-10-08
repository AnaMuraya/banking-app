'use client'

import cn from 'classnames'
import { PiBoxArrowDown, PiBoxArrowUp } from 'react-icons/pi'

import { AccountBalance, Statements } from '@/components'
import { useStatementsContext } from '@/contexts'
import { formatCurrency } from '@/utils'

import Link from 'next/link'
import styles from './page.module.scss'

export default function Home() {
  const { balance } = useStatementsContext()

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>
        The Community Bank of <span className={styles.bac}>B.A.C</span>
      </h1>

      <AccountBalance balance={balance.balance} title="Account Balance" />

      <div className={styles.navigator}>
        <div className={styles.card}>
          <PiBoxArrowDown size={40} className={styles.icon} />
          <div>
            <p className={styles.heading}>Deposits</p>
            <p className={styles.currency}>
              {balance.deposits < 0 && '-'}$
              {formatCurrency(Math.abs(balance.deposits).toString())
                .split('')
                .map((digit, index) => (
                  <span key={index} className={styles.currencyNumber}>
                    {digit}
                  </span>
                ))}
            </p>
          </div>
          <Link className={styles.button} href={'/deposit'}>
            Deposit
          </Link>
        </div>

        <div className={styles.card}>
          <PiBoxArrowUp size={40} className={styles.icon} />
          <div>
            <p className={styles.heading}>Withdrawals</p>
            <p className={styles.currency}>
              -$
              {formatCurrency(Math.abs(balance.withdrawals).toString())
                .split('')
                .map((digit, index) => (
                  <span key={index} className={styles.currencyNumber}>
                    {digit}
                  </span>
                ))}
            </p>
          </div>
          <Link className={styles.button} href={'/withdraw'}>
            Withdraw
          </Link>
        </div>

        <div className={styles.card}>
          <PiBoxArrowDown size={40} className={cn(styles.icon, styles.turnRight)} />
          <div>
            <p className={styles.heading}>Transfers</p>
            <p className={styles.currency}>
              -$
              {formatCurrency(Math.abs(balance.transfers).toString())
                .split('')
                .map((digit, index) => (
                  <span key={index} className={styles.currencyNumber}>
                    {digit}
                  </span>
                ))}
            </p>
          </div>
          <Link className={styles.button} href={'/transfer'}>
            Transfer
          </Link>
        </div>
      </div>

      <div className={styles.main}>
        <Statements title={'Account Statements'} />
      </div>
    </div>
  )
}
