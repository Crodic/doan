import { Box, Chip, Divider, Paper, Typography } from '@mui/material'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

const mapping = ['', 'Chờ Xác Nhận', 'Đang Giao Hàng', 'Thành Công', 'Thất Bại']
const chipMapping = ['', 'warning', 'primary', 'success', 'error']
const Bill = ({ data }) => {
    const navigate = useNavigate()
    const cloudinaryRegex = /cloudinary/i

    const handleClickDetail = id => {
        navigate(`/order-detail/${id}`)
    }

    console.log(chipMapping[1])

    return (
        <Paper sx={{ p: 2 }} elevation={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Chip label={mapping[data?.status]} color={chipMapping[data?.status]} size="small" />
                <Typography onClick={() => handleClickDetail(data?.id)} sx={{ cursor: 'pointer' }}>
                    Xem Chi Tiết
                </Typography>
            </Box>
            {data?.product.map((product, index) => {
                return (
                    <Fragment key={index}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, my: 2 }}>
                            <Typography>1</Typography>
                            <Box sx={{ width: '100px' }}>
                                <img
                                    src={
                                        product?.images && cloudinaryRegex.test(product?.images)
                                            ? product?.images
                                            : `http://localhost/mvc${product?.images}`
                                    }
                                    style={{ width: '100%', height: '100%' }}
                                />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Typography>
                                    {product?.title} x{product?.quantity}
                                </Typography>
                                <Typography>Giá {product?.price} VNĐ</Typography>
                            </Box>
                        </Box>
                        <Divider />
                    </Fragment>
                )
            })}
            <Typography textAlign="end">Tổng Cộng: {data?.total_money} VNĐ</Typography>
        </Paper>
    )
}

export default Bill
