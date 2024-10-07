import '@testing-library/jest-dom'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { recipientAccounts } from '@/app/api/data'
import { useStatementsContext } from '@/contexts'

import Transfer from '.'

jest.mock('@/contexts', () => ({
  useStatementsContext: jest.fn(),
}))

const mockUpdateStatements = jest.fn()
const mockBalance = 1000

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
    expect(screen.getByText('New Balance')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter amount')).toBeInTheDocument()
    expect(screen.getByText('Select your account number')).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Enter the recipient's account number")).toBeInTheDocument()
  })

  it('displays current balance and updates preview balance when amount changes', () => {
    render(<Transfer />)

    const amountInput = screen.getByPlaceholderText('Enter amount') as HTMLInputElement
    fireEvent.change(amountInput, { target: { value: '100' } })

    const currencyNumbers = screen.getAllByTestId('currency-number')

    const balanceText = currencyNumbers.map(el => el.textContent).join('')

    expect(balanceText).toBe('900.00')
  })

  it('validates the amount and prevents submission if the amount exceeds balance', async () => {
    render(<Transfer />)

    const amountInput = screen.getByPlaceholderText('Enter amount') as HTMLInputElement
    fireEvent.change(amountInput, { target: { value: '1500' } })

    fireEvent.click(screen.getByTestId('submit-transfer'))

    await waitFor(() => {
      expect(screen.getByText('Please make sure amount is valid')).toBeInTheDocument()
    })
  })

  it('validates the recipient account number and prevents submission if invalid', async () => {
    render(<Transfer />)

    const recipientAccountNo = screen.getByPlaceholderText("Enter the recipient's account number")
    fireEvent.change(recipientAccountNo, { target: { value: recipientAccounts[1] } })

    await act(async () => fireEvent.click(screen.getByTestId('submit-transfer')))

    const recipientError = screen.getByText("Please fill in the recipient's IBAN account number")
    await waitFor(() => {
      expect(recipientError).toBeInTheDocument()
    })
  })
})
