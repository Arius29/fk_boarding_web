export const isDateBeforeToday = (date: Date) => {
  return new Date(date.toDateString()) < new Date(new Date().toDateString())
}

export const isDateBeforeTodayStr = (date: string) => {
  return new Date(date) < new Date()
}
