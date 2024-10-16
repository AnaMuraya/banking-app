declare global {
  interface Window {
    mockStatementsContext: typeof newMockStatementsContext
  }
}

export const newMockStatementsContext = {
  statements: [
    { id: '1', amount: 100, date: '2023-01-01', type: 'deposit', balance: 1100 },
    { id: '2', amount: 200, date: '2023-01-02', type: 'withdraw', balance: 900 },
  ],
  balance: {
    balance: 1000,
    deposits: 500,
    withdrawals: 200,
    transfers: 300,
  },
  updateStatements: (statement: any) => {
    console.log('Mock updateStatements called with:', statement)
  },
}

export function injectMockContext() {
  window.mockStatementsContext = newMockStatementsContext
  return window.mockStatementsContext
}
