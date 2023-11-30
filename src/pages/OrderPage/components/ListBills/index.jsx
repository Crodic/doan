import { Box, Stack } from '@mui/material'
import Bill from '../Bill'
import { useEffect, useState } from 'react'
import { fetchAllOrderByUser } from '~/services/api'
import { useSelector } from 'react-redux'
import { stateAuth } from '~/redux/selector'

const ListBill = () => {
    const [listBill, setListBill] = useState([])
    const { accessToken } = useSelector(stateAuth)

    useEffect(() => {
        fetchBillByUser()
    }, [])

    const fetchBillByUser = async () => {
        try {
            const res = await fetchAllOrderByUser(accessToken)
            if (res && res.status == 200) {
                setListBill(res.data.order)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Stack spacing={5}>
            {listBill?.map((item, index) => {
                return <Bill key={index} data={item} />
            })}
        </Stack>
    )
}

export default ListBill
