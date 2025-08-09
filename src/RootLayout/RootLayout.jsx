import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Scroll from '../pages/Scroll/Scroll'


const RootLayout = () => {

    

    return (
        <div
            className='inter bg-gradient-to-r from-gray-900/95 via-violet-950/95 to-cyan-900/95'>
            <Scroll />
            <div className='sticky top-0 z-50'>
                <Navbar />
            </div>
            <Outlet />
            
            
            <Footer />
        </div>
    );
};

export default RootLayout;