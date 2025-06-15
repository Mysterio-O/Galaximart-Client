import axios from 'axios';
import React, { Suspense, useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import MyProductsShape from './MyProductsShape';
import Loader from '../../Loaders/Default_Loader/Loader';
import { motion } from 'motion/react';
import Swal from 'sweetalert2';

const MyProducts = () => {
    const { user } = useContext(AuthContext);

    const productsPromise = axios
        .get(`http://localhost:3000/products?email=${user?.email}`,{
            headers:{
                authorization:`Bearer ${user?.accessToken}`
            }
        })
        .catch((err) => {
            Swal.fire({
                title: 'Error!',
                text: `Failed to fetch products: ${err.message || 'Unknown error'}`,
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'swal-dark',
                    title: 'swal-title',
                    content: 'swal-content',
                    confirmButton: 'swal-confirm-button',
                },
                buttonsStyling: false,
            });
            console.error('Fetch error:', err);
            return { data: [] };
        });

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#1a1a2e] min-h-[calc(100vh-432px)] py-12 relative overflow-hidden mx-4 my-3 md:my-30 md:mx-20 rounded-2xl"
        >
            {/* Background glow effect */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl opacity-100 top-[-100px] left-[-100px] animate-pulse-slow"></div>
                <div className="absolute w-96 h-96 bg-indigo-500/20 rounded-full filter blur-3xl opacity-20 bottom-[-100px] right-[-100px] animate-pulse-slow"></div>
            </div>
            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="text-4xl font-bold text-cyan-100 mb-8 orbitron"
                >
                    My Products
                </motion.h1>
                <Suspense fallback={<Loader />}>
                    <MyProductsShape productsPromise={productsPromise} />
                </Suspense>
            </div>
        </motion.section>
    );
};

export default MyProducts;