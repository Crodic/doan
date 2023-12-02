import Routes from './routes'
import { Box, Container } from '@mui/material'
import Navbar from './components/Navbar'
import BackToTop from './components/BackToTop'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'
import { stateApp } from './redux/selector'
import styled from '@emotion/styled'

const MaxView = styled.div`
    max-width: 1400px;
    margin: 0 auto;
`

function App() {
    const { mode } = useSelector(stateApp)

    return (
        <Container component="main" maxWidth="xl" disableGutters id="container">
            <MaxView>
                <Navbar />
                <Box minHeight="100vh">
                    <Routes />
                </Box>
                <Footer />
            </MaxView>
            <BackToTop />
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={mode}
            />
        </Container>
    )
}

export default App
