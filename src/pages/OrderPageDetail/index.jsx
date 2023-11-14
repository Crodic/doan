import { Box, Divider, Paper, Typography } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Logo from '~/assets/images/came.svg'

const OrderPageDetail = () => {
    const { bid } = useParams()
    const [bill, setBill] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Typography variant="h3" textAlign="center" mt={5}>
                    Đơn Hàng Của Tôi
                </Typography>
                <Paper elevation={3} sx={{ width: '80%', minHeight: '500px', marginX: 'auto', p: 4, marginY: '40px' }}>
                    <Box
                        sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '20px' }}
                    >
                        <img src={Logo} alt="" style={{ width: '5%', marginRight: '20px' }} />
                        <Typography variant="h5">CAME STORE</Typography>
                    </Box>
                    <Box>
                        <Typography variant="h4" textAlign="center">
                            Phiếu Đặt Hàng
                        </Typography>
                        <br />
                        <Divider />
                    </Box>
                    <br />
                    <Box component="ul" sx={{ marginTop: '10px', paddingX: '20px' }}>
                        <Box component="li" sx={{ mt: '10px' }}>
                            Mã Đơn Hàng:{' '}
                            <Typography component="span" p={5}>
                                1
                            </Typography>
                        </Box>
                        <Box component="li" sx={{ mt: '10px' }}>
                            Người Nhận:{' '}
                            <Typography component="span" p={5}>
                                Crodic
                            </Typography>
                        </Box>
                        <Box component="li" sx={{ mt: '10px' }}>
                            Tổng Số Sản Phẩm:{' '}
                            <Typography component="span" p={5}>
                                12
                            </Typography>
                        </Box>
                        <Box component="li" sx={{ mt: '10px' }}>
                            Tổng Tiền:{' '}
                            <Typography component="span" color="pink">
                                255000 VNĐ
                            </Typography>
                        </Box>
                        <Box component="li" sx={{ mt: '10px' }}>
                            Địa Chỉ Nhận Hàng:{' '}
                            <Typography component="span" color="red">
                                OKAY
                            </Typography>
                        </Box>
                        <Box component="li" sx={{ mt: '10px' }}>
                            Trạng Thái Đơn Hàng:{' '}
                            <Typography component="span" color="green">
                                Chờ Xác nhân
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'end', flexDirection: 'column' }}>
                        <Typography variant="h5">Người Xác Nhận Đơn</Typography>
                        <Typography color="red">Admin Store</Typography>
                    </Box>
                </Paper>
                <Typography variant="caption" textAlign="center">
                    Bạn có thể xem lại đơn hàng này và trạng thái đơn hàng trong phần thông tin user
                </Typography>
            </Box>
        </>
    )
}

export default OrderPageDetail
