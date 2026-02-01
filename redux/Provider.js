'use client'

import { Provider } from "react-redux"
import { store, persistor } from "./store"

import { PersistGate } from "redux-persist/integration/react"


export function ReduxProvider({ children }) {

    return <Provider store={store}>

        <PersistGate loading={<div>loading...</div>} persistor={persistor}>

        {children}
        </PersistGate>
    </Provider>
}