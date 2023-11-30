import { Box, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { resetCart } from '~/redux/features/cartSlice'
import { stateAuth } from '~/redux/selector'
import { fetchCreateOrder } from '~/services/api'

const DefaultPayment = ({ data }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { accessToken } = useSelector(stateAuth)

    const handleSubmit = async () => {
        try {
            const res = await fetchCreateOrder(accessToken, data)
            if (res && res.status == 201) {
                toast('Thanh Toán Thành Công. Vui Lòng Chờ Admin Xác Nhận Đơn Hàng')
                navigate(`/order-detail/${res.data.order_id}`)
                dispatch(resetCart())
            }
        } catch (error) {
            toast.error('Thanh Toán Thất Bại. Vui Lòng Thử Lại Sau.')
        }
    }

    return (
        <Box>
            <Button variant="contained" color="success" onClick={handleSubmit}>
                Xác Nhận Thanh Toán
            </Button>
        </Box>
    )
}

export default DefaultPayment
