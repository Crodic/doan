import styled from '@emotion/styled'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { deleteProduct, updateQuantity } from '~/redux/features/cartSlice'
import { stateCart } from '~/redux/selector'

const ButtonStyled = styled.button`
    background-color: #bebebe;
    border: none;
    outline: none;
    cursor: pointer;
    width: 20px;
    height: 20px;
    border-radius: 50%;
`

const InputStyled = styled.input`
    width: 50px;
    text-align: center;
`

const BoxStyled = styled(Box)`
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        display: none;
        -webkit-appearance: none;
        margin: 0;
    }

    input[type='number'] {
        -moz-appearance: textfield; /* Firefox */
    }
    input[type='number']:hover,
    input[type='number']:focus {
        -moz-appearance: number-input;
    }

    input {
        outline: none;
    }
    display: flex;
    gap: 5px;
`

const CartItem = ({ product }) => {
    const dispatch = useDispatch()
    const cloudinaryRegex = /cloudinary/i

    const handleChangeQuantity = e => {
        const payload = {
            pid: product?.pid,
            quantity: e.target.value,
        }
        dispatch(updateQuantity(payload))
    }

    const handleIncrement = () => {
        const quantity = product.quantity + 1 > 1000 ? 1000 : product.quantity + 1
        const payload = {
            pid: product?.pid,
            quantity: quantity,
        }
        dispatch(updateQuantity(payload))
    }

    const handleDecrement = () => {
        const quantity = product.quantity - 1 <= 1 ? 1 : product.quantity - 1
        const payload = {
            pid: product?.pid,
            quantity: quantity,
        }
        dispatch(updateQuantity(payload))
    }

    const handleDelete = () => {
        dispatch(deleteProduct(product?.pid))
    }

    return (
        <Box
            component="li"
            sx={{
                p: 2,
                display: 'flex',
                gap: 2,
                '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.2)', cursor: 'pointer' },
            }}
        >
            <Box sx={{ width: '40%', height: 'auto' }}>
                <img
                    src={
                        product?.images[0] && cloudinaryRegex.test(product?.images[0])
                            ? product?.images[0]
                            : `http://localhost/mvc${product?.images[0]}`
                    }
                    alt=""
                    style={{ width: '100%', height: '100%' }}
                />
            </Box>
            <Stack spacing={1} flex={1}>
                <Typography variant="body1" component="p" noWrap>
                    {product?.title}
                </Typography>
                <Typography variant="caption" component="p">
                    Giá: {Math.round(product?.price - product?.price / product?.discount)} VNĐ
                </Typography>
                <BoxStyled>
                    <ButtonStyled onClick={handleDecrement}>-</ButtonStyled>
                    <InputStyled type="number" value={product?.quantity} onChange={handleChangeQuantity} />
                    <ButtonStyled onClick={handleIncrement}>+</ButtonStyled>
                </BoxStyled>
                <Button variant="outlined" size="small" color="error" onClick={handleDelete}>
                    Xoá
                </Button>
            </Stack>
        </Box>
    )
}

export default CartItem
