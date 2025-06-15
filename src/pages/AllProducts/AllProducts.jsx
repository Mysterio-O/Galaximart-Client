import React, { Suspense, useContext } from 'react';
import Products from './Products';
import Loader from '../../Loaders/Default_Loader/Loader';
import { getProducts } from '../../apis/products_api';
import { AuthContext } from '../../Provider/AuthProvider';

const AllProducts = () => {

    const { user } = useContext(AuthContext);

    const token = user?.accessToken
    // console.log("user->",user,"token->",token)

    const productsPromise = getProducts(token);
    // console.log(productsPromise)


    return (
        <div className='min-h-screen mt-32 max-w-6xl mx-auto'>
            <Suspense fallback={<Loader />}>
                <Products productsPromise={productsPromise}></Products>
            </Suspense>
        </div>
    );
};

export default AllProducts;