import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {combineReducers, configureStore} from "@reduxjs/toolkit"
import {Provider} from "react-redux"
import productsReducer, { productsFetch } from './features/productsSlice.js'
import { productsApi } from './features/productsApi.js'
import cartReducer, { getTotals } from './features/cartSlice.js'
import authReducer from './features/authSlice.js'
import profileReducer from './features/profileSlice.js'
import modalReducer from './features/modalSlice.js'
import homeReducer, { fetchHomeUsers } from './features/homeSlice.js'
import { deFaultHomeUsersApi } from './features/defautlHomeUsersApi.js'
import offCanvasReducer from './features/offCanvasSlice.js'
//redux-persist
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import textModalReducer from './features/textModalSlice.js'
import chatReducer from './features/chatSlice.js'
import chatMiddleware from './utils/chatMiddleware.js'
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import statsReducer from './features/statsSlice.js'
import registerReducer from './features/registerSlice.js'
import appReducer from './features/appSlice.js'
//peristConfig
const persistConfig = {
  key: 'root',
  storage,
}
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  auth: authReducer,
  profile: profileReducer,
  modal: modalReducer,
  home: homeReducer,
  offCanvas: offCanvasReducer,
  textModal: textModalReducer,
  chat: chatReducer,
  stats: statsReducer,
  register: registerReducer,
  app: appReducer,
  [productsApi.reducerPath]:productsApi.reducer,
  [deFaultHomeUsersApi.reducerPath]: deFaultHomeUsersApi.reducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
  return  getDefaultMiddleware({
    
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }
  }).concat(deFaultHomeUsersApi.middleware, productsApi.middleware, chatMiddleware)
  }  
   
})
const persistor = persistStore(store)
store.dispatch(productsFetch())
store.dispatch(getTotals())
store.dispatch(fetchHomeUsers())

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <Provider store = {store}>
          <PersistGate loading = {null} persistor={ persistor}>
            <App />
          </PersistGate>
        </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
