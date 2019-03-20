import React, { Component } from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import reducers from './reducers/index'
import indexSaga from './sagas/index'
import InfoIP from './InfoIP'
import InfoUA from './InfoUA'

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(indexSaga)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className='App'>
          <h3>Execícios Redux Sagas</h3>
          <InfoIP />
          <InfoUA />
        </div>
      </Provider>
    )
  }
}

export default App
