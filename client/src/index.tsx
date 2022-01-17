import { ApolloProvider } from '@apollo/client'
import { App } from '@components/App'
import { Theme } from '@components/Theme'
import { store } from '@store/index'
import { SnackbarProvider } from 'notistack'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import '../styles/index.css'
import '../styles/tailwind.css'
import { apolloClient } from './api/index'

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <BrowserRouter>
        <SnackbarProvider maxSnack={3}>
          <Theme>
            <App />
          </Theme>
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
    ,
  </ApolloProvider>,

  document.getElementById('app'),
)
