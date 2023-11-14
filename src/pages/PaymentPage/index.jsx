import {
    Box,
    Button,
    Divider,
    FormControl,
    FormControlLabel,
    Paper,
    Radio,
    RadioGroup,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import ShowItem from './components/ShowItem'
import { useSelector } from 'react-redux'
import { stateAuth, stateCart } from '~/redux/selector'
import { useEffect, useState } from 'react'
import DefaultPayment from './components/DefaultPayment'
import PaypalPayment from './components/PaypalPayment'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchUser } from '~/services/api'
import { toast } from 'react-toastify'

const PaymentPage = () => {
    const [disable, setDisable] = useState(true)
    const { cart, quantity, total } = useSelector(stateCart)
    const { uid: user, accessToken } = useSelector(stateAuth)
    const { uid } = useParams()
    const [userPayment, setUserPayment] = useState(null)
    const [formValue, setFormValue] = useState({
        fullname: userPayment?.fullname || '',
        address: userPayment?.address || '',
        phone: userPayment?.phone || '',
        email: userPayment?.emaill || '',
    })
    const navigate = useNavigate()
    const [payment, setPayment] = useState('offline')
    const handleChangePayment = e => {
        setPayment(e.target.value)
    }

    useEffect(() => {
        if (cart?.length <= 0) {
            toast.warning('Giỏ Hàng Hiện Tại Đang Rỗng. Hãy Mua Gì Đó Rồi Quay Lại Sau')
            navigate('/')
        }
        if (user != uid) {
            navigate('/')
        } else {
            getUser(accessToken)
        }
    }, [uid, accessToken])

    useEffect(() => {
        setFormValue({
            fullname: userPayment?.fullname || '',
            address: userPayment?.address || '',
            phone: userPayment?.phone || '',
            email: userPayment?.email || '',
        })
    }, [userPayment])

    const getUser = async token => {
        try {
            let res = await fetchUser(token)
            if (res && res.status === 200) {
                setUserPayment(res.data.user)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickChange = () => {
        setDisable(!disable)
    }
    return (
        <Box sx={{ my: 3 }}>
            <Typography variant="h4" textAlign="center">
                Thanh Toán Đơn Hàng
            </Typography>
            <Box component="section" sx={{ mt: 4, display: 'flex', gap: 2, px: 7 }}>
                <ShowItem cart={cart} />
                <Box sx={{ width: '400px', minHeight: '100vh', maxHeight: 'fit-content' }} component={Paper}>
                    <Typography textAlign="center" variant="h6" mt={2}>
                        Thông Tin Liên Lạc:
                    </Typography>
                    <Stack sx={{ width: '90%', margin: '20px auto' }} spacing={2}>
                        <TextField
                            type="text"
                            size="small"
                            label="Nhập Tên Người Nhận Hàng"
                            disabled={disable}
                            value={formValue.fullname}
                            onChange={e => setFormValue(prev => ({ ...prev, fullname: e.target.value }))}
                        />
                        <TextField
                            type="text"
                            size="small"
                            label="Địa Chỉ Nhận Hàng"
                            helperText="VD: 276 Phạm Văn Ninh, Phường 2, Quận 1, TP.HCM"
                            disabled={disable}
                            value={formValue.address}
                            onChange={e => setFormValue(prev => ({ ...prev, address: e.target.value }))}
                        />
                        <TextField
                            type="text"
                            size="small"
                            label="Nhập Số Điện Thoại Nhận Hàng"
                            disabled={disable}
                            value={formValue.phone}
                            onChange={e => setFormValue(prev => ({ ...prev, phone: e.target.value }))}
                        />
                        <TextField
                            type="email"
                            size="small"
                            label="Nhập Email Nhận Hàng"
                            disabled={disable}
                            value={formValue.email}
                            onChange={e => setFormValue(prev => ({ ...prev, email: e.target.value }))}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3 }}>
                            <Button variant="contained" color="secondary" onClick={handleClickChange}>
                                {!disable ? 'Đồng Ý' : 'Thay Đổi'}
                            </Button>
                        </Box>
                    </Stack>
                    <Divider />
                    <Stack spacing={1} p={1}>
                        <Typography textAlign="center">Thông Tin Hoá Đơn</Typography>
                        <Typography variant="caption" fontSize={16}>
                            Tên Người Nhận: <br /> {formValue.fullname}
                        </Typography>
                        <Typography variant="caption" fontSize={16}>
                            Địa Chỉ Nhận Hàng: <br /> {formValue.address}
                        </Typography>
                        <Typography variant="caption" fontSize={16}>
                            Số Điện Thoại Nhận Hàng: <br /> {formValue.phone}
                        </Typography>
                    </Stack>
                </Box>
            </Box>
            <Box sx={{ mt: 4, px: 7 }}>
                <Box component="fieldset">
                    <Typography variant="h6" fontFamily="cursive" component="legend">
                        Chọn Hình Thức Thanh Toán
                    </Typography>
                    <FormControl sx={{ pl: 5 }}>
                        <RadioGroup
                            aria-labelledby="payment-method"
                            name="payment"
                            value={payment}
                            onChange={handleChangePayment}
                        >
                            <FormControlLabel value="offline" control={<Radio />} label="Thanh Toán Khi Nhận Hàng" />
                            <FormControlLabel value="online" control={<Radio />} label="Thanh Toán Qua Paypal" />
                        </RadioGroup>
                    </FormControl>
                </Box>
            </Box>
            <Box sx={{ mt: 4, px: 7 }}>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <Typography variant="h5">Đơn Hàng</Typography>
                    <Typography variant="body2" sx={{ pl: 2, my: 1 }}>
                        Số Lượng Sản Phẩm: {quantity}
                    </Typography>
                    <Divider />
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h5" color="red">
                            Tổng Tiền: {Math.floor(total)} VNĐ
                        </Typography>
                    </Box>
                </Paper>
            </Box>
            <Box sx={{ mt: 4, px: 7 }}>
                {payment === 'offline' ? (
                    <DefaultPayment />
                ) : (
                    <PaypalPayment
                        amount={Math.round(total / 23500)}
                        fullname={userPayment?.fullname}
                        address={userPayment?.address}
                    />
                )}
            </Box>
        </Box>
    )
}

export default PaymentPage
