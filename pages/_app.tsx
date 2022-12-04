import ErrorBoundary from '@/components/error-boundary'
import { Layout } from '@/components/layout'
import { trpc } from '@/utils/trpc'
import 'abort-controller/polyfill'
import { AppType } from 'next/dist/shared/lib/utils'
import Head from 'next/head'
import '../styles/tailwind.css'

const NextApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Modeler's Rift</title>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <ErrorBoundary>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ErrorBoundary>
    </>
  )
}

export default trpc.withTRPC(NextApp)
