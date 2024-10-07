import { formatDate } from '.'

describe('formatDate', () => {
  it('returns "Today at <time>" when the input date is today', () => {
    const today = new Date()
    const inputDate = today.toISOString()
    const expectedOutput = `Today at ${today.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })}`
    expect(formatDate(inputDate)).toBe(expectedOutput)
  })

  it('returns "Yesterday at <time>" when the input date is yesterday', () => {
    const yesterday = new Date(new Date().getTime() - 86400000)
    const inputDate = yesterday.toISOString()
    const expectedOutput = `Yesterday at ${yesterday.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })}`
    expect(formatDate(inputDate)).toBe(expectedOutput)
  })
})
