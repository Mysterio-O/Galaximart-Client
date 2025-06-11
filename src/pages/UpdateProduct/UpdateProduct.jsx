import React, { Suspense } from 'react';
import { useParams } from 'react-router';
import UpdateProductForm from './UpdateProductForm';
import Loader from '../../Loaders/Default_Loader/Loader';

const UpdateProduct = () => {

    const id = useParams();
    console.log(id.id)
    const productPromise = fetch(`http://localhost:3000/product/${id.id}`).then(res => res.json()).catch(err => console.log(err));
    console.log(productPromise)
    return (
        <div className='min-h-screen my-20 px-4 md:px-0'>
            <Suspense fallback={<Loader/>}>
                <UpdateProductForm id={id} productPromise={productPromise}/>
            </Suspense>
        </div>
    );
};

export default UpdateProduct;