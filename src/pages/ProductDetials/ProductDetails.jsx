import React, { Suspense, useContext } from 'react';
import { useParams } from 'react-router';
import ProductDetailsShape from './ProductDetailsShape';
import Loader from '../../Loaders/Product_Loader/Loader';
import { AuthContext } from '../../Provider/AuthProvider';
import ProductDetailsLoader from '../../Loaders/ProductDetailsLoader/ProductDetailsLoader';

const ProductDetails = () => {
    const id = useParams();
    // console.log('id=',id)

    const { user } = useContext(AuthContext);



    const productPromise = fetch(`https://galaxia-mart-server.vercel.app/product/${id?.id}`, {
        headers: {
            authorization: `Bearer ${user?.accessToken}`
        }
    }).then(res => res.json())


    return (
        <div className='min-h-screen max-w-6xl mx-auto backdrop-blur-md bg-white/20 dark:bg-gray-900/30 m-4 p-4 rounded-2xl my-10 border border-cyan-500/30 dark:border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.3)] dark:shadow-[0_0_15px_rgba(139,92,246,0.2)]'>
            <Suspense fallback={<ProductDetailsLoader />}>
                <ProductDetailsShape productPromise={productPromise} />
            </Suspense>
        </div>
    );
};

export default ProductDetails;