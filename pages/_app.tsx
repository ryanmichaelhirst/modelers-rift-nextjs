import ErrorBoundary from '@/components/error-boundary'
import { Layout } from '@/components/layout'
import { trpc } from '@/utils/trpc'
import { Nunito_Sans } from '@next/font/google'
import 'abort-controller/polyfill'
import { AppType } from 'next/dist/shared/lib/utils'
import Head from 'next/head'
import '../styles/tailwind.css'

const nunito = Nunito_Sans({
  weight: ['200', '300', '400', '600', '700', '800', '900'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-nunito',
})

const NextApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Modeler's Rift</title>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <ErrorBoundary>
        <main className={`${nunito.variable} font-sans`}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </ErrorBoundary>
    </>
  )
}

export default trpc.withTRPC(NextApp)
