'use client'

import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { accountStatement } from '@/data'

import styles from './styles.module.scss'

type Inputs = {
  amount: number
}

export default function Deposit() {
  const [previewBalance, setPreviewBalance] = useState<number | null>(null)

  useEffect(() => {
    setPreviewBalance(accountStatement[accountStatement.length - 1].balance)
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Inputs>()

  const balance = accountStatement[accountStatement.length - 1].balance

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

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
          <label htmlFor='amount'>Amount</label>
          <input
            {...register('amount', { required: true, min: 10, max: 100000 })}
            name='amount'
            type='number'
            onChange={handleAmountChange}
            placeholder='Enter amount'
          />

          <span>Current balance: ${previewBalance}</span>
          {errors.amount && <p>Please make sure amount is valid</p>}
        </div>

        <input type='submit' />
      </form>
    </div>
  )
}
