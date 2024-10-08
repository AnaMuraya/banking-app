import '@testing-library/jest-dom'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { useStatementsContext } from '@/contexts'

import Transfer from '.'

jest.mock('@/contexts', () => ({
  useStatementsContext: jest.fn(),
}))

const mockUpdateStatements = jest.fn()
const mockBalance = 1000
export const recipientAccounts = ['FR14 2004 1010 0505 0001 3M02 606', '123 2100 0418 4502 0005 1332']

describe('Transfer Component', () => {
  beforeEach(() => {
    ;(useStatementsContext as jest.Mock).mockReturnValue({
      updateStatements: mockUpdateStatements,
      balance: { balance: mockBalance },
    })
  })

  it('renders without crashing', () => {
    render(<Transfer />)
    expect(screen.getByText('Transfer Form.')).toBeInTheDocument()
    expect(screen.getByText('Account Balance')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter an amount between 10 and 100000')).toBeInTheDocument()
    expect(screen.getByText('Select your account number')).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Enter the recipient's IBAN account number")).toBeInTheDocument()
  })

  it('displays current balance and updates preview balance when amount changes', () => {
    render(<Transfer />)

    const amountInput = screen.getByPlaceholderText('Enter an amount between 10 and 100000') as HTMLInputElement
    fireEvent.change(amountInput, { target: { value: '100' } })

    const currencyNumbers = screen.getAllByTestId('currency-number')

    const balanceText = currencyNumbers.map(el => el.textContent).join('')

    expect(balanceText).toBe('900.00')
  })

  it('validates the amount if the amount exceeds balance', async () => {
    render(<Transfer />)

    const amountInput = screen.getByPlaceholderText('Enter an amount between 10 and 100000') as HTMLInputElement
    fireEvent.change(amountInput, { target: { value: '1500' } })

    const currencyNumbers = screen.getAllByTestId('balance')[1]

    expect(currencyNumbers.textContent).toBe('-$500.00')
  })

  it('validates the recipient account number and prevents submission if invalid', async () => {
    render(<Transfer />)

    const recipientAccountNo = screen.getByPlaceholderText("Enter the recipient's IBAN account number")
    fireEvent.change(recipientAccountNo, { target: { value: recipientAccounts[1] } })

    await act(async () => fireEvent.click(screen.getByTestId('submit-transfer')))

    const recipientError = screen.getByText('This account number is invalid')
    await waitFor(() => {
      expect(recipientError).toBeInTheDocument()
    })
  })
})
