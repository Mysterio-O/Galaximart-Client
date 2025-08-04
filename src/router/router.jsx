import React from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayout from '../RootLayout/RootLayout';
import SignIn from '../components/auth/SignIn';
import SignUp from '../components/auth/SignUp';
import Home from '../pages/Home/Home';
import Products from '../components/Products/Products';
import AllProducts from '../pages/AllProducts/AllProducts';
import AddProduct from '../pages/AddProduct/AddProduct';
import MyProducts from '../pages/MyProducts/MyProducts';
import ProductDetails from '../pages/ProductDetials/ProductDetails';
import PrivateRoute from '../Provider/PrivateRoute';
import UpdateProduct from '../pages/UpdateProduct/UpdateProduct';
import ErrorPage from '../components/common/shared/ErrorPage';
import Cart from '../pages/Cart/Cart';
import Paralax from '../components/GalaxiParalax/Paralax';
import AboutUs from '../pages/AboutUs/AboutUs';
import ContactUs from '../pages/ContactUs/ContactUs';

const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/auth/signin',
                Component: SignIn
            },
            {
                path: '/auth/signup',
                Component: SignUp
            },
            {
                path: '/products/:product_name',
                Component: Products
            },
            {
                path: '/all-product',
                element: <PrivateRoute>
                    <AllProducts />
                </PrivateRoute>
            },
            {
                path: '/add-product',
                element: <PrivateRoute>
                    <AddProduct />
                </PrivateRoute>
            },
            {
                path: '/my-product',
                element: <PrivateRoute>
                    <MyProducts />
                </PrivateRoute>
            },
            {
                path: '/product/details/:id',
                element: <PrivateRoute>
                    <ProductDetails />
                </PrivateRoute>
            },
            {
                path: '/product/update/:id',
                element: <PrivateRoute>
                    <UpdateProduct />
                </PrivateRoute>
            },
            {
                path: '/cart',
                element: <PrivateRoute>
                    <Cart />
                </PrivateRoute>
            },
            {
                path: 'about-us',
                Component: AboutUs
            }, {
                path: 'contact-us',
                Component: ContactUs
            }
        ]
    },
    {
        path: '/explore_paralax',
        Component: Paralax
    }
])

export default router;