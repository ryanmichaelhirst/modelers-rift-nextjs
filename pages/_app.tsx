import { ApolloProvider } from '@apollo/client'
import ErrorBoundary from '@components/error-boundary'
import { Layout } from '@components/layout'
import { Theme } from '@components/theme'
import { initialState, reducer, StoreProvider } from '@context/index'
import { StyledEngineProvider } from '@mui/material/styles'
import 'abort-controller/polyfill'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SnackbarProvider } from 'notistack'
import { apolloClient } from '../lib/apollo'
import '../styles/tailwind.css'

const NextApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <StoreProvider initialState={initialState} reducer={reducer}>
        <StyledEngineProvider injectFirst>
          <SnackbarProvider maxSnack={3}>
            <Head>
              <title>Modeler's Rift</title>
              <meta name='viewport' content='width=device-width, initial-scale=1.0' />
            </Head>
            <Layout>
              <ErrorBoundary>
                <Theme>
                  <Component {...pageProps} />
                </Theme>
              </ErrorBoundary>
            </Layout>
          </SnackbarProvider>
        </StyledEngineProvider>
      </StoreProvider>
    </ApolloProvider>
  )
}

export default NextApp
