import { UseFormRegister, UseFormSetValue } from 'react-hook-form'

import { FormInputs } from '@/types'

type Props = {
  setValue: UseFormSetValue<FormInputs>
  register: UseFormRegister<FormInputs>
  amount: number
}

export default function AmountInput({ setValue, register, amount }: Props) {
  const handleAmountOnChange = async (value: string) => {
    if (value) {
      if (!/^[0-9]*$/.test(value)) return
      if (Number(value) > 100000 || Number(value) < 0) return
    }

    if (!value) {
      setValue('amount', '' as unknown as number)
      return
    }

    setValue('amount', Number(value))
  }

  return (
    <input
      type="number"
      placeholder="Enter an amount between 10 and 100000"
      {...register('amount', {
        required: true,
        min: 10,
        max: 100000,
        valueAsNumber: true,
      })}
      value={amount || ''}
      onChange={e => handleAmountOnChange(e.target.value)}
    />
  )
}
