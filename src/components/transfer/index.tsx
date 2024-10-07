'use client'

import { isValid } from 'iban'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { accounts } from '@/app/api/data'
import { useStatementsContext } from '@/contexts'

import { TransactionTypes } from '@/types'
import styles from './styles.module.scss'

type Inputs = {
  senderAccountNumber: string
  recipientAccountNumber: string
  amount: number
}

export default function Transfer() {
  const [previewBalance, setPreviewBalance] = useState<number | null>(null)
  const { updateStatements, balance } = useStatementsContext()

  useEffect(() => {
    setPreviewBalance(balance)
  }, [balance])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    getValues,
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
    console.log('Transfer data', data, {
      id: '22',
      amount: `-${data.amount}`,
      balance: balance - data.amount,
      date: new Date().toISOString(),
    })

    updateStatements({
      amount: `-${data.amount}`,
      balance: balance - data.amount,
      type: TransactionTypes.transfer,
    })
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputAmount = Number(e.target.value)

    if (!isNaN(inputAmount) && inputAmount >= 0) {
      setPreviewBalance(balance - inputAmount)
    } else {
      setPreviewBalance(balance)
    }
  }

  const isIBANValid = (iban: string) => {
    const sender = getValues('senderAccountNumber')

    if (sender === iban) return false

    return isValid(iban)
  }

  const isAmountValid = (amount: number) => {
    if (amount > balance) return false

    return true
  }

  return (
    <div className={styles.wrapper}>
      <h3>Transfer Form</h3>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {isSubmitSuccessful && <p>Request submitted successfully</p>}

        <div className={styles.inputWrapper}>
          <label htmlFor="amount">Amount</label>
          <input
            {...register('amount', {
              required: true,
              min: 10,
              max: 100000,
              validate: isAmountValid,
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

        <div className={styles.inputWrapper}>
          <label htmlFor="recipientAccountNumber">Recipient's Account Number</label>
          <input
            {...register('recipientAccountNumber', {
              required: true,
              validate: isIBANValid,
            })}
            name="recipientAccountNumber"
            type="string"
            onChange={handleAmountChange}
            placeholder="Enter the recipient's account number"
          />

          {errors.recipientAccountNumber && <p>Please fill in the recipient's IBAN account number</p>}
        </div>

        <input type="submit" />
      </form>
    </div>
  )
}
