// https://nextjs.org/docs/advanced-features/middleware#using-cookies
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// must set cookies in middleware to access in getServerSideProps
export function middleware(request: NextRequest) {
  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API
  const token = request.cookies.get('token')
  const refresh = request.cookies.get('refresh')

  // Setting cookies on the response using the `ResponseCookies` API
  const response = NextResponse.next()
  // TODO: update when next-13 supports setting cookies
  // https://beta.nextjs.org/docs/api-reference/cookies
  // @ts-ignore
  if (token) response.cookies.set('token', token)
  // @ts-ignore
  if (refresh) response.cookies.set('refresh', refresh)

  return response
}
