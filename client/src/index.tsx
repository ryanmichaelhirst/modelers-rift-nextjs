import { App } from '@components/App'
import { store } from '@store/index'
import { SnackbarProvider } from 'notistack'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import '../styles/index.css'
import '../styles/tailwind.css'

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  </Provider>,
  document.getElementById('app'),
)
