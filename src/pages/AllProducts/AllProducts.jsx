import React, { Suspense } from 'react';
import { getCategories } from '../../apis/products_api';
import Products from './Products';

const AllProducts = () => {
    const productsPromise = getCategories();
    console.log(productsPromise)
    return (
        <div className='min-h-screen'>
            <Suspense fallback={'loading...'}>
                <Products productsPromise={productsPromise}></Products>
            </Suspense>
        </div>
    );
};

export default AllProducts;