import { Box, Divider, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Bill = () => {
    const navigate = useNavigate()

    const handleClickDetail = () => {
        navigate(`/order-detail/${1}`)
    }

    return (
        <Paper sx={{ p: 2 }} elevation={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Chờ Xác Nhận</Typography>
                <Typography onClick={handleClickDetail} sx={{ cursor: 'pointer' }}>
                    Xem Chi Tiết
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, my: 2 }}>
                <Typography>1</Typography>
                <Box sx={{ width: '200px' }}>
                    <img
                        src="https://images.unsplash.com/photo-1682685797527-63b4e495938f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        style={{ width: '100%', height: '100%' }}
                    />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography>Hoa Tulip Trắng x1</Typography>
                    <Typography>Giá 450000 VNĐ</Typography>
                </Box>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, my: 2 }}>
                <Typography>2</Typography>
                <Box sx={{ width: '200px' }}>
                    <img
                        src="https://images.unsplash.com/photo-1682685797527-63b4e495938f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        style={{ width: '100%', height: '100%' }}
                    />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography>Hoa Tulip Trắng x1</Typography>
                    <Typography>Giá 450000 VNĐ</Typography>
                </Box>
            </Box>
            <Typography textAlign="end">Tổng Cộng: 450000 VNĐ</Typography>
        </Paper>
    )
}

export default Bill
