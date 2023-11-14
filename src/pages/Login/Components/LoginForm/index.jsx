import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useDispatch } from 'react-redux'
import { fetchLoginUser } from '~/redux/features/userSlice'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function LoginForm() {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .min(10, 'Email Không Hợp Lệ')
                .email('Định Dạng Email Không Hợp Lệ')
                .required('Vui Lòng Nhập Email'),
            password: Yup.string().required('Vui Lòng Nhập Password'),
        }),
        onSubmit: async e => {
            setLoading(true)
            dispatch(fetchLoginUser(e))
                .unwrap()
                .then(() => {
                    toast.success('Đăng Nhập Thành Công')
                    setLoading(false)
                })
                .catch(err => {
                    toast.error(err.msg)
                    setLoading(false)
                })
        },
    })

    return (
        <Container component="div" maxWidth="xs">
            <Box
                sx={{
                    py: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Đăng Nhập
                </Typography>
                <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.errors.email && formik.touched.email && (
                        <Typography variant="caption" sx={{ color: 'red' }}>
                            {formik.errors.email}
                        </Typography>
                    )}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        autoComplete="current-password"
                    />
                    {formik.errors.password && formik.touched.password && (
                        <Typography variant="caption" sx={{ color: 'red' }}>
                            {formik.errors.password}
                        </Typography>
                    )}
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
                        {loading ? '....' : 'Đăng Nhập'}
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/register" variant="body2">
                                Bạn Chưa Có Tài Khoản? Đăng Ký
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}
