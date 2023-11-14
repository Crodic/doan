import { Box, Container, Typography } from '@mui/material'
import ListBill from './components/ListBills'

const OrderPage = () => {
    return (
        <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 5 }}>
            <Box sx={{ width: '20%' }}></Box>
            <Box sx={{ width: '60%' }}>
                <Typography variant="h3" textAlign="center" mb={3}>
                    Danh Sách Hoá Đơn
                </Typography>
                <ListBill />
            </Box>
            <Box sx={{ width: '20%' }}></Box>
        </Container>
    )
}

export default OrderPage
