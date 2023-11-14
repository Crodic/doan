import { Grid } from '@mui/material'
import CardProduct from '~/components/CardProduct'

const ListProducts = ({ products }) => {
    return (
        <Grid container rowGap={1} columnGap={5}>
            {products.map((item, index) => {
                return (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={2}
                        key={index}
                        m={2}
                        sx={{ display: { xs: 'flex', md: 'block' }, justifyContent: 'center' }}
                    >
                        <CardProduct item={item} widthCard="200px" />
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default ListProducts
