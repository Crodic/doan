import AdbIcon from '@mui/icons-material/Adb'
import { MenuAccount, MenuData, MenuOption } from '~/mocks/menu'
import { useDispatch, useSelector } from 'react-redux'
import { stateAuth } from '~/redux/selector'
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'
import { fetchLogoutUser } from '~/redux/features/userSlice'
import { toast } from 'react-toastify'

const MenuDrawer = ({ openMenu, handleCloseMenu }) => {
    const { auth } = useSelector(stateAuth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClickMenu = path => {
        if (path === '/logout') {
            dispatch(fetchLogoutUser())
                .unwrap()
                .then(() => {
                    toast('Đăng Xuất Thành Công')
                    navigate('/login')
                })
                .catch(err => {
                    toast.error(err.msg)
                })
        }
        if (path !== 'logout') {
            navigate(path)
            handleCloseMenu()
        }
    }

    const renderMenu = menu => {
        const JSXMenu = menu.map(item => {
            return (
                <ListItem key={item.id} disablePadding>
                    <ListItemButton onClick={() => handleClickMenu(item.path)}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText>{item.title}</ListItemText>
                    </ListItemButton>
                </ListItem>
            )
        })
        return JSXMenu
    }

    return (
        <Drawer open={openMenu} anchor="left" onClose={handleCloseMenu} onKeyDown={handleCloseMenu}>
            <Box sx={{ width: 250 }}>
                <List>
                    <ListItem>
                        <AdbIcon sx={{ mr: 1 }} />
                        <ListItemText>
                            <Typography variant="h6">CAME STORE</Typography>
                        </ListItemText>
                    </ListItem>
                    <Divider />
                    {renderMenu(MenuData)}
                    <Divider />
                    {auth ? renderMenu(MenuOption) : renderMenu(MenuAccount)}
                </List>
            </Box>
        </Drawer>
    )
}

export default MenuDrawer
