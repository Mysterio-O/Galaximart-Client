import React from 'react';
import { useParams } from 'react-router';

const ProductDetails = () => {
    const id = useParams();
    console.log(id)
    return (
        <div className='min-h-screen max-w-6xl mx-auto backdrop-blur-md bg-white/20 m-4 p-4 rounded-2xl '>
            
        </div>
    );
};

export default ProductDetails;