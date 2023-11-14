import { IconButton, Tooltip } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { changeMode } from '~/redux/features/appSlice'
import { stateApp } from '~/redux/selector'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

const DarkMode = () => {
    const dispatch = useDispatch()
    const { mode } = useSelector(stateApp)

    const handleChange = mode => {
        dispatch(changeMode(mode))
    }
    return (
        <Tooltip title="Chế Độ">
            <IconButton
                size="large"
                aria-label="mode theme"
                color="inherit"
                onClick={() => handleChange(mode === 'light' ? 'dark' : 'light')}
            >
                {mode === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
        </Tooltip>
    )
}

export default DarkMode
