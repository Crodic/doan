import { Container } from '@mui/material'
import UserInformation from './components/Detail'
import { useSelector } from 'react-redux'
import { stateAuth } from '~/redux/selector'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchUser } from '~/services/api'
import { toast } from 'react-toastify'

const UserDetailPage = () => {
    const { auth, accessToken, uid } = useSelector(stateAuth)
    const { uid: userParams } = useParams()
    const [user, setUser] = useState(null)

    const navigate = useNavigate()
    useEffect(() => {
        if (!auth) {
            navigate('/login')
        }
    }, [auth, navigate])

    useEffect(() => {
        if (uid !== userParams) {
            navigate('/')
            toast.warning('Định Danh Người Dùng Không Chính Xác')
        }
    }, [])

    useEffect(() => {
        fetchDataUser(accessToken)
    }, [accessToken])

    const fetchDataUser = async token => {
        try {
            const res = await fetchUser(token)
            if (res && res.status === 200) {
                const data = {
                    fullname: res.data.user.fullname,
                    email: res.data.user.email,
                    role: res.data.user.role == 'user' ? 'Người Dùng' : 'Quản Trị Viên',
                    address: res.data.user.address,
                    phone: res.data.user.phone,
                    status: res.data.user.isDeleted,
                    total: res.data.user.total,
                }
                setUser(data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Container maxWidth="md" sx={{ mt: 7 }}>
                <UserInformation user={user} setUser={setUser} />
            </Container>
        </>
    )
}

export default UserDetailPage
