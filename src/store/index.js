import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { networkReducer } from './reducers/networkReducer'
import { celoNetworkReducer } from './reducers/celoNetworkReducer'
import { systemReducer } from './reducers/systemReducer'

const rootReducer = combineReducers({
  networkReducer: networkReducer,
  celoNetworkReducer: celoNetworkReducer,
  systemReducer: systemReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
export default store
