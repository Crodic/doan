import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { fetchCategory } from '~/services/api'

export default function SelectCategory({ setCategory, category }) {
    const [listCategory, setListCategory] = React.useState([])

    const handleChange = event => {
        setCategory(event.target.value)
    }

    React.useEffect(() => {
        fetchAllCategory()
    }, [])

    const fetchAllCategory = async () => {
        try {
            let res = await fetchCategory()
            if (res && res.status === 200) {
                setListCategory(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="category-filter">Category</InputLabel>
                <Select
                    size="small"
                    labelId="category-filter"
                    id="filter-came-store"
                    value={category || 0}
                    label="Category"
                    onChange={handleChange}
                >
                    <MenuItem value={0}>Tất Cả Danh Mục</MenuItem>
                    {listCategory.map(item => {
                        return (
                            <MenuItem value={item.cid} key={item.cid}>
                                {item.name}
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        </Box>
    )
}
