import { ApolloProvider } from '@apollo/client'
import { Layout } from '@components/layout'
import { Theme } from '@components/theme'
import { initialState, reducer, StoreProvider, useAppContext } from '@context/index'
import { FETCH_LOL_INFO } from '@customtypes/index'
import { StyledEngineProvider } from '@mui/material/styles'
import 'abort-controller/polyfill'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SnackbarProvider } from 'notistack'
import React, { FC, useEffect } from 'react'
import { apolloClient } from '../lib/apollo'
import '../styles/app.css'
import '../styles/tailwind.css'

const AppWrapper: FC<{ children: React.ReactElement<any, any> | null }> = ({ children }) => {
  const [, dispatch] = useAppContext()

  useEffect(() => {
    dispatch({ type: FETCH_LOL_INFO })
  }, [])

  return <Layout>{children}</Layout>
}

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
            <AppWrapper>
              <Theme>
                <Component {...pageProps} />
              </Theme>
            </AppWrapper>
          </SnackbarProvider>
        </StyledEngineProvider>
      </StoreProvider>
    </ApolloProvider>
  )
}

export default NextApp
