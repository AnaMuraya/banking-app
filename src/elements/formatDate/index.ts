export const formatDate = (inputDate: string): string => {
  const date = new Date(inputDate)
  const now = new Date()

  const isToday = date.toDateString() === now.toDateString()
  const isYesterday = new Date(now.getTime() - 86400000).toDateString() === date.toDateString()

  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }

  const timeString = date.toLocaleTimeString('en-US', options)

  if (isToday) {
    return `Today at ${timeString}`
  } else if (isYesterday) {
    return `Yesterday at ${timeString}`
  } else {
    const monthsAgo = (now.getFullYear() - date.getFullYear()) * 12 + now.getMonth() - date.getMonth()
    const dateFormatOptions: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: 'numeric',
    }

    if (monthsAgo > 12) dateFormatOptions.year = 'numeric'

    const dateString = date.toLocaleDateString('en-US', dateFormatOptions)
    return `${dateString} at ${timeString}`
  }
}
