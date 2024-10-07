import { accounts } from '@/app/api/data'
import { useStatementsContext } from '@/contexts'
import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Deposit from '.'

// Mock the useStatementsContext to simulate context data
jest.mock('@/contexts', () => ({
  useStatementsContext: jest.fn(),
}))
describe('Deposit Component', () => {
  const updateStatementsMock = jest.fn()

  beforeEach(() => {
    ;(useStatementsContext as jest.Mock).mockReturnValue({
      balance: 1000,
      updateStatements: updateStatementsMock,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders deposit form correctly', () => {
    render(<Deposit />)

    expect(screen.getByText('Deposit Form')).toBeInTheDocument()
    expect(screen.getByText('Current balance: $1000')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter amount')).toBeInTheDocument()
    expect(screen.getByText('Select your account number')).toBeInTheDocument()
  })

  it('updates balance preview when entering a valid amount', () => {
    render(<Deposit />)

    const amountInput = screen.getByPlaceholderText('Enter amount') as HTMLInputElement
    fireEvent.change(amountInput, { target: { value: '200' } })

    expect(screen.getByText('Current balance: $1200')).toBeInTheDocument()
  })

  it('resets balance preview for invalid amount', () => {
    render(<Deposit />)

    const amountInput = screen.getByPlaceholderText('Enter amount') as HTMLInputElement
    fireEvent.change(amountInput, { target: { value: '-50' } })

    expect(screen.getByText('Current balance: $1000')).toBeInTheDocument() // Invalid value keeps balance the same
  })

  it('shows error message for missing required fields', async () => {
    render(<Deposit />)

    fireEvent.click(screen.getByText('Submit'))

    await waitFor(() => {
      expect(screen.getByText('Please make sure amount is valid')).toBeInTheDocument()
      expect(screen.getByText('Please select your account number')).toBeInTheDocument()
    })
  })

  it('submits the form successfully', async () => {
    render(<Deposit />)

    const amountInput = screen.getByPlaceholderText('Enter amount') as HTMLInputElement
    fireEvent.change(amountInput, { target: { value: '500' } })

    const accountSelect = screen.getByRole('combobox')
    fireEvent.change(accountSelect, { target: { value: accounts[0] } })

    fireEvent.click(screen.getByText('Submit'))

    await waitFor(() => {
      expect(screen.getByText('Request submitted successfully')).toBeInTheDocument()
    })

    expect(updateStatementsMock).toHaveBeenCalledWith({
      amount: '+500',
      balance: 1500,
      type: 'deposit',
    })
  })
})
