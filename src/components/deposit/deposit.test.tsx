import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { useStatementsContext } from '@/contexts'

import Deposit from '.'

jest.mock('@/contexts', () => ({
  useStatementsContext: jest.fn(),
}))

const updateStatementsMock = jest.fn()
const mockBalance = 1000

describe('Deposit Component', () => {
  beforeEach(() => {
    ;(useStatementsContext as jest.Mock).mockReturnValue({
      balance: { balance: mockBalance },
      updateStatements: updateStatementsMock.mockImplementation(statement => {
        console.log('Mocked updateStatements called with:', statement)
      }),
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders deposit form correctly', () => {
    render(<Deposit />)

    expect(screen.getByText('Deposit Form.')).toBeInTheDocument()
    expect(screen.getByText('Account Balance')).toBeInTheDocument()
    expect(screen.getByText('New Balance')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter amount')).toBeInTheDocument()
    expect(screen.getByText('Select your account number')).toBeInTheDocument()
  })

  it('updates balance preview when entering a valid amount', () => {
    render(<Deposit />)

    const amountInput = screen.getByPlaceholderText('Enter amount') as HTMLInputElement
    fireEvent.change(amountInput, { target: { value: '200' } })

    const currencyNumbers = screen.getAllByTestId('currency-number')

    const balanceText = currencyNumbers.map(el => el.textContent).join('')

    expect(balanceText).toBe('1,200.00')
  })

  it('resets balance preview for invalid amount', () => {
    render(<Deposit />)

    const amountInput = screen.getByPlaceholderText('Enter amount') as HTMLInputElement
    fireEvent.change(amountInput, { target: { value: '-50' } })

    const currencyNumbers = screen.getAllByTestId('currency-number')

    const balanceText = currencyNumbers.map(el => el.textContent).join('')

    //* Invalid value keeps balance the same
    expect(balanceText).toBe('1,000.00')
  })

  it('shows error message for missing required fields', async () => {
    render(<Deposit />)

    fireEvent.click(screen.getByTestId('submit-deposit'))

    await waitFor(() => {
      expect(screen.getByText('Please make sure amount is valid')).toBeInTheDocument()
      expect(screen.getByText('Please select your account number')).toBeInTheDocument()
    })
  })
})
