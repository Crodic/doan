import { Call, Home, Info, Login, Logout } from '@mui/icons-material'
import LocalFloristIcon from '@mui/icons-material/LocalFlorist'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import { uniqueId } from 'lodash'

export const MenuData = [
    {
        id: uniqueId('came'),
        title: 'Trang Chủ',
        path: '/',
        icon: <Home />,
    },
    {
        id: uniqueId('came'),
        title: 'Sản Phẩm',
        path: '/product',
        icon: <LocalFloristIcon />,
    },
    {
        id: uniqueId('came'),
        title: 'Giới Thiệu',
        path: '/about',
        icon: <Info />,
    },
    {
        id: uniqueId('came'),
        title: 'Liên Hệ',
        path: '/contact',
        icon: <Call />,
    },
]

export const MenuOption = [
    {
        id: uniqueId('came'),
        title: 'Đăng Xuất',
        path: '/logout',
        icon: <Logout />,
    },
]

export const MenuAccount = [
    {
        id: uniqueId('came'),
        title: 'Đăng Nhập',
        path: '/login',
        icon: <Login />,
    },
    {
        id: uniqueId('came'),
        title: 'Đăng Ký',
        path: '/register',
        icon: <HowToRegIcon />,
    },
]
