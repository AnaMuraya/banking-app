export const formatCurrency = (value?: string) => {
  return parseFloat(value || '0').toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
