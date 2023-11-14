import sessionStorage from 'redux-persist/es/storage/session'
import storage from 'redux-persist/lib/storage'

export const persistConfigUser = {
    key: 'user',
    storage,
}

export const persistConfigApp = {
    key: 'app',
    storage,
    whitelist: ['mode'],
}

export const persistConfigCart = {
    key: 'cart',
    storage,
}
