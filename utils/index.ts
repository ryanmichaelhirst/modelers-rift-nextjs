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
