import { createTheme } from '@mui/material'

const rootTheme = {
    MuiCssBaseline: {
        styleOverrides: {
            body: {
                a: {
                    textDecoration: 'none',
                },
                ul: {
                    listStyle: 'none',
                    padding: 0,
                },
            },
        },
    },
}

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    components: {
        ...rootTheme,
    },
})

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
    components: {
        ...rootTheme,
    },
})
