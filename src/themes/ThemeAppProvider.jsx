import { useSelector } from 'react-redux'
import { darkTheme, lightTheme } from './theme'
import { stateApp } from '~/redux/selector'
import { ThemeProvider, CssBaseline } from '@mui/material'

const ThemeAppProvider = ({ children }) => {
    const { mode } = useSelector(stateApp)
    return (
        <ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}

export default ThemeAppProvider
