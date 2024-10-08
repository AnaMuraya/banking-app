import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { useStatementsContext } from '@/contexts'
import { StatementFilters, Transaction, TransactionTypes } from '@/types'
import { formatDate } from '@/utils'

import Statements from '.'

jest.mock('@/utils', () => {
  const actualUtils = jest.requireActual('@/utils')

  return {
    filterByDateRange: actualUtils.filterByDateRange,
    sortByDate: actualUtils.sortByDate,
    formatDate: actualUtils.formatDate,
    formatCurrency: actualUtils.formatCurrency,
    search: actualUtils.search,

    filterByTransactionType: jest.fn((filter, data: Transaction[]) => {
      switch (filter) {
        case StatementFilters.deposit:
          return data.filter(entry => entry.type === TransactionTypes.deposit)
        case StatementFilters.withdrawal:
          return data.filter(entry => entry.type === TransactionTypes.withdraw)
        case StatementFilters.transfer:
          return data.filter(entry => entry.type === TransactionTypes.transfer)
        default:
          return data
      }
    }),
  }
})

jest.mock('@/contexts', () => ({
  useStatementsContext: jest.fn(),
}))

const mockStatements = [
  { id: '1', amount: '100', date: '2024-09-01T10:06:21.614Z', type: 'transfer', balance: 900 },
  { id: '2', amount: '200', date: '2018-08-11T05:33:00.000Z', type: 'deposit', balance: 1100 },
  { id: '3', amount: '398', date: '2016-04-09T06:37:00.000Z', type: 'withdraw', balance: 702 },
  { id: '4', amount: '1890', date: '2022-01-01T19:37:00.000Z', type: 'deposit', balance: 2592 },
  { id: '5', amount: '2094', date: '2019-11-22T02:04:00.000Z', type: 'transfer', balance: 498 },
  { id: '6', amount: '150', date: '2024-06-01T16:23:00.000Z', type: 'withdraw', balance: 850 },
  { id: '7', amount: '250', date: '2023-07-15T08:02:00.000Z', type: 'deposit', balance: 1100 },
  { id: '8', amount: '320', date: '2023-08-10T03:08:00.000Z', type: 'withdraw', balance: 780 },
  { id: '9', amount: '460', date: '2023-05-21T22:49:00.000Z', type: 'deposit', balance: 1240 },
  { id: '10', amount: '780', date: '2023-04-09T02:19:00.000Z', type: 'transfer', balance: 460 },
  { id: '11', amount: '220', date: '2023-09-13T12:14:00.000Z', type: 'withdraw', balance: 680 },
  { id: '12', amount: '600', date: '2023-03-03T15:50:00.000Z', type: 'deposit', balance: 1280 },
]

describe('Statements Component', () => {
  beforeEach(() => {
    ;(useStatementsContext as jest.Mock).mockReturnValue({
      statements: mockStatements,
    })
  })

  it('renders without crashing and displays the title', () => {
    render(<Statements title="Account Statements" />)
    expect(screen.getByText('Account Statements.')).toBeInTheDocument()
  })

  it('filters the statements based on search input', async () => {
    render(<Statements title="Account Statements" />)

    fireEvent.change(screen.getByPlaceholderText('Search by date or amount'), { target: { value: '9' } })

    await waitFor(() => {
      expect(screen.getByText('$900.00')).toBeInTheDocument()
      expect(screen.getByText('-$398.00')).toBeInTheDocument()
      expect(screen.getByText('$1,890.00')).toBeInTheDocument()
      expect(screen.getByText(formatDate('2019-11-22T02:04:00.000Z'))).toBeInTheDocument()
      expect(screen.queryByText(formatDate('2018-08-11T05:33:00.000Z'))).not.toBeInTheDocument()
    })
  })

  it('filters the data by date range when set', async () => {
    render(<Statements title="Account Statements" />)

    fireEvent.change(screen.getByTestId('start-date'), { target: { value: '2023-01-01' } })
    fireEvent.change(screen.getByTestId('end-date'), { target: { value: '2024-10-06' } })

    await waitFor(() => {
      expect(screen.getByText(formatDate('2024-09-01T10:06:21.614Z'))).toBeInTheDocument()
      expect(screen.getByText('-$780.00')).toBeInTheDocument()
      expect(screen.queryByText(formatDate('2022-01-01T19:37:00.000Z'))).not.toBeInTheDocument()
    })
  })

  it('paginates the data correctly when there are more than 10 items', async () => {
    render(<Statements title="Account Statements" />)

    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument()
    expect(screen.getByText(formatDate('2024-09-01T10:06:21.614Z'))).toBeInTheDocument()
    expect(screen.getByText(formatDate('2023-04-09T02:19:00.000Z'))).toBeInTheDocument()
    expect(screen.queryByText('-$398.00')).not.toBeInTheDocument()

    expect(screen.getByTestId('first-page')).toBeDisabled()
    expect(screen.getByTestId('prev-page')).toBeDisabled()

    fireEvent.click(screen.getByTestId('next-page'))

    await waitFor(() => {
      expect(screen.getByText('Page 2 of 2')).toBeInTheDocument()
      expect(screen.getByText(formatDate('2018-08-11T05:33:00.000Z'))).toBeInTheDocument()
      expect(screen.queryByText('-$220.00')).not.toBeInTheDocument()
    })

    expect(screen.getByTestId('last-page')).toBeDisabled()
    expect(screen.getByTestId('next-page')).toBeDisabled()

    fireEvent.click(screen.getByTestId('prev-page'))

    await waitFor(() => {
      expect(screen.getByText('Page 1 of 2')).toBeInTheDocument()
      expect(screen.getByText('-$320.00')).toBeInTheDocument()
      expect(screen.getByText('-$2,094.00')).toBeInTheDocument()
      expect(screen.queryByText(formatDate('2016-04-09T06:37:00.000Z'))).not.toBeInTheDocument()
    })

    expect(screen.getByTestId('next-page')).toBeEnabled()
    expect(screen.getByTestId('last-page')).toBeEnabled()
  })

  it('sorts the statements by date', async () => {
    render(<Statements title="Account Statements" />)

    fireEvent.click(screen.getByTestId('sort-button'))

    await waitFor(() => {
      expect(screen.getByText(formatDate('2016-04-09T06:37:00.000Z'))).toBeInTheDocument()
      expect(screen.queryByText(formatDate('2024-09-01T10:06:21.614Z'))).not.toBeInTheDocument()
    })

    fireEvent.click(screen.getByTestId('sort-button'))

    await waitFor(() => {
      expect(screen.getByText(formatDate('2024-06-01T16:23:00.000Z'))).toBeInTheDocument()
      expect(screen.queryByText(formatDate('2018-08-11T05:33:00.000Z'))).not.toBeInTheDocument()
    })
  })

  it('applies selectedFilter when passed as a prop', () => {
    const mockFilteredStatements = [
      { id: '2', amount: '200', date: '2018-08-11T05:33:00.000Z', type: 'deposit', balance: 1100 },
      { id: '4', amount: '1890', date: '2022-01-01T19:37:00.000Z', type: 'deposit', balance: 2592 },
      { id: '7', amount: '250', date: '2023-07-15T08:02:00.000Z', type: 'deposit', balance: 1100 },
      { id: '9', amount: '460', date: '2023-05-21T22:49:00.000Z', type: 'deposit', balance: 1240 },
      { id: '12', amount: '600', date: '2023-03-03T15:50:00.000Z', type: 'deposit', balance: 1280 },
    ]

    const filterByTransactionTypeMock = jest.requireMock('@/utils').filterByTransactionType
    filterByTransactionTypeMock.mockReturnValue(mockFilteredStatements)

    render(<Statements title="Account Statements" selectedFilter={StatementFilters.deposit} />)

    expect(filterByTransactionTypeMock).toHaveBeenCalledWith(StatementFilters.deposit, mockStatements)

    expect(screen.getByText(formatDate('2018-08-11T05:33:00.000Z'))).toBeInTheDocument()
    expect(screen.getByText('$1,890.00')).toBeInTheDocument()
    expect(screen.queryByText(formatDate('2024-06-01T16:23:00.000Z'))).not.toBeInTheDocument()
    expect(screen.queryByText(/-\$/)).not.toBeInTheDocument()
  })
})
