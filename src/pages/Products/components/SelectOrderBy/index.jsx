import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useState } from 'react'

const SelectOrderBy = ({ setPrice, price }) => {
    const handleChange = e => {
        setPrice(e.target.value)
    }
    return (
        <FormControl fullWidth>
            <InputLabel id="order-by-price">Xếp Theo Giá:</InputLabel>
            <Select
                size="small"
                labelId="order-by-price"
                id="price-by"
                value={price}
                label="Xếp Theo Giá ...."
                onChange={handleChange}
            >
                <MenuItem value={-1}>Mặc Định</MenuItem>
                <MenuItem value={'DESC'}>Giảm Dần</MenuItem>
                <MenuItem value={'ASC'}>Tăng Dần</MenuItem>
            </Select>
        </FormControl>
    )
}

export default SelectOrderBy
