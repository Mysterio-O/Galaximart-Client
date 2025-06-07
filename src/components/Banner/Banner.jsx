import React from 'react';
import Slider from '../../pages/Slider/Slider';
import GalacticHeader from '../Headers/GalacticHeader';

const Banner = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <div className='mb-5'>
                <GalacticHeader/>
            </div>
            <Slider/>
        </div>
    );
};

export default Banner;