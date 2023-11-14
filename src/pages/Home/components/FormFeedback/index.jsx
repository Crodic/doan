import { Button, Grid, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

const FormFeedBack = () => {
    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            note: '',
        },
        validationSchema: Yup.object({
            firstname: Yup.string().required('Vui Lòng Nhập Họ Tên'),
            lastname: Yup.string().required('Vui Lòng Nhập Họ Tên'),
            email: Yup.string().email('Email Không Hợp Lệ').required('Vui Lòng Nhập Email'),
            phone: Yup.string()
                .min(9, 'Số Điện Thoại Không Hợp Lệ')
                .max(11, 'Số Điện Thoại Không Xác Định')
                .required('Vui Lòng Nhập Số Điện Thoại'),
            note: Yup.string().min(10, 'Nội Dung Quá Ngắn'),
        }),
        onSubmit: e => {
            console.log(e)
            toast('🦄 Cảm Ơn Bạn Đã Đóng Góp Ý Kiến')
        },
    })

    return (
        <Grid container component="form" noValidate autoComplete="false" onSubmit={formik.handleSubmit}>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={5}>
                        <TextField
                            label="Họ"
                            fullWidth
                            size="small"
                            name="firstname"
                            value={formik.values.firstname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            helperText={
                                formik.errors.firstname && formik.touched.firstname ? formik.errors.firstname : null
                            }
                            error={formik.errors.firstname && formik.touched.firstname}
                        />
                    </Grid>
                    <Grid item xs={2} />
                    <Grid item xs={5}>
                        <TextField
                            label="Tên"
                            fullWidth
                            size="small"
                            name="lastname"
                            value={formik.values.lastname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            helperText={
                                formik.errors.lastname && formik.touched.lastname ? formik.errors.lastname : null
                            }
                            error={formik.errors.lastname && formik.touched.lastname}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{ mt: 3 }}>
                <TextField
                    label="Email"
                    size="small"
                    fullWidth
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.errors.email && formik.touched.email ? formik.errors.email : null}
                    error={formik.errors.email && formik.touched.email}
                />
            </Grid>
            <Grid item xs={12} sx={{ mt: 3 }}>
                <TextField
                    label="Phone"
                    size="small"
                    fullWidth
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.errors.phone && formik.touched.phone ? formik.errors.phone : null}
                    error={formik.errors.phone && formik.touched.phone}
                />
            </Grid>
            <Grid item xs={12} sx={{ mt: 3 }}>
                <TextField
                    label="Note"
                    multiline
                    maxRows={3}
                    minRows={3}
                    fullWidth
                    name="note"
                    value={formik.values.note}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={formik.errors.note && formik.touched.note ? formik.errors.note : null}
                    error={formik.errors.note && formik.touched.note}
                />
            </Grid>
            <Grid item sx={{ mt: 3 }} xs={12}>
                <Button type="submit" variant="contained" color="success">
                    Gửi Ý Kiến
                </Button>
            </Grid>
        </Grid>
    )
}

export default FormFeedBack
