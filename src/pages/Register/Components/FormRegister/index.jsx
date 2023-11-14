import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Link, useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { fetchRegister } from '~/services/api'
import { toast } from 'react-toastify'

export default function RegisterForm() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            're-password': '',
        },
        validationSchema: Yup.object({
            firstname: Yup.string().required('Vui Lòng Nhập Họ'),
            lastname: Yup.string().required('Vui Lòng Nhập Tên'),
            email: Yup.string().email('Email Không Đúng Định Dạng').required('Vui Lòng Nhập Email'),
            password: Yup.string()
                .min(8, 'Mật Khẩu Quá Ngắn')
                .matches(/[0-9]/, 'Mật khẩu cần có ít nhất 1 số')
                .matches(/[a-z]/, 'Mật khẩu cần có ít nhất 1 chữ thường')
                .matches(/[A-Z]/, 'Mật khẩu cần có ít nhất 1 chữ hoa')
                .matches(/[^\w]/, 'Mật khẩu cần có ít nhất 1 ký tự đặc biệt')
                .required('Vui Lòng Nhập Mật Khẩu'),
            're-password': Yup.string()
                .oneOf([Yup.ref('password')], 'Mật Khẩu Không Trùng Khớp')
                .required('Vui Lòng Xác Nhận Mật Khẩu'),
        }),
        onSubmit: async e => {
            try {
                setLoading(true)
                const res = await fetchRegister(e)
                if (res && res.status === 201) {
                    setLoading(false)
                    toast.success('Đăng Ký Tài Khoản Thành Công')
                    navigate('/login')
                }
            } catch (err) {
                toast.error(err.response.data.msg)
                setLoading(false)
            }
        },
    })

    return (
        <Container component="div" maxWidth="xs">
            <Box
                sx={{
                    py: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Đăng Ký
                </Typography>
                <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstname"
                                required
                                fullWidth
                                id="firstname"
                                label="First Name"
                                disabled={loading}
                                error={formik.errors.firstname && formik.touched.firstname}
                                value={formik.values.firstname}
                                onChange={formik.handleChange}
                                helperText={
                                    formik.errors.firstname && formik.touched.firstname ? formik.errors.firstname : null
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastname"
                                label="Last Name"
                                name="lastname"
                                error={formik.errors.lastname && formik.touched.lastname}
                                value={formik.values.lastname}
                                onChange={formik.handleChange}
                                autoComplete="family-name"
                                disabled={loading}
                                helperText={
                                    formik.errors.lastname && formik.touched.lastname ? formik.errors.lastname : null
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                error={formik.errors.email && formik.touched.email}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                autoComplete="email"
                                disabled={loading}
                                helperText={formik.errors.email && formik.touched.email ? formik.errors.email : null}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                error={formik.errors.password && formik.touched.password}
                                id="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                autoComplete="new-password"
                                disabled={loading}
                                helperText={
                                    formik.errors.password && formik.touched.password ? formik.errors.password : null
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="re-password"
                                label="Renew Password"
                                type="password"
                                id="re-password"
                                error={formik.errors['re-password'] && formik.touched['re-password']}
                                value={formik.values['re-password']}
                                onChange={formik.handleChange}
                                autoComplete="new-password"
                                helperText={
                                    formik.errors['re-password'] && formik.touched['re-password']
                                        ? formik.errors['re-password']
                                        : null
                                }
                                disabled={loading}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {/* <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="Tôi Muốn Nhận Thông Báo Về Các Ưu Đãi Của Cửa Hàng"
                            /> */}
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
                        {loading ? '....' : 'Đăng Ký'}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/login" variant="body2">
                                Bạn Đã Có Tài Khoản? Đăng Nhập
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}
