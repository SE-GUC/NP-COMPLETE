import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import 'bootstrap/dist/css/bootstrap.css'
import { Provider } from 'react-redux'
import store, { persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor} >
      <App />
    </PersistGate>
  </Provider>
  ,
  document.getElementById('root'))
serviceWorker.unregister()
