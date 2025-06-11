import React, { Suspense } from 'react';
import Products from './Products';
import Loader from '../../Loaders/Default_Loader/Loader';
import { getProducts } from '../../apis/products_api';

const AllProducts = () => {
    const productsPromise = getProducts();
    console.log(productsPromise)
    return (
        <div className='min-h-screen mt-32 max-w-6xl mx-auto'>
            <Suspense fallback={<Loader/>}>
                <Products productsPromise={productsPromise}></Products>
            </Suspense>
        </div>
    );
};

export default AllProducts;