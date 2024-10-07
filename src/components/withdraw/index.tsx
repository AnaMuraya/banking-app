'use client'

import cn from 'classnames'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { PiCaretDownBold } from 'react-icons/pi'

import { accounts } from '@/app/api/data'
import { useStatementsContext } from '@/contexts'
import { TransactionTypes } from '@/types'
import AccountBalance from '../accountBalance'

import styles from './styles.module.scss'

type Inputs = {
  senderAccountNumber: string
  amount: number
}

export default function Withdraw() {
  const [previewBalance, setPreviewBalance] = useState<number | null>(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const { updateStatements, balance } = useStatementsContext()

  useEffect(() => {
    setPreviewBalance(balance.balance)
  }, [balance])

  const { register, handleSubmit, formState } = useForm<Inputs>()
  const { errors, isSubmitSuccessful } = formState

  useEffect(() => {
    if (isSubmitSuccessful) setShowSuccessMessage(true)

    setTimeout(() => {
      setShowSuccessMessage(false)
    }, 5000)
  }, [isSubmitSuccessful])

  const onSubmit: SubmitHandler<Inputs> = data => {
    updateStatements({ amount: data.amount, type: TransactionTypes.withdraw })
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputAmount = Number(e.target.value)

    if (!isNaN(inputAmount) && inputAmount >= 0) setPreviewBalance(balance.balance - inputAmount)
    else setPreviewBalance(balance.balance)
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Withdraw Form.</h3>

      <div className={styles.balances}>
        <AccountBalance balance={balance.balance} title="Account Balance" />
        <AccountBalance balance={previewBalance || balance.balance} title="New Balance" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <p className={cn(styles.success, { [styles.active]: showSuccessMessage })}>Request submitted successfully</p>

        <div className={styles.inputWrapper}>
          <label htmlFor="amount">Amount</label>

          <input
            {...register('amount', { required: true, min: 10, max: 100000 })}
            name="amount"
            type="number"
            onChange={handleAmountChange}
            placeholder="Enter amount"
          />

          {errors.amount && <p className={styles.error}>Please make sure amount is valid</p>}
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="senderAccountNumber">Your Account Number</label>

          <div className={styles.selectWrapper}>
            <select
              {...register('senderAccountNumber', {
                required: true,
              })}
              name="senderAccountNumber"
              defaultValue=""
            >
              <option value="" disabled>
                Select your account number
              </option>
              {accounts.map((acc, idx) => (
                <option value={acc} key={idx}>
                  {acc}
                </option>
              ))}
            </select>
            <PiCaretDownBold className={styles.caret} size={18} />
          </div>

          {errors.senderAccountNumber && <p className={styles.error}>Please select your account number</p>}
        </div>

        <input type="submit" data-testid="submit-withdraw" />
      </form>
    </div>
  )
}
