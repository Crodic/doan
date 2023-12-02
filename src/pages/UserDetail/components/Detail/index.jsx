/* eslint-disable react/prop-types */
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { Avatar, Button, Divider, Typography } from '@mui/material'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import InformationData from '../InformationData'
import FormModal from '../FormModal'
import { useState } from 'react'
import PasswordModal from '../PasswordModal'

const UserInformation = ({ user }) => {
    const [open, setOpen] = useState(false)
    const [openPassword, setOpenPassword] = useState(false)
    console.log(user)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleClickOpenPassword = () => {
        setOpenPassword(true)
    }

    const handleClosePassword = () => {
        setOpenPassword(false)
    }

    return (
        <>
            <Paper
                elevation={3}
                sx={{
                    minHeight: '500px',
                    margin: '20px auto',
                    borderRadius: '20px',
                }}
            >
                <Grid container>
                    <Grid
                        item
                        md={5}
                        sm={12}
                        sx={{
                            width: '100%',
                            height: '500px',
                            background: 'linear-gradient(to right bottom, #430089, #82ffa1)',
                            borderRadius: { md: '20px 0px 0px 20px', xs: '20px 20px 0px 0px' },
                        }}
                    >
                        <Box
                            component="div"
                            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}
                        >
                            <Avatar sx={{ width: '150px', height: '150px', fontSize: 50 }}>{user?.fullname[0]}</Avatar>
                        </Box>
                        <Box sx={{ textAlign: 'center', marginBottom: '10px' }}>
                            <Typography variant="h5" fontFamily="cursive">
                                {user?.role}
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="h4">{user?.fullname}</Typography>
                        </Box>
                        <Box
                            sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                            onClick={handleClickOpen}
                        >
                            <Box
                                sx={{
                                    backgroundColor: '#bebebe',
                                    textAlign: 'center',
                                    marginTop: '20px',
                                    cursor: 'pointer',
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: '50%',
                                    '&:hover': {
                                        backgroundColor: '#bebebe80',
                                    },
                                }}
                            >
                                <BorderColorIcon fontSize="small" />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item md={7} sm={12} sx={{ width: '100%' }}>
                        <Box sx={{ marginLeft: '20px' }}>
                            <Typography variant="h6" textAlign="center" sx={{ margin: '10px 0px' }}>
                                Thông Tin Tài Khoản
                            </Typography>
                            <Divider variant="middle" />
                            <Grid container sx={{ margin: '30px 0px 30px 20px' }}>
                                <Grid item md={6} xs={12} sx={{ marginY: { md: '0px', xs: '10px' } }}>
                                    <InformationData title="Email" value={user?.email} />
                                </Grid>
                                <Grid item md={6} xs={12} sx={{ marginY: { md: '0px', xs: '10px' } }}>
                                    <InformationData title="Địa Chỉ" value={user?.address ? user.address : 'Trống'} />
                                </Grid>
                            </Grid>
                            <Divider variant="middle" />
                            <Grid container sx={{ margin: '30px 0px 30px 20px' }}>
                                <Grid item md={6} xs={12} sx={{ marginY: { md: '0px', xs: '10px' } }}>
                                    <InformationData title="Điện Thoại" value={user?.phone ? user.phone : 'Trống'} />
                                </Grid>
                                <Grid item md={6} xs={12} sx={{ marginY: { md: '0px', xs: '10px' } }}>
                                    <InformationData
                                        title="Trạng Thái"
                                        value={user?.status == 0 ? 'An Toàn' : 'Bị Khoá'}
                                    />
                                </Grid>
                            </Grid>
                            <Divider variant="middle" />
                            <Grid container sx={{ margin: '30px 0px 30px 20px' }}>
                                <Grid item md={12}>
                                    <InformationData title="Tổng Số Hoá Đơn" value={user?.total} />
                                </Grid>
                            </Grid>
                            <Divider variant="middle" />
                            <Grid container sx={{ margin: '30px 0px 30px 20px' }}>
                                <Grid item md={12}>
                                    <Button variant="contained" color="success" onClick={handleClickOpenPassword}>
                                        Đổi Mật Khẩu
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
            <FormModal close={handleClose} open={open} userEdit={user} />
            <PasswordModal close={handleClosePassword} open={openPassword} />
        </>
    )
}

export default UserInformation
