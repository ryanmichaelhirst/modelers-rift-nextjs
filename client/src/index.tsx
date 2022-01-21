import { ApolloProvider } from '@apollo/client'
import { App } from '@components/App'
import { Theme } from '@components/Theme'
import { SnackbarProvider } from 'notistack'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import '../styles/index.css'
import '../styles/tailwind.css'
import { apolloClient } from './api/index'
import { initialState, reducer, StoreProvider } from './context'

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <StoreProvider initialState={initialState} reducer={reducer}>
      <BrowserRouter>
        <SnackbarProvider maxSnack={3}>
          <Theme>
            <App />
          </Theme>
        </SnackbarProvider>
      </BrowserRouter>
    </StoreProvider>
    ,
  </ApolloProvider>,

  document.getElementById('app'),
)
