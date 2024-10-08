'use client'

import { useEffect, useState } from 'react'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { PiCaretDownBold } from 'react-icons/pi'

import { accounts } from '@/app/api/data'
import { useStatementsContext } from '@/contexts'
import { FormInputs, TransactionTypes } from '@/types'

import AccountBalance from '../accountBalance'
import AmountInput from '../amountInput'
import SuccessBanner from '../successBanner'

import styles from './styles.module.scss'

export default function Deposit() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const { updateStatements, balance } = useStatementsContext()

  const { register, handleSubmit, formState, reset, control, setValue } = useForm<FormInputs>()
  const { errors, isSubmitSuccessful } = formState
  const amount = Number(useWatch({ control, name: 'amount' }))

  useEffect(() => {
    if (!isSubmitSuccessful) return
    if (isSubmitSuccessful) setShowSuccessMessage(true)

    setTimeout(() => {
      setShowSuccessMessage(false)
      reset()
    }, 5000)
  }, [isSubmitSuccessful, reset])

  const onSubmit: SubmitHandler<FormInputs> = data => {
    updateStatements({ amount: Number(data.amount), type: TransactionTypes.deposit })
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Deposit Form.</h3>

      <div className={styles.balances}>
        <AccountBalance balance={balance.balance} title="Account Balance" />
        {!isSubmitSuccessful && typeof amount === 'number' && !isNaN(amount) && (
          <AccountBalance balance={Number(balance.balance) + amount} title="New Balance" />
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <SuccessBanner showSuccessMessage={showSuccessMessage} />

        <div className={styles.inputWrapper}>
          <label htmlFor="amount">Amount</label>

          <AmountInput {...{ setValue, register, amount }} />

          {errors.amount && <p className={styles.error}>Please make sure amount is valid</p>}
        </div>

        <div className={styles.inputWrapper}>
          <label htmlFor="senderAccountNumber">Your Account Number</label>

          <div className={styles.selectWrapper}>
            <select defaultValue="" {...register('senderAccountNumber', { required: true })}>
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

        <input type="submit" data-testid="submit-deposit" />
      </form>
    </div>
  )
}
