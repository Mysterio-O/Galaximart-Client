import React, { Suspense } from 'react';
import { useParams } from 'react-router';
import ProductDetailsShape from './ProductDetailsShape';
import Loader from '../../Loaders/Product_Loader/Loader';

const ProductDetails = () => {
    const id = useParams();
    console.log('id=',id)



    const productPromise = fetch(`http://localhost:3000/product/${id?.id}`).then(res => res.json())


    return (
        <div className='min-h-screen max-w-6xl mx-auto backdrop-blur-md bg-white/20 m-4 p-4 rounded-2xl '>
            <Suspense fallback={<Loader/>}>
                <ProductDetailsShape productPromise={productPromise}/>
            </Suspense>
        </div>
    );
};

export default ProductDetails;