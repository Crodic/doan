import { Chat, Map, Phone } from '@mui/icons-material'
import { Box, Container, IconButton, Paper, Typography } from '@mui/material'
import Logo from '~/assets/images/logo.png'

const ContactPage = () => {
    return (
        <Box mb={4}>
            <Typography variant="h4" textAlign="center" my={5}>
                Liên Hệ Với Chúng Tôi
            </Typography>
            <Container>
                <Paper elevation={3}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.945997985353!2d106.6778165733999!3d10.738645559892841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fac4c2ec679%3A0x1b72da582829a169!2zMTgwIMSQLiBDYW8gTOG7lywgUGjGsOG7nW5nIDQsIFF14bqtbiA4LCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1699341316949!5m2!1svi!2s"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </Paper>
                <br />
                <Box sx={{ display: 'flex' }}>
                    <Box
                        sx={{
                            width: { xs: '100%', md: '40%' },
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <Box>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                <IconButton
                                    LinkComponent="a"
                                    href="https://maps.app.goo.gl/mCGT8n417Q6cFvdS8"
                                    target="_blank"
                                >
                                    <Map />
                                </IconButton>
                                <Typography>Địa Chỉ: 180 Cao Lỗ, Phường 4, Quận 8, TP.HCM</Typography>
                            </Box>
                            <br />
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                <IconButton LinkComponent="a" href="tel:0387737544" target="_blank">
                                    <Phone />
                                </IconButton>
                                <Typography>Hotline: 0387737544 - Gặp Chủ SHOP</Typography>
                            </Box>
                            <br />
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                <IconButton>
                                    <Chat />
                                </IconButton>
                                <Typography>
                                    Giá hoa chưa gồm thuế. Sản phẩm thực tế có thể sẽ khác đôi chút so với hình ảnh mẫu
                                    do đặc tính bó hoa thủ công và sử dụng các loại hoa theo mùa.
                                </Typography>
                            </Box>
                            <br />
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                <IconButton>
                                    <Chat />
                                </IconButton>
                                <Typography>
                                    Bạn cũng có thể đặt yêu cầu trang trí chậu hoa cho shop. Shop sẽ hổ trợ đầy đủ các
                                    kiểu trang trí nếu nó khả thi.
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={Logo} alt="logo store" width="300px" height="300px" />
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default ContactPage
