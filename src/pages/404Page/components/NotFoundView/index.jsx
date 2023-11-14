import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import RouterLink from '~/components/RouterLink'
import Logo404 from '~/assets/images/illustration_404.svg'

export default function NotFoundView() {
    return (
        <>
            <Container>
                <Box
                    sx={{
                        py: 12,
                        maxWidth: 480,
                        mx: 'auto',
                        display: 'flex',
                        minHeight: '100vh',
                        textAlign: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="h3" sx={{ mb: 3 }}>
                        Trang không tồn tại
                    </Typography>

                    <Typography sx={{ color: 'text.secondary' }}>
                        Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm. Có thể nó đã bị xoá hoặc được
                        chuyến đến 1 URL khác ?. Bạn hãy chắc chắn rằng mình đã nhập đúng URL
                    </Typography>

                    <Box
                        component="img"
                        src={Logo404}
                        sx={{
                            mx: 'auto',
                            height: 260,
                            my: { xs: 5, sm: 10 },
                        }}
                    />

                    <Button href="/" size="large" variant="contained" component={RouterLink}>
                        Go to Home
                    </Button>
                </Box>
            </Container>
        </>
    )
}
