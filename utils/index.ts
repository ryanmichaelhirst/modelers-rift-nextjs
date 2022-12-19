import { utcToZonedTime } from 'date-fns-tz'
import { format } from 'date-fns'

// given 'the dog' returns 'The Dog'
export const capitalize = (str?: string | null) => {
  if (!str) return ''

  return str
    .split(' ')
    .reduce((acc, cur) => {
      acc += cur.charAt(0).toUpperCase() + cur.substring(1) + ' '

      return acc
    }, '')
    .trimEnd()
}

export const toNumber = (value: string | number) =>
  typeof value === 'string' ? parseInt(value) : value

export const toDollarAmount = (value: string | number) => {
  const amount = toNumber(value)

  return `$${(amount / 100).toFixed(2)}`
}

export const toDollarNumber = (value?: string | number | null) => {
  if (!value) return 0

  const amount = toNumber(value)

  return amount / 100
}

const timezone = () => Intl.DateTimeFormat().resolvedOptions().timeZone

export const formatLocalDate = (date: Date) => {
  const dateWithTimezone = utcToZonedTime(date, timezone())

  return format(dateWithTimezone, 'MM/dd/yyyy hh:mm:ss aaa')
}
