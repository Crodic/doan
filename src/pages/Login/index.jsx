import LoginForm from './Components/LoginForm'
import { useSelector } from 'react-redux'
import { stateAuth } from '~/redux/selector'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Paper } from '@mui/material'

const LoginPage = () => {
    const { auth } = useSelector(stateAuth)
    const navigate = useNavigate()

    useEffect(() => {
        if (auth) {
            navigate('/')
        }
    }, [auth, navigate])

    return (
        <Paper elevation={4} sx={{ width: { xs: '90%', lg: '450px' }, margin: '50px auto', px: { xs: 1, lg: 0 } }}>
            <LoginForm />
        </Paper>
    )
}

export default LoginPage
