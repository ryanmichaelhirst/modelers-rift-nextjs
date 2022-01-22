import { ApolloProvider } from '@apollo/client'
import { App } from '@components/App'
import { Theme } from '@components/Theme'
import { StyledEngineProvider } from '@mui/material/styles'
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
        <StyledEngineProvider injectFirst>
          <SnackbarProvider maxSnack={3}>
            <Theme>
              <App />
            </Theme>
          </SnackbarProvider>
        </StyledEngineProvider>
      </BrowserRouter>
    </StoreProvider>
  </ApolloProvider>,
  document.getElementById('app'),
)
