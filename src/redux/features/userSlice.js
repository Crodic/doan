import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchLogin, fetchLogout } from '~/services/api'

const UserSlice = createSlice({
    name: 'user',
    initialState: { uid: null, auth: false, accessToken: null, refreshToken: null, role: null, error: false },
    reducers: {
        logout: state => {
            state.uid = null
            state.auth = false
            state.accessToken = null
            state.refreshToken = null
            state.role = null
        },
        login: (state, action) => {
            state.uid = action.payload.user.uid
            state.auth = true
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
            state.role = action.payload.user.role
        },
        updateAccessToken: (state, action) => {
            state.accessToken = action.payload
        },
        updateRefreshToken: (state, action) => {
            state.refreshToken = action.payload
        },
    },

    extraReducers: builder => {
        builder.addCase(fetchLoginUser.fulfilled, (state, action) => {
            state.uid = action.payload.user.uid
            state.auth = true
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
            state.role = action.payload.user.role
        })
        builder.addCase(fetchLoginUser.rejected, state => {
            state.error = true
        })
        builder.addCase(fetchLogoutUser.fulfilled, state => {
            state.uid = null
            state.auth = false
            state.token = null
            state.role = null
        })
        builder.addCase(fetchLogoutUser.rejected, state => {
            state.error = true
        })
    },
})

export const fetchLoginUser = createAsyncThunk('/User/fetchLoginUser', async (data, thunkAPI) => {
    try {
        const res = await fetchLogin(data)
        if (res?.status === 200) {
            return res.data
        }
    } catch (error) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
        throw error
    }
})

export const fetchLogoutUser = createAsyncThunk('/User/fetchLogoutUser', async (_, thunkAPI) => {
    try {
        const res = await fetchLogout()
        if (res?.status === 200) {
            return res.data
        }
    } catch (error) {
        if (error?.response?.data) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
        throw error
    }
})

export default UserSlice.reducer

export const { logout, login, updateAccessToken, updateRefreshToken } = UserSlice.actions
