import App from '@components/App'
import { store } from '@store/index'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import '../styles/index.css'
import '../styles/tailwind.css'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
)
