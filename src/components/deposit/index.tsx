'use client'

import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { accounts } from '@/app/api/data'
import { useStatementsContext } from '@/contexts'
import { TransactionTypes } from '@/types'

import styles from './styles.module.scss'

type Inputs = {
  senderAccountNumber: string
  amount: number
}

export default function Deposit() {
  const [previewBalance, setPreviewBalance] = useState<number | null>(null)
  const { updateStatements, balance } = useStatementsContext()

  useEffect(() => {
    setPreviewBalance(balance)
  }, [balance])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitted },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log('Deposit data', data, {
      id: '22',
      amount: `+${data.amount}`,
      balance: balance + Number(data.amount),
      date: new Date().toISOString(),
    })

    updateStatements({
      amount: `+${data.amount}`,
      balance: balance + Number(data.amount),
      type: TransactionTypes.deposit,
    })
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputAmount = Number(e.target.value)

    if (!isNaN(inputAmount) && inputAmount >= 0) {
      setPreviewBalance(balance + inputAmount)
    } else {
      setPreviewBalance(balance)
    }
  }

  return (
    <div className={styles.wrapper}>
      <h3>Deposit Form</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {isSubmitSuccessful && <p>Request submitted successfully</p>}

        <div className={styles.inputWrapper}>
          <label htmlFor="amount">Amount</label>
          <input
            {...register('amount', {
              required: true,
              min: 10,
              max: 100000,
            })}
            name="amount"
            type="number"
            onChange={handleAmountChange}
            placeholder="Enter amount"
          />

          <span>Current balance: ${previewBalance}</span>
          {errors.amount && <p>Please make sure amount is valid</p>}
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="senderAccountNumber">Your Account Number</label>
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
          {errors.senderAccountNumber && <p>Please select your account number</p>}
        </div>

        <input type="submit" />
      </form>
    </div>
  )
}
