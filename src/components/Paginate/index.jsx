import { Pagination } from '@mui/material'

const PaginateProduct = ({ page = 1, totalPage, setPage }) => {
    const handleChangePage = (_, value) => {
        setPage(value)
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }
    return <Pagination count={totalPage} page={page} onChange={handleChangePage} />
}

export default PaginateProduct
