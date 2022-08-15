export const setWindowCookie = (token: string) => {
  if (typeof window === 'undefined') throw new Error('window is not defined')

  window.document.cookie = token
}
