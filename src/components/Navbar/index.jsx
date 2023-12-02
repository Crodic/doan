import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import Badge from '@mui/material/Badge'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SearchIcon from '@mui/icons-material/Search'
import AdbIcon from '@mui/icons-material/Adb'
import AccountCircle from '@mui/icons-material/AccountCircle'
import { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person'
import { Button, Divider, ListItemIcon, Tooltip } from '@mui/material'
import DarkMode from '../DarkMode'
import { Logout, Settings } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import CartDrawer from './CartDrawer'
import { useDispatch, useSelector } from 'react-redux'
import { stateAuth, stateCart } from '~/redux/selector'
import MenuDrawer from './MenuDrawer'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'
import { fetchLogoutUser } from '~/redux/features/userSlice'
import { toast } from 'react-toastify'
import AlertDialog from '../Alert'
import { fetchSearchProduct } from '~/services/api'
import { resetCart } from '~/redux/features/cartSlice'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '30ch',
        },
    },
}))

export default function Navbar() {
    const [openAlert, setOpenAlert] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [openCart, setOpenCart] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    const [search, setSearch] = useState('')
    const { auth, uid } = useSelector(stateAuth)
    const { quantity } = useSelector(stateCart)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleCloseCart = () => {
        setOpenCart(false)
    }

    const handleCloseMenu = () => {
        setOpenMenu(false)
    }

    const isMenuOpen = Boolean(anchorEl)

    const handleProfileMenuOpen = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const menuId = 'primary-search-account-menu'

    const handleLogout = () => {
        dispatch(fetchLogoutUser())
            .unwrap()
            .then(() => {
                handleCloseMenu(false)
                toast('Đăng Xuất Thành Công')
                dispatch(resetCart())
            })
            .catch(err => {
                handleCloseMenu(false)
                toast.error(err.msg)
            })
    }

    const handleNavigateDetail = () => {
        navigate(`/user/${uid}`)
        handleCloseMenu()
    }

    const handleNavigateBill = () => {
        navigate(`/order/${1}`)
        handleCloseMenu()
    }

    const handleSearchProduct = async () => {
        try {
            const res = await fetchSearchProduct(search)
            if (res) {
                navigate(`/product?search=true&value=${search}`)
                setSearch('')
            }
        } catch (error) {
            console.log(error)
        }
    }
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            id={menuId}
            open={isMenuOpen}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    overflowY: 'scroll',
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={handleNavigateDetail}>
                <ListItemIcon>
                    <PersonIcon fontSize="small" />
                </ListItemIcon>
                Account
            </MenuItem>
            <MenuItem onClick={handleNavigateBill}>
                <ListItemIcon>
                    <ReceiptLongIcon fontSize="small" />
                </ListItemIcon>
                Bills
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => setOpenAlert(true)}>
                <ListItemIcon>
                    <Logout fontSize="small" color="error" />
                </ListItemIcon>
                <Box component="span" sx={{ color: 'red' }}>
                    Logout
                </Box>
            </MenuItem>
        </Menu>
    )

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={() => setOpenMenu(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <AdbIcon
                        sx={{ display: { xs: 'none', md: 'block' }, mr: 1, cursor: 'pointer' }}
                        onClick={() => navigate('/')}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', md: 'block' }, cursor: 'pointer' }}
                        onClick={() => navigate('/')}
                    >
                        CAME
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Tìm Kiếm Hoa"
                            inputProps={{ 'aria-label': 'search' }}
                            autoComplete="off"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            onKeyDown={e => e.key == 'Enter' && handleSearchProduct()}
                        />
                    </Search>
                    <Box sx={{ display: 'flex' }}>
                        <Tooltip title="Giỏ Hàng">
                            <IconButton
                                size="large"
                                aria-label="show 4 new mails"
                                color="inherit"
                                onClick={() => setOpenCart(true)}
                            >
                                <Badge badgeContent={quantity || 0} color="error">
                                    <ShoppingCartIcon />
                                </Badge>
                            </IconButton>
                        </Tooltip>
                        <DarkMode />
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {!auth ? (
                                <Button
                                    variant="contained"
                                    size="medium"
                                    color="success"
                                    sx={{ ml: 2, display: { xs: 'none', md: 'flex' } }}
                                    onClick={() => navigate('/login')}
                                >
                                    Đăng Nhập
                                </Button>
                            ) : (
                                <Tooltip title="Thông Tin">
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleProfileMenuOpen}
                                        color="inherit"
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMenu}
            <CartDrawer openCart={openCart} handleCloseCart={handleCloseCart} />
            <MenuDrawer openMenu={openMenu} handleCloseMenu={handleCloseMenu} />
            <AlertDialog
                open={openAlert}
                setOpen={setOpenAlert}
                callback={handleLogout}
                content="Bạn Có Chắc Muốn Thoát ?"
            />
        </Box>
    )
}
