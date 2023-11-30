import { Container, Divider, Grid, Stack, Typography } from '@mui/material'
import ListProducts from './components/Lists'
import SelectCategory from './components/SelectCategory'
import PaginateProduct from '~/components/Paginate'
import { useSearchParams } from 'react-router-dom'
import SelectOrderBy from './components/SelectOrderBy'
import { useEffect, useState } from 'react'
import { fetchProduct, fetchSearchProduct } from '~/services/api'

const ProductsPage = () => {
    const [searchParams] = useSearchParams()
    const search = searchParams.get('search')
    const value = searchParams.get('value')
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState(searchParams.get('category') || null)
    const [price, setPrice] = useState(searchParams.get('sort') || null)
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)

    useEffect(() => {
        if (!search && !value) {
            let filter = { page: page }
            if (category) filter = { ...filter, category: category }
            if (price) filter = { ...filter, sort: price }
            fetchAllProduct(filter)
        }
    }, [page, price, category, search, value])

    useEffect(() => {
        if (search && value) {
            fetchSearch()
        }
    }, [search, value])

    const fetchSearch = async () => {
        try {
            let res = await fetchSearchProduct(value)
            if (res && res.status === 200) {
                setProducts(res.data.products)
                setPage(res.data.page)
                setTotalPage(res.data.totalPage)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const fetchAllProduct = async filter => {
        try {
            let res = await fetchProduct(filter)
            if (res && res.status === 200) {
                setProducts(res.data.products)
                setPage(res.data.page)
                setTotalPage(res.data.totalPage)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleClear = () => {
        setCategory(null)
        setPrice(null)
    }

    return (
        <Container maxWidth="xl" sx={{ my: 4 }}>
            <Grid container columnGap={10}>
                <Grid item xs={0} md={2}>
                    <Stack spacing={3}>
                        <Typography variant="subtitle1">Lọc Sản Phẩm:</Typography>
                        <SelectCategory setCategory={setCategory} category={category} />
                        <SelectOrderBy setPrice={setPrice} price={price || -1} />
                        <Typography
                            variant="caption"
                            sx={{ cursor: 'pointer', '&:hover': { color: 'pink' } }}
                            onClick={handleClear}
                        >
                            Xoá Lựa Chọn
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Grid container>
                        <Grid item xs={12}>
                            {search && <Typography>Đã Tìm Thấy 1000 Sản Phẩm</Typography>}
                            <Divider variant="middle">
                                <Typography variant="h5" color="blueviolet">
                                    Danh Sách Các Loại Hoa
                                </Typography>
                            </Divider>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <ListProducts products={products} />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <PaginateProduct page={page} totalPage={totalPage} setPage={setPage} />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ProductsPage
