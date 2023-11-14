import { Box, Stack } from '@mui/material'
import Bill from '../Bill'

const ListBill = () => {
    return (
        <Stack spacing={5}>
            <Bill></Bill>
            <Bill></Bill>
            <Bill></Bill>
            <Bill></Bill>
            <Bill></Bill>
        </Stack>
    )
}

export default ListBill
