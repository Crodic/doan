import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { resetCart } from '~/redux/features/cartSlice'
import { stateAuth, stateCart } from '~/redux/selector'
import { fetchCreateOrder } from '~/services/api'

const PaypalPayment = ({ amount, address, fullname, formValue }) => {
    const [format, setFormat] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { accessToken } = useSelector(stateAuth)
    const store = useSelector(stateCart)

    useEffect(() => {
        let split = address?.split(', ')
        setFormat(split)
    }, [address])

    return (
        <PayPalScriptProvider
            options={{
                clientId: 'AVI_FFcyd2VFiQmAN-k8-w7G6XMU35M_xGH8-v1etlxCaH4qh9mDzHmPUhjrJZM998EiQMrOtlwZB0xu',
            }}
        >
            <PayPalButtons
                style={{ shape: 'pill' }}
                createOrder={(data, action) => {
                    return action.order.create({
                        application_context: {
                            shipping_preference: 'SET_PROVIDED_ADDRESS',
                        },
                        purchase_units: [
                            {
                                description: 'Thanh Toán Cho Came Store',
                                amount: {
                                    value: amount,
                                },
                                shipping: {
                                    name: {
                                        full_name: fullname,
                                    },
                                    address: {
                                        address_line_1: format[0] || '',
                                        address_line_2: `${(format[1] || '', format[2] || '')}`,
                                        admin_area_1: 'VN',
                                        admin_area_2: format[3] || '',
                                        postal_code: '85001',
                                        country_code: 'US',
                                    },
                                },
                            },
                        ],
                    })
                }}
                onApprove={async (data, action) => {
                    const order = await action.order.capture()
                    const status = await order
                    if (status.status === 'COMPLETED') {
                        try {
                            const res = await fetchCreateOrder(accessToken, {
                                fullname: fullname,
                                phone_number: formValue?.phone,
                                note: '(Trống)',
                                total_money: store.total,
                                payment_methods: 'paypal',
                                address: address,
                                email: formValue?.email,
                                cart: store.cart,
                            })
                            if (res && res.status == 201) {
                                toast('Thanh Toán Thành Công. Vui Lòng Chờ Admin Xác Nhận Đơn Hàng')
                                dispatch(resetCart())
                                navigate(`/order-detail/${res.data.order_id}`)
                            }
                        } catch (error) {
                            toast.error('Thanh Toán Thất Bại. Vui Lòng Liên Hệ Với Cửa Hàng Để Được Giải Quyết')
                        }
                    } else {
                        toast.warning('Internal Server Error !!')
                    }
                }}
            />
        </PayPalScriptProvider>
    )
}

export default PaypalPayment
