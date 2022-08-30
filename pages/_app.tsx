import { ApolloProvider } from '@apollo/client'
import ErrorBoundary from '@components/error-boundary'
import { Layout } from '@components/layout'
import { initialState, reducer, StoreProvider } from '@context/index'
import { apolloClient } from '@lib/apollo'
import 'abort-controller/polyfill'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/tailwind.css'

const NextApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={apolloClient}>
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
    </ApolloProvider>
  )
}

export default NextApp
