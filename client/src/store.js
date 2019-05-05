import { applyMiddleware, createStore, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'

const initialState = {}
const middleware = [thunk]
const persistConfig = {
  key: 'root',
  storage
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, initialState, compose(
  applyMiddleware(...middleware),
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (a) => a
))

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})

export default store
export const persistor = persistStore(store)
