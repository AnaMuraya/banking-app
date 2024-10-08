'use client'

import cn from 'classnames'
import { isValid } from 'iban'
import { SetStateAction, useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { PiCaretDownBold } from 'react-icons/pi'

import { accounts, recipientAccounts } from '@/app/api/data'
import { useStatementsContext } from '@/contexts'
import { FormInputs, TransactionTypes } from '@/types'

import AccountBalance from '../accountBalance'
import AmountInput from '../amountInput'
import SuccessBanner from '../successBanner'

import styles from './styles.module.scss'

export default function Transfer() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const { updateStatements, balance } = useStatementsContext()
  const wrapperRef = useRef<HTMLUListElement>(null)

  const [showDropdown, setShowDropdown] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const { register, handleSubmit, formState, reset, control, setValue, getValues } = useForm<FormInputs>()
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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [wrapperRef])

  const onSubmit: SubmitHandler<FormInputs> = (data: FormInputs) => {
    updateStatements({ amount: Number(data.amount), type: TransactionTypes.transfer })
  }

  const isIBANValid = (iban?: string) => {
    const sender = getValues('senderAccountNumber')
    if (sender === iban) return false
    return isValid(iban || '')
  }

  const handleOptionClick = (option: SetStateAction<string>) => {
    setInputValue(option)
    setShowDropdown(false)
  }

  const handleOptionChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInputValue(e.target.value)
    setShowDropdown(false)
  }
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Transfer Form.</h3>

      <div className={styles.balances}>
        <AccountBalance balance={balance.balance} title="Account Balance" />
        {!isSubmitSuccessful && typeof amount === 'number' && !isNaN(amount) && (
          <AccountBalance balance={Number(balance.balance) - amount} title="New Balance" />
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
            <select
              defaultValue=""
              aria-label="Sender account number"
              {...register('senderAccountNumber', { required: true })}
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

        <div className={styles.inputWrapper}>
          <label htmlFor="recipientAccountNumber">Recipient&apos;s Account Number</label>

          <div className={styles.selectWrapper}>
            <input
              {...register('recipientAccountNumber', {
                required: true,
                validate: isIBANValid,
              })}
              name="recipientAccountNumber"
              type="string"
              onClick={() => setShowDropdown(true)}
              onChange={handleOptionChange}
              placeholder="Enter the recipient's IBAN account number"
              className={styles.recipientInput}
              value={inputValue}
            />

            {showDropdown && (
              <ul className={cn(styles.datalist, { [styles.active]: showDropdown })} ref={wrapperRef}>
                {recipientAccounts.map((option, index) => (
                  <li key={index} onClick={() => handleOptionClick(option)} className={styles.option}>
                    {option}
                  </li>
                ))}
              </ul>
            )}

            <PiCaretDownBold className={styles.caret} size={18} />
          </div>

          {errors.recipientAccountNumber && <p className={styles.error}>This account number is invalid</p>}
        </div>

        <input type="submit" data-testid="submit-transfer" />
      </form>
    </div>
  )
}
