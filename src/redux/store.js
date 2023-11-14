import UserSlice from './features/userSlice'
import appSlice from './features/appSlice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import { persistConfigUser, persistConfigApp, persistConfigCart } from '~/redux/persistConfig'
import { testApi } from './services/test.api'
import { rtkQueryErrorLogger } from './middleware/middleware'
import cartSlice from './features/cartSlice'
import { injectStore } from '~/services/axios/authAxios'

// Create Root Reducer
const _rootReducer = combineReducers({
    user: persistReducer(persistConfigUser, UserSlice),
    app: persistReducer(persistConfigApp, appSlice),
    cart: persistReducer(persistConfigCart, cartSlice),
    [testApi.reducerPath]: testApi.reducer,
})

// Create Store
export const store = configureStore({
    reducer: _rootReducer, // Apply Root Reducer
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(testApi.middleware, rtkQueryErrorLogger),
})

// Apply when using refreshOnForcus and refreshOnReconnect
// setupListeners(store.dispatch)

injectStore(store)

export const persistor = persistStore(store)

export default store
