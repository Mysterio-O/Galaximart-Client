import axios from 'axios';
import React, { Suspense, useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import MyProductsShape from './MyProductsShape';
import Loader from '../../Loaders/Default_Loader/Loader'

const MyProducts = () => {

    const {user}=useContext(AuthContext);
    
    const productsPromise = axios.get(`http://localhost:3000/products?email=${user?.email}`)
    .catch(err => console.log(err));


    return (
        <div>
            <Suspense fallback={<Loader/>}>
                <MyProductsShape productsPromise={productsPromise}/>
            </Suspense>
        </div>
    );
};

export default MyProducts;