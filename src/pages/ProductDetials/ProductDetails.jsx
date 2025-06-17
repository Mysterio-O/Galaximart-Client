import React, { Suspense, useContext } from 'react';
import { useParams } from 'react-router';
import ProductDetailsShape from './ProductDetailsShape';
import Loader from '../../Loaders/Product_Loader/Loader';
import { AuthContext } from '../../Provider/AuthProvider';

const ProductDetails = () => {
    const id = useParams();
    // console.log('id=',id)

    const { user } = useContext(AuthContext);



    const productPromise = fetch(`http://localhost:3000/product/${id?.id}`, {
        headers: {
            authorization: `Bearer ${user?.accessToken}`
        }
    }).then(res => res.json())


    return (
        <div className='min-h-screen max-w-6xl mx-auto backdrop-blur-md bg-white/20 m-4 p-4 rounded-2xl my-10 md:my-32'>

            {/* <h2 className="text-4xl font-bold">{productTags.name}{productTags.brand}</h2> */}
            <Suspense fallback={<Loader />}>
                <ProductDetailsShape productPromise={productPromise} />
            </Suspense>
        </div>
    );
};

export default ProductDetails;