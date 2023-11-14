import { Typography, Paper, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const AboutPage = () => {
    const navigate = useNavigate()
    return (
        <Box>
            <Typography variant="h3" textAlign="center" fontFamily="cursive" mt={5}>
                CAME STORE
            </Typography>
            <Paper elevation={3} style={{ padding: '16px', margin: '16px' }}>
                <Typography variant="body2" fontSize={30}>
                    GIỚI THIỆU
                </Typography>
                <br />
                <Typography variant="subtitle1" fontFamily="cursive">
                    Came Store - Cuộc sống đầy giả dối nhưng lại tươi đẹp
                </Typography>
                <br />
                <Typography variant="body1" fontFamily="cursive">
                    Đó là thông điệp mà chúng tôi muốn truyền tải đến bạn, mỗi ngày của bạn tuy trải qua nhiều chuyện
                    không may, đầy ấp sự giả dối trong cuộc sống nhưng đừng vậy mà nản chí mà hãy luôn rực rỡ, đầy năng
                    lượng và nhiều yêu thương và bỏ qua tất cả mọi chuyện buồn như những bông hoa biết nói.
                </Typography>
                <br />
                <Typography variant="body1" fontFamily="cursive">
                    Tiệm hoa Came Store nằm giữa lòng Sài Gòn nhộn nhịp với những mảng tường xanh mát, nắng đan xen qua
                    giàn dây leo lá rũ, tạo một cảm giác bình yên, nhẹ nhàng và gần gũi . Mời bạn ghé thăm ngôi nhà rất
                    thơ này để cùng ngắm nhìn nhiều loại hoa tươi trong nước đến các loại hoa cao cấp nhập khẩu từ
                    Ecuador, Hà Lan, Nam Phi, Nhật Bản… Đội ngũ STU chúng tôi - các bạn trẻ đầy sáng tạo, đam mê và
                    nhiệt huyết với mong muốn tạo được sự gắn kết cảm xúc và lan toả yêu thương qua những bông hoa tươi
                    thắm. Mỗi một sản phẩm hoa hoàn thiện được trao đến tay khách hàng là tất cả sự tận tâm và trân
                    trọng của chúng tôi .
                </Typography>
                <br />
                <Typography variant="overline">STU - D20 Trân Trọng</Typography>
            </Paper>
            <br />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                    onClick={() => navigate('/')}
                    sx={{ cursor: 'pointer', mx: 4, '&:hover': { color: 'secondary.main' } }}
                >
                    {'<<'} Về Trang Chủ
                </Typography>
                <Typography
                    onClick={() => navigate('/contact')}
                    sx={{ cursor: 'pointer', mx: 4, '&:hover': { color: 'secondary.main' } }}
                >
                    Liên Hệ Với Chúng Tôi {'>>'}
                </Typography>
            </Box>
        </Box>
    )
}

export default AboutPage
