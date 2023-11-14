import styled from '@emotion/styled'
import { Box } from '@mui/material'

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
`

const ButtonAction = styled.div`
    width: 40px;
    height: 40px;
    border: 1px solid;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    cursor: pointer;
    transition: all 0.5s linear;

    &:hover {
        background-color: pink;
    }
`

const Quantity = ({ quantity, setQuantity }) => {
    const handleChangeQuantity = type => {
        if (type === 'up') setQuantity(prev => (prev >= 1000 ? 1000 : prev + 1))
        if (type === 'down') setQuantity(prev => (prev <= 1 ? 1 : prev - 1))
    }

    const handleChangeInput = e => {
        const value = Number(e.target.value)
        if (value > 1000) {
            setQuantity(1000)
        } else {
            setQuantity(value)
        }
    }

    return (
        <BoxStyled sx={{ display: 'flex', gap: 1 }}>
            <ButtonAction onClick={() => handleChangeQuantity('down')}>-</ButtonAction>
            <input
                type="number"
                style={{ width: '80px', textAlign: 'center' }}
                max={1000}
                value={quantity}
                onChange={handleChangeInput}
            />
            <ButtonAction onClick={() => handleChangeQuantity('up')}>+</ButtonAction>
        </BoxStyled>
    )
}

export default Quantity
