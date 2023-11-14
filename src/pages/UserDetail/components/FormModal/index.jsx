/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { fetchUpdateInformation } from '~/services/api'
import { useSelector } from 'react-redux'
import { stateAuth } from '~/redux/selector'
import { toast } from 'react-toastify'
import { Box } from '@mui/material'
import AlertDialog from '~/components/Alert'

export default function FormModal({ close, open, userEdit }) {
    const [formData, setFormData] = useState({})
    const { uid, accessToken } = useSelector(stateAuth)
    const [openAlert, setOpenAlert] = useState(false)

    useEffect(() => {
        setFormData({
            email: userEdit?.email ? userEdit.email : '',
            phone: userEdit?.phone ? userEdit.phone : '',
            address: userEdit?.address ? userEdit.address : '',
        })
    }, [userEdit])

    const submitChangeDataUser = async () => {
        try {
            delete formData.email
            let res = await fetchUpdateInformation(uid, accessToken, formData)
            if (res && res.status === 200) {
                toast('Cập Nhật Thông Tin Thành Công. Vui Lòng Làm Mới Trang Để Kiểm Tra')
                close()
            }
        } catch (error) {
            toast.error('Hệ Thống Đang Bận. Vui Lòng Trở Lại Sau Ít Phút')
        }
    }
    return (
        <Box>
            <Dialog open={open} onClose={close}>
                <DialogTitle>Cập Nhật Thông Tin</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="email"
                        label="Email"
                        type="email"
                        disabled
                        fullWidth
                        variant="standard"
                        value={formData.email}
                    />
                    <TextField
                        margin="dense"
                        id="phone_number"
                        label="Số Điện Thoại"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formData.phone}
                        onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                    <TextField
                        margin="dense"
                        id="address"
                        label="Địa Chỉ"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formData.address}
                        onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={close}>Cancel</Button>
                    <Button onClick={() => setOpenAlert(true)}>Xác Nhận</Button>
                </DialogActions>
            </Dialog>
            <AlertDialog
                open={openAlert}
                setOpen={setOpenAlert}
                content="Bạn Có Chắc Chắn Muốn Thay Đổi Thông Tin Không ?"
                callback={submitChangeDataUser}
            />
        </Box>
    )
}
