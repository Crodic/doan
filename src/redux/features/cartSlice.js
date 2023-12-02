import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const CartSlice = createSlice({
    name: 'cart',
    initialState: { cart: [], quantity: 0, total: 0 },
    reducers: {
        addCart: (state, action) => {
            const product = action.payload
            const findProductInCart = state.cart.find(item => item.pid === product.pid)
            if (findProductInCart) {
                toast('Sản Phẩm Đã Tồn Tại Trong Giỏ Hàng')
                return
            }

            state.cart.push(product)
            state.quantity = state.quantity + 1
            const newTotal = state.total + (product.price - product.price / product.discount) * product.quantity
            state.total = newTotal
            toast.success('Thêm Sản Phẩm Thành Công')
        },
        updateQuantity: (state, action) => {
            const { pid, quantity } = action.payload
            state.cart.map(item => {
                if (item.pid === pid) {
                    let oldTotal = (item.price - item.price / item.discount) * item.quantity
                    item.quantity = quantity
                    state.total = state.total + (item.price - item.price / item.discount) * item.quantity - oldTotal
                }
            })
        },
        deleteProduct: (state, action) => {
            const pid = action.payload
            const index = state.cart.findIndex(item => item.pid === pid)
            if (index != -1) {
                const findProduct = state.cart.find(item => item.pid === pid)
                state.cart.splice(index, 1)
                state.quantity = state.quantity - 1
                state.total = state.total =
                    state.total - (findProduct.price - findProduct.price / findProduct.discount) * findProduct.quantity
            }
        },
        resetCart: state => {
            state.cart = []
            state.quantity = 0
            state.total = 0
        },
    },
})

export default CartSlice.reducer
export const { addCart, updateQuantity, deleteProduct, resetCart } = CartSlice.actions
