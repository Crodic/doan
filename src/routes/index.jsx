import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loading from '~/components/Loading'

const HomePage = lazy(() => import('~/pages/Home'))
const ProductDetail = lazy(() => import('~/pages/ProductDetail'))
const LoginPage = lazy(() => import('~/pages/Login'))
const RegisterPage = lazy(() => import('~/pages/Register'))
const UserDetailPage = lazy(() => import('~/pages/UserDetail'))
const ProductsPage = lazy(() => import('~/pages/Products'))
const AboutPage = lazy(() => import('~/pages/About'))
const ContactPage = lazy(() => import('~/pages/Contact'))
const Page404 = lazy(() => import('~/pages/404Page'))
const PaymentPage = lazy(() => import('~/pages/PaymentPage'))
const OrderPage = lazy(() => import('~/pages/OrderPage'))
const OrderPageDetail = lazy(() => import('~/pages/OrderPageDetail'))

const AppRouter = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/product" element={<ProductsPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/order/:uid" element={<OrderPage />} />
                <Route path="/order-detail/:bid" element={<OrderPageDetail />} />
                <Route path="/payment/:uid" element={<PaymentPage />} />
                <Route path="/user/:uid" element={<UserDetailPage />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </Suspense>
    )
}

export default AppRouter
