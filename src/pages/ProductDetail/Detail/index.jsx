import { Box, Button, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Quantity from '~/components/Quantity'
import { addCart } from '~/redux/features/cartSlice'
import { stateAuth } from '~/redux/selector'
import { formatCurrency } from '~/utilities/helper'

const Detail = ({ product }) => {
    const [quantity, setQuantity] = useState(1)
    const { auth } = useSelector(stateAuth)
    const dispatch = useDispatch()

    const handleAddCart = () => {
        if (!auth) {
            toast('🦄 Bạn Cần Đăng Nhập Để Mua Hàng')
            return
        }

        const data = {
            ...product,
            quantity,
        }

        delete data.slug
        delete data.description
        dispatch(addCart(data))
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant="h4">{product?.title}</Typography>
            <Typography variant="subtitle2" color="red" fontFamily="cursive">
                Giá Sản Phẩm:{' '}
                <Box component="span" sx={{ textDecoration: product?.discount ? 'line-through' : 'unset' }}>
                    {product?.price && formatCurrency(product?.price)}
                </Box>
            </Typography>
            {product?.discount && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 'fit-content',
                        gap: 2,
                    }}
                >
                    <Box
                        component="span"
                        sx={{
                            padding: 1,
                            backgroundColor: 'primary.main',
                            color: 'white',
                            fontWeight: 700,
                            width: 'fit-content',
                            borderRadius: '10px',
                            fontSize: 12,
                            display: 'inline-block',
                        }}
                    >
                        -{product?.discount}%
                    </Box>

                    <Box fontFamily="cursive" component="span" color="red">
                        Giá Chỉ Còn:{' '}
                        {product?.price &&
                            formatCurrency(Math.round(product?.price - product?.price / product?.discount))}{' '}
                    </Box>
                </Box>
            )}
            <Box sx={{ width: '100%', maxHeight: '120px', overflowY: 'scroll' }}>{product?.description}</Box>
            <Typography variant="caption" fontWeight={500}>
                Giá Sản Phẩm Chưa Bao Gồm VAT + Phí Giao Hàng
            </Typography>
            {product?.isDeleted == 0 && (
                <Box>
                    <Stack spacing={2}>
                        <Typography variant="h6">Số Lượng</Typography>
                        <Quantity quantity={quantity} setQuantity={setQuantity} />
                    </Stack>
                </Box>
            )}
            <Typography variant="caption">
                CAME STORE cam kết hoàn tiền 100% nếu sản phẩm gặp vắn đề trong lúc giao hàng. <br /> Xem
                <a href="#"> chính sách</a> của chúng tôi
            </Typography>
            {product?.isDeleted == 0 ? (
                <Box sx={{ my: 4 }}>
                    <Button variant="contained" color="primary" onClick={handleAddCart}>
                        Thêm Vào Giỏ Hàng
                    </Button>
                </Box>
            ) : (
                <Box sx={{ my: 4 }}>
                    <Button variant="contained" color="error">
                        Sản Phẩm Tạm Hết Hãng
                    </Button>
                </Box>
            )}
        </Box>
    )
}

export default Detail
