import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Scroll from '../pages/Scroll/Scroll'
import GalaxiParalax from '../components/GalaxiParalax/GalaxiParalax';

const RootLayout = () => {
    return (
        <div className='inter bg-gradient-to-r from-gray-900/95 via-violet-950/95 to-cyan-900/95'>
            <Scroll/>
            <Navbar/>
            <Outlet/>
            <GalaxiParalax/>
            <div className="min-h-screen"></div>
            <Footer/>
        </div>
    );
};

export default RootLayout;