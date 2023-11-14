import { Box, Paper } from '@mui/material'
import RegisterForm from './Components/FormRegister'
import { useSelector } from 'react-redux'
import { stateAuth } from '~/redux/selector'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const RegisterPage = () => {
    const { auth } = useSelector(stateAuth)
    const navigate = useNavigate()

    useEffect(() => {
        if (auth) {
            navigate('/')
        }
    }, [auth, navigate])
    return (
        <Paper elevation={4} sx={{ width: { xs: '90%', lg: '500px' }, margin: '50px auto', px: { xs: 1, lg: 0 } }}>
            <RegisterForm />
        </Paper>
    )
}

export default RegisterPage
