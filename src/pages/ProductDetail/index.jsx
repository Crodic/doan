import { Box, Container, Grid, Paper } from '@mui/material'
import { useParams } from 'react-router-dom'
import Carousel from './Carousel'
import Detail from './Detail'
import { useEffect, useState } from 'react'
import { fetchProductById } from '~/services/api'

const ProductDetail = () => {
    const { id } = useParams()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        fetchDetailProduct()
    }, [id])

    const fetchDetailProduct = async () => {
        try {
            let res = await fetchProductById(id)
            if (res && res.status === 200) {
                setProduct(res.data.product)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container maxWidth="xl" sx={{ my: 6 }}>
            <Paper elevation={2} sx={{ px: 2, py: 4 }}>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ width: '80%', margin: '0 auto' }}>
                            <Carousel data={product?.images} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Detail product={product} />
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default ProductDetail
