import Drawer from '@mui/material/Drawer'
import { Button, Divider, Stack, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useSelector } from 'react-redux'
import { stateAuth, stateCart } from '~/redux/selector'
import CartItem from '~/components/CartItem'
import React from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { formatCurrency } from '~/utilities/helper'

export default function CartDrawer({ openCart, handleCloseCart }) {
    const { cart, total } = useSelector(stateCart)
    const { auth, uid } = useSelector(stateAuth)
    const navigate = useNavigate()

    const handleCreateBill = () => {
        if (!auth) {
            toast.warning('Đăng Nhập Để Mua Hàng')
            return
        }
        handleCloseCart()
        navigate(`/payment/${uid}`)
    }

    return (
        <Drawer anchor="right" open={openCart} onClose={handleCloseCart}>
            <Box
                sx={{
                    width: { xs: 270, md: 380 },
                    position: 'relative',
                    height: '100%',
                }}
            >
                <Box sx={{ background: 'primary.main', p: 2, textAlign: 'center' }}>
                    <Typography variant="h5" fontFamily="cursive">
                        Giỏ Hàng Của Tôi
                    </Typography>
                </Box>
                <Divider />
                <Stack component="ul" spacing={1} maxHeight="70vh" minHeight="70vh" sx={{ overflowY: 'scroll' }}>
                    {cart.length == 0 && (
                        <Box
                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}
                        >
                            Giỏ Hàng Đang Rỗng
                        </Box>
                    )}
                    {cart?.map((item, index) => {
                        return (
                            <React.Fragment key={`came-${index}`}>
                                <CartItem key={item.pid} product={item} />
                                <Divider component="li" />
                            </React.Fragment>
                        )
                    })}
                </Stack>
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        left: 0,
                        p: 2,
                        zIndex: 100,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 5,
                        backgroundColor: '#00000080',
                        boxShadow: '0 0 10px #fff',
                    }}
                >
                    <Box>
                        <Typography variant="subtitle1">Tổng Tiền: </Typography>
                        <Typography variant="subtitle1" color="error.main" fontWeight="700">
                            {formatCurrency(Math.floor(total))}
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ height: 'fit-content' }}
                        onClick={handleCreateBill}
                    >
                        Thanh Toán
                    </Button>
                </Box>
            </Box>
        </Drawer>
    )
}
