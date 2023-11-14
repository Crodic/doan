import { Box, Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { resetCart } from '~/redux/features/cartSlice'

const DefaultPayment = ({ data }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = () => {
        toast('Thanh Toán Thành Công. Vui Lòng Chờ Admin Xác Nhận Đơn Hàng')
        navigate('/order-detail/1')
        dispatch(resetCart())
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
