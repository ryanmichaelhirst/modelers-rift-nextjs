import { App } from '@components/App'
import { Theme } from '@components/Theme'
import { store } from '@store/index'
import { SnackbarProvider } from 'notistack'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import '../styles/index.css'
import '../styles/tailwind.css'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <SnackbarProvider maxSnack={3}>
        <Theme>
          <App />
        </Theme>
      </SnackbarProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app'),
)
