import React, { Suspense, useContext, useState } from 'react';
import { useParams } from 'react-router';
import UpdateProductForm from './UpdateProductForm';
import Loader from '../../Loaders/Default_Loader/Loader';
import { AuthContext } from '../../Provider/AuthProvider';

const UpdateProduct = () => {

    const { user } = useContext(AuthContext);

    const [productName, setProductName] = useState('');

    const id = useParams();
    console.log(id.id)
    const productPromise = fetch(`https://galaxia-mart-server.vercel.app/product/${id.id}`, {
        headers: {
            authorization: `Bearer ${user?.accessToken}`
        }
    }).then(res => res.json()).catch(err => console.log(err));
    console.log(productPromise)

    const fnProductName = (name) => {
        console.log(name);
        setProductName(name);
    }
    return (
        <div className='min-h-screen my-20 px-4 md:px-0'>
            <h3 className='text-3xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-500 to-violet-500 tracking-tighter drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] orbitron mb-10'>Update Product:- {productName}</h3>
            <Suspense fallback={<Loader />}>
                <UpdateProductForm id={id} productPromise={productPromise} fnProductName={fnProductName} />
            </Suspense>
        </div>
    );
};

export default UpdateProduct;