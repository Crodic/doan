import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Box, Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { formatCurrency } from '~/utilities/helper'
import { useDispatch } from 'react-redux'
import { deleteProduct } from '~/redux/features/cartSlice'

export default function ShowItem({ cart }) {
    const [cartHandle, setCartHandle] = useState(cart || null)
    const cloudinaryRegex = /cloudinary/i
    const dispatch = useDispatch()

    const handleCartItem = () => {
        let newCart = cart?.map((item, index) => ({
            stt: index + 1,
            name: item.title,
            image: item.images[0],
            price: item.price,
            quantity: item.quantity,
        }))
        setCartHandle(newCart)
    }

    console.log(cartHandle)

    useEffect(() => {
        handleCartItem()
    }, [cart])
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 450 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell align="right">Mô Tả</TableCell>
                        <TableCell align="right">Tên Sản Phẩm</TableCell>
                        <TableCell align="right">Giá Sản Phẩm</TableCell>
                        <TableCell align="right">Số Lượng</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cartHandle.map((row, index) => (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">
                                {row.stt}
                            </TableCell>
                            <TableCell align="right" sx={{ width: 150 }}>
                                <img
                                    src={
                                        row.image && cloudinaryRegex.test(row.image)
                                            ? row.image
                                            : `http://localhost/mvc${row.image}`
                                    }
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{formatCurrency(row.price)}</TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
