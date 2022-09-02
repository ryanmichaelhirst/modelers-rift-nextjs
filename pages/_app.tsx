import ErrorBoundary from '@components/error-boundary'
import { Layout } from '@components/layout'
import { initialState, reducer, StoreProvider } from '@context/index'
import { withTRPC } from '@trpc/next'
import 'abort-controller/polyfill'
import { AppType } from 'next/dist/shared/lib/utils'
import Head from 'next/head'
import superjson from 'superjson'
import '../styles/tailwind.css'
import { AppRouter } from './api/trpc/[trpc]'

const NextApp: AppType = ({ Component, pageProps }) => {
  return (
    <StoreProvider initialState={initialState} reducer={reducer}>
      <Head>
        <title>Modeler's Rift</title>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <ErrorBoundary>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ErrorBoundary>
    </StoreProvider>
  )
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc'

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  // ssr: true,
})(NextApp)
