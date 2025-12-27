import { configureStore } from '@reduxjs/toolkit'

import { persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import profileSlice from './slices/profileSlice'
import activeLinkSlice from './slices/activeLinkSlice'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  profile: profileSlice,
  activeLink: activeLinkSlice
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['profile']

};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore =  configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });


export const persistor = persistStore(makeStore);