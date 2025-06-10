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

const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
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
                path:'/products/:product_name',
                Component:Products
            },
            {
                path:'/all-product',
                element:<PrivateRoute>
                    <AllProducts/>
                </PrivateRoute>
            },
            {
                path:'/add-product',
                element:<PrivateRoute>
                    <AddProduct/>
                </PrivateRoute>
            },
            {
                path:'/my-product',
                element:<MyProducts/>
            },
            {
                path:'/product/details/:id',
                Component:ProductDetails
            }
        ]
    }
])

export default router;