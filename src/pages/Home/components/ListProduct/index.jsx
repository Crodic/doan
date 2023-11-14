import { Box } from '@mui/material'
import CardProduct from '../../../../components/CardProduct'

const ListProduct = ({ data }) => {
    return (
        <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap' }}>
            {data?.map(item => {
                return <CardProduct item={item} key={item.pid} />
            })}
        </Box>
    )
}

export default ListProduct
