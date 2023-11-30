import authAxios from '../axios/authAxios'
import Axios from '../axios/axios'
export const fetchTest = () => {
    return Axios.get('https://reqres.in/api/users?page=2')
}

export const fetchLogin = data => {
    return Axios.post('/user/index.php?action=login', data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

export const fetchRegister = data => {
    return Axios.post('/user/index.php?action=register', data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

export const fetchLogout = () => {
    return Axios.post('/user/index.php?action=logout', null, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

export const fetchUser = token => {
    return authAxios.get('/user/index.php?action=getuser', {
        headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "application/x-www-form-urlencoded",
        },
    })
}

export const fetchCreateProduct = (data, token) => {
    return authAxios.post('/product/index.php?action=create', data, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

export const fetchCategory = () => {
    return Axios.get('/category/index.php?action=get')
}

export const fetchUpdateInformation = (uid, token, data) => {
    return authAxios.post(
        `/user/index.php?action=update&uid=${uid}`,
        {
            address: data.address,
            phone_number: data.phone,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    )
}

export const fetchUpdatePassword = (uid, token, data) => {
    return authAxios.post(
        `/user/index.php?action=change-password&uid=${uid}`,
        {
            old_password: data.password,
            new_password: data.newPassword,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    )
}

export const fetchProduct = params => {
    const queryString = Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
    return Axios.get(`/product/index.php?action=get-all&${queryString}`)
}

export const fetchProductById = id => {
    return Axios.get(`/product/index.php?action=get-product&pid=${id}`)
}

export const fetchCreateOrder = (token, data) => {
    return authAxios.post('/order/index.php?action=create', data, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}

export const fetchGetOrder = (token, id) => {
    return authAxios.get(`/order/index.php?action=get-order&id=${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export const fetchAllOrderByUser = token => {
    return authAxios.get('/order/index.php?action=get-all-order', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
}

export const fetchSearchProduct = search => {
    return Axios.post(
        '/product/index.php?action=search&page=1&limit=20',
        { title: search },
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    )
}
