import { expect, test } from '@playwright/test'

const LOCAL_URL = 'http://localhost:3000'
const YOUR_ACCOUNT_NUMBER = 'ES91 2100 0418 4502 0005 1332'
const RECIPIENT_ACCOUNT_NUMBER = 'DE89370400440532013000'
test.describe('Banking Application E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    //* Inject the mock context
    await page.addInitScript(() => {
      window.mockStatementsContext = {
        balance: { balance: 1000, deposits: 100, withdrawals: 200, transfers: 300 },
        statements: [
          { id: '1', amount: 100, date: '2023-01-01T22:49:00.000Z', type: 'deposit', balance: 1500 },
          { id: '2', amount: 200, date: '2023-01-02T15:50:00.000Z', type: 'withdraw', balance: 1300 },
          { id: '3', amount: 300, date: '2023-01-03T10:06:21.614Z', type: 'transfer', balance: 1000 },
        ],
        updateStatements: statement => {
          console.log('Mock updateStatements called with:', statement)
          window.mockStatementsContext.balance.balance += statement.amount
        },
      }
    })

    await page.goto(LOCAL_URL)
  })

  test('should successfully deposit money', async ({ page }) => {
    //* Navigate to deposit page
    await page.getByRole('link', { name: 'Deposit' }).click()

    //* Fill in deposit form
    const depositAmount = 500
    await page.getByPlaceholder('Enter an amount between 10 and 100000').fill(depositAmount.toString())
    await page.getByRole('combobox').selectOption(YOUR_ACCOUNT_NUMBER)

    //* Get initial balance from mock context
    const initialBalance = await page.evaluate(() => window.mockStatementsContext.balance.balance)

    //* Verify updated balance
    const expectedBalance = initialBalance + depositAmount
    const formattedExpectedBalance = expectedBalance.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

    const currencyNumber = await page.getByTestId('currency-number').all()
    const balanceText = await Promise.all(currencyNumber.map(balance => balance.innerText()))

    const newBalance = balanceText.join('')
    expect(newBalance).toBe(formattedExpectedBalance)

    await page.getByTestId('submit-deposit').click()

    await expect(page.getByText('Request submitted successfully')).toBeVisible()
  })

  test('should successfully withdraw money', async ({ page }) => {
    //* Navigate to withdraw page
    await page.getByRole('link', { name: 'Withdraw' }).click()

    //* Fill in withdraw form
    const withdrawAmount = 200
    await page.getByPlaceholder('Enter an amount between 10 and 100000').fill(withdrawAmount.toString())
    await page.getByRole('combobox').selectOption(YOUR_ACCOUNT_NUMBER)

    //* Get initial balance from mock context
    const initialBalance = await page.evaluate(() => window.mockStatementsContext.balance.balance)

    //* Verify updated balance
    const expectedBalance = initialBalance - withdrawAmount
    const formattedExpectedBalance = expectedBalance.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

    const currencyNumber = await page.getByTestId('currency-number').all()
    const balanceText = await Promise.all(currencyNumber.map(balance => balance.innerText()))

    const newBalance = balanceText.join('')
    expect(newBalance).toBe(formattedExpectedBalance)

    await page.getByTestId('submit-withdraw').click()

    await expect(page.getByText('Request submitted successfully')).toBeVisible()
  })

  test('should successfully transfer money', async ({ page }) => {
    //* Navigate to transfer page
    await page.getByRole('link', { name: 'Transfer' }).click()

    //* Fill in transfer form
    const transferAmount = 300
    await page.getByPlaceholder('Enter an amount between 10 and 100000').fill(transferAmount.toString())
    await page.getByRole('combobox').selectOption(YOUR_ACCOUNT_NUMBER)
    await page.getByPlaceholder("Enter the recipient's IBAN account number").fill(RECIPIENT_ACCOUNT_NUMBER)

    //* Get initial balance from mock context
    const initialBalance = await page.evaluate(() => window.mockStatementsContext.balance.balance)

    //* Verify updated balance
    const expectedBalance = initialBalance - transferAmount
    const formattedExpectedBalance = expectedBalance.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

    const currencyNumber = await page.getByTestId('currency-number').all()
    const balanceText = await Promise.all(currencyNumber.map(balance => balance.innerText()))

    const newBalance = balanceText.join('')
    expect(newBalance).toBe(formattedExpectedBalance)

    await page.getByTestId('submit-transfer').click()

    await expect(page.getByText('Request submitted successfully')).toBeVisible()
  })

//   test('should display and filter statements correctly', async ({ page }) => {
//     await page.goto(LOCAL_URL)

//     //* Check initial number of rows
//     let rows = await page.getByRole('row').all()
//     expect(rows.length).toBeGreaterThan(1)

//     //* Filter by deposit
//     await page.getByRole('button', { name: 'Deposits' }).click()

//     rows = await page.getByRole('row').all()
//     for (let i = 1; i < rows.length; i++) {
//       //* Expect the amount to not have a negative sign
//       const amount = await rows[i].getByRole('cell').nth(1).innerText()
//       console.log('amount', await rows[i].getByRole('cell'))

//       expect(amount).not.toContain('-')
//     }

//     //* Filter by date range
//     await page.getByLabel('Start Date').fill('2023-01-01')
//     await page.getByLabel('End Date').fill('2023-12-31')
//     rows = await page.getByRole('row').all()
//     for (let i = 1; i < rows.length; i++) {
//       // Skip header row
//       const dateText = await rows[i].getByRole('cell').first().innerText()
//       const date = new Date(dateText)
//       expect(date.getFullYear()).toBe(2023)
//     }

//     // //* Test pagination
//     // const initialPageText = await page.getByText(/Page \d+ of \d+/).innerText()
//     // await page.getByTestId('next-page').click()
//     // const newPageText = await page.getByText(/Page \d+ of \d+/).innerText()
//     // expect(newPageText).not.toBe(initialPageText)
//   })

// test('should display and filter statements correctly', async ({ page }) => {
//   await page.goto(LOCAL_URL)

//   // Check initial number of rows
//   let rows = await page.getByRole('row').all()
// //   expect(rows.length).toBeGreaterThan(1)

//   // Filter by deposit
//   await page.getByRole('button', { name: 'Deposits' }).click()

//   rows = await page.getByRole('row').all()
//   for (let i = 1; i < rows.length; i++) {
//     // Skip header row
//     const amount = await rows[i].getByRole('cell').nth(1).innerText()
//     expect(amount).not.toContain('-')
//   }

//   // Filter by date range
//   await page.getByTestId('start-date').fill('2023-01-01')
//   await page.getByTestId('end-date').fill('2023-12-31')

//   await page.waitForTimeout(1000) // Wait for the table to update

//   rows = await page.getByRole('row').all()
//   for (let i = 1; i < rows.length; i++) {
//     // Skip header row
//     const dateText = await rows[i].getByRole('cell').first().innerText()
//     console.log('dateText', dateText)
//     // const date = new Date(dateText)
//     // expect(dateText).toBe(2023)
//   }

//   // Test pagination
//   const initialPageText = await page.getByText(/Page \d+ of \d+/).innerText()
//   await page.getByTestId('next-page').click()

//   await page.waitForTimeout(1000) // Wait for the table to update

//   const newPageText = await page.getByText(/Page \d+ of \d+/).innerText()
//   expect(newPageText).not.toBe(initialPageText)

//   // Test search functionality
//   await page.getByPlaceholder('Search by date or amount').fill('100')

//   await page.waitForTimeout(1000) // Wait for the table to update

//   rows = await page.getByRole('row').all()
//   expect(rows.length).toBeGreaterThan(1)
//   for (let i = 1; i < rows.length; i++) {
//     // Skip header row
//     const rowText = await rows[i].innerText()
//     expect(rowText).toContain('100')
//   }
// })
})
