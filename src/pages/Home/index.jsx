import Box from '@mui/material/Box'
import Banner from './components/Banner'
import { Container, Divider, Grid, Typography } from '@mui/material'
import ListProduct from './components/ListProduct'
import { TopProductData } from '~/mocks/products'
import Logo from '~/assets/images/logo.png'
import FormFeedBack from './components/FormFeedback'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { fetchProduct } from '~/services/api'

const GridContent = () => {
    return (
        <Grid container sx={{ mb: 3 }}>
            <Grid
                item
                xs={0}
                md={4}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    mb: { xs: 2, md: 0 },
                }}
            >
                <Box sx={{ width: { xs: '100%', md: '80%' } }}>
                    <img src={Logo} alt="logo store" width="100%" height="100%" />
                </Box>
                <Typography variant="caption" textAlign="center">
                    Mọi ý kiến đóng góp của bạn giúp chúng tôi ngày càng phát triển hơn trong tương lại. Nếu bạn cảm
                    thấy hoa của chúng tôi chất lượng hãy giúp chúng tôi chia sẽ những thông tin này đến bạn bè, người
                    thân. CAME STORE trân trọng cảm ơn
                </Typography>
            </Grid>
            <Grid
                item
                xs={12}
                md={8}
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                    <Typography variant="h5" textAlign="center" my={2} fontFamily="cursive">
                        Đóng Góp Ý Kiến
                    </Typography>
                    <FormFeedBack />
                </Box>
            </Grid>
        </Grid>
    )
}

const HomePage = () => {
    const navigate = useNavigate()
    const [topProduct, setTopProduct] = useState([])
    const [newProduct, setNewProduct] = useState([])
    const [holidayProduct, setHolidayProduct] = useState([])

    useEffect(() => {
        fetchTopProduct()
    }, [])

    const fetchTopProduct = async () => {
        try {
            let res = await fetchProduct({ limit: 8, page: 1, sort: 'ASC' })
            if (res && res.status === 200) {
                setTopProduct(res.data.products)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchNewProduct()
    }, [])

    const fetchNewProduct = async () => {
        try {
            let res = await fetchProduct({ limit: 8, page: 1, test: 1 })
            if (res && res.status === 200) {
                setNewProduct(res.data.products)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchHolidayProduct()
    }, [])

    const fetchHolidayProduct = async () => {
        try {
            let res = await fetchProduct({ limit: 8, page: 1, category: 1 })
            if (res && res.status === 200) {
                setHolidayProduct(res.data.products)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Container maxWidth="xl">
                <Box component="section" sx={{ mt: 5 }}>
                    <Banner />
                </Box>

                <Container maxWidth="xl">
                    <Box sx={{ mt: 5 }}>
                        <Divider variant="middle">
                            <Typography
                                variant="h5"
                                fontFamily="cursive"
                                onClick={() => navigate('/product?page=1&limit=8')}
                                sx={{ cursor: 'pointer' }}
                            >
                                Sản Phẩm Nổi Bật
                            </Typography>
                        </Divider>
                        <Box sx={{ mt: 5 }} />
                        <ListProduct data={topProduct} />
                    </Box>
                    <Box sx={{ mt: 5 }}>
                        <Divider variant="middle">
                            <Typography
                                variant="h5"
                                fontFamily="cursive"
                                onClick={() => navigate('/product?page=1&limit=8')}
                                sx={{ cursor: 'pointer' }}
                            >
                                Sản Phẩm Mới
                            </Typography>
                        </Divider>
                        <Box sx={{ mt: 5 }} />
                        <ListProduct data={newProduct} />
                    </Box>
                    <Box sx={{ mt: 5 }}>
                        <Divider variant="middle">
                            <Typography
                                variant="h5"
                                fontFamily="cursive"
                                onClick={() => navigate('/product?page=1&limit=8&category=2')}
                                sx={{ cursor: 'pointer' }}
                            >
                                Hoa Lễ Tết
                            </Typography>
                        </Divider>
                        <Box sx={{ mt: 5 }} />
                        <ListProduct data={holidayProduct} />
                    </Box>
                </Container>
            </Container>
            <Box sx={{ mt: 6 }} />
            <Box sx={{ width: '100%', py: 1, textAlign: 'center', backgroundor: 'primary.main' }}>
                <Typography variant="h5" fontFamily="cursive">
                    FeedBack
                </Typography>
            </Box>
            <Container maxWidth="xl">
                <Box mt={2} />
                <GridContent />
            </Container>
        </>
    )
}

export default HomePage
