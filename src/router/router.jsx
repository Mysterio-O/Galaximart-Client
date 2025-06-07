import React from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayout from '../RootLayout/RootLayout';
import SignIn from '../components/auth/SignIn';
import SignUp from '../components/auth/SignUp';
import Home from '../pages/Home/Home';
import Products from '../components/Products/Products';

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
            }
        ]
    }
])

export default router;