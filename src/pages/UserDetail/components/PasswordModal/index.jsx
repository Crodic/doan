import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Box } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { fetchUpdatePassword } from '~/services/api'
import { useSelector } from 'react-redux'
import { stateAuth } from '~/redux/selector'
import { toast } from 'react-toastify'
import { useState } from 'react'
import AlertDialog from '~/components/Alert'

export default function PasswordModal({ close, open }) {
    const { uid, accessToken } = useSelector(stateAuth)
    const [formData, setFormData] = useState(null)
    const [openAlert, setOpenAlert] = useState(false)

    const submitForm = async () => {
        try {
            let res = await fetchUpdatePassword(uid, accessToken, formData)
            if (res && res.status === 200) {
                toast(res.data.msg)
            }
        } catch (error) {
            toast.error(error.response.data.msg)
        } finally {
            close()
            formik.resetForm()
        }
    }

    const formik = useFormik({
        initialValues: {
            password: '',
            newPassword: '',
            reNewPassword: '',
        },
        validationSchema: Yup.object({
            password: Yup.string().min(6, 'Mật Khẩu Không Hợp Lệ').required('Vui Lòng Nhập Mật Khẩu Hiện Tại'),
            newPassword: Yup.string()
                .min(8, 'Mật Khẩu Quá Ngắn')
                .matches(/[0-9]/, 'Mật khẩu cần có ít nhất 1 số')
                .matches(/[a-z]/, 'Mật khẩu cần có ít nhất 1 chữ thường')
                .matches(/[A-Z]/, 'Mật khẩu cần có ít nhất 1 chữ hoa')
                .matches(/[^\w]/, 'Mật khẩu cần có ít nhất 1 ký tự đặc biệt')
                .required('Vui Lòng Nhập Mật Khẩu'),
            reNewPassword: Yup.string()
                .oneOf([Yup.ref('newPassword')], 'Mật Khẩu Không Trùng Khớp')
                .required('Vui Lòng Xác Nhận Mật Khẩu'),
        }),
        onSubmit: e => {
            setFormData(e)
            setOpenAlert(true)
        },
    })
    return (
        <Box>
            <Dialog open={open} onClose={close} component="form" onSubmit={formik.handleSubmit}>
                <DialogTitle>Thay Đổi Mật Khẩu</DialogTitle>
                <DialogContent>
                    <Box>
                        <TextField
                            margin="dense"
                            id="now-password"
                            label="Mật Khẩu Hiện Tại"
                            type="password"
                            fullWidth
                            name="password"
                            variant="standard"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            helperText={
                                formik.errors.password && formik.touched.password ? formik.errors.password : null
                            }
                            error={formik.errors.password && formik.touched.password}
                        />
                        <TextField
                            margin="dense"
                            id="new-password"
                            label="Mật Khẩu Mới"
                            type="password"
                            fullWidth
                            variant="standard"
                            name="newPassword"
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            helperText={
                                formik.errors.newPassword && formik.touched.newPassword
                                    ? formik.errors.newPassword
                                    : null
                            }
                            error={formik.errors.newPassword && formik.touched.newPassword}
                        />
                        <TextField
                            margin="dense"
                            id="renew-password"
                            label="Nhập Lại Mật Khẩu"
                            type="password"
                            fullWidth
                            variant="standard"
                            name="reNewPassword"
                            value={formik.values.reNewPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            helperText={
                                formik.errors.reNewPassword && formik.touched.reNewPassword
                                    ? formik.errors.reNewPassword
                                    : null
                            }
                            error={formik.errors.reNewPassword && formik.touched.reNewPassword}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={close}>Cancel</Button>
                    <Button type="submit">Xác Nhận</Button>
                </DialogActions>
            </Dialog>
            <AlertDialog
                open={openAlert}
                setOpen={setOpenAlert}
                content="Hành Động Nguy Hiểm !!!"
                callback={submitForm}
            />
        </Box>
    )
}
