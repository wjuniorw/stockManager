import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import App from './app'

//import styles...
import './styles/bootstrap.css'
import './styles/style.css'
import './styles/index.css'

import * as reducers from './store/reducers'
const store = createStore(combineReducers(reducers), applyMiddleware(thunk))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
