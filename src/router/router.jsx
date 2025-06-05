import React from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayout from '../RootLayout/RootLayout';
import SignIn from '../components/auth/SignIn';
import SignUp from '../components/auth/SignUp';
import Home from '../pages/Home/Home';

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
            }
        ]
    }
])

export default router;