import React from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayout from '../RootLayout/RootLayout';

const router = createBrowserRouter([
    {
        path:'/',
        Component:RootLayout
    }
])

export default router;