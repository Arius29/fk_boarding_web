export const isDateBeforeToday = (date: Date) => {
  return new Date(date.toDateString()) < new Date(new Date().toDateString())
}

export const isDateBeforeTodayStr = (date: string) => {
  return new Date(date) < new Date()
}

export const getTimeDate = (date: Date | string | number) => {
  const datetime = new Date(date)
  return datetime.toLocaleTimeString().replace(/:\d{2}\s/, ' ')
}

const getTimeAgo = (interval: number, label: string) => {
  return `${interval} ${label}${interval > 1 ? 's' : ''} ago`
}

export const timeAgo = (input: Date | string | number) => {
  const date =
    typeof input === 'string' || typeof input === 'number'
      ? new Date(input)
      : input
  const seconds = Math.floor((new Date() - date) / 1000)
  let interval = Math.floor(seconds / 31536000)

  if (interval >= 1) return getTimeAgo(interval, 'year')
  interval = Math.floor(seconds / 2592000)

  if (interval >= 1) return getTimeAgo(interval, 'month')
  interval = Math.floor(seconds / 86400)

  if (interval >= 1) return getTimeAgo(interval, 'day')
  interval = Math.floor(seconds / 3600)

  if (interval >= 1) return getTimeAgo(interval, 'hour')
  interval = Math.floor(seconds / 60)

  if (interval >= 1) return getTimeAgo(interval, 'minute')
  return 'just now'
}
