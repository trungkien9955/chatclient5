import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {combineReducers, configureStore} from "@reduxjs/toolkit"
import {Provider} from "react-redux"
import authReducer from './features/authSlice.js'
import profileReducer from './features/profileSlice.js'
import modalReducer from './features/modalSlice.js'
import homeReducer from './features/homeSlice.js'
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
import { injectStore } from './utils/CustomAxios.js'
import { injectStoreForAxiosFormData } from './utils/AxiosForFormData.js'
//peristConfig
const persistConfig = {
  key: 'root',
  storage,
  blacklist: [
    'auth',
],
}
const authPersistConfig = {
  key: 'auth',
  storage: storage,
  blacklist: ['accessToken']
}
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  profile: profileReducer,
  modal: modalReducer,
  home: homeReducer,
  offCanvas: offCanvasReducer,
  textModal: textModalReducer,
  chat: chatReducer,
  stats: statsReducer,
  register: registerReducer,
  app: appReducer,
})
const grandReducer = (state, action)=>{
  if(action.type === "auth/logoutUser"){
    return rootReducer(undefined, action)
  }
  return rootReducer(state,action)
}
const persistedReducer = persistReducer(persistConfig, grandReducer)
 const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
  return  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }
})
.concat(chatMiddleware)
  }   
   
})
injectStore(store)
injectStoreForAxiosFormData(store)
const persistor = persistStore(store)

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
