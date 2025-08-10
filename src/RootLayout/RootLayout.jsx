import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Scroll from '../pages/Scroll/Scroll';

const RootLayout = () => {
    return (
        <div className="inter bg-gradient-to-r from-gray-900/95 via-violet-950/95 to-cyan-900/95 dark:from-gray-100/95 dark:via-violet-100/95 dark:to-cyan-100/95 min-h-screen flex flex-col">
            <Scroll />
            <div className='sticky top-0 z-50'>
                <Navbar />
            </div>
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default RootLayout;