import React, { Suspense, useContext, useEffect } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';
import CartShape from './CartShape';
import Loader from '../../Loaders/Default_Loader/Loader';
import { motion } from 'motion/react';
import Swal from 'sweetalert2';

const Cart = () => {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        let title = "";
        if (user && user?.displayName) {
            title = `${user?.displayName}'s Cart`
        }
        else{
            title="My Cart"
        }
        document.title = title
    }, [user])

    if (!user?.email) {
        return (
            <div className="text-cyan-100 orbitron text-center py-12 bg-[#1a1a2e] min-h-screen">
                Please log in to view your cart.
            </div>
        );
    }

    const orderedProductsPromise = axios
        .get(`https://galaxia-mart-server.vercel.app/ordered/products?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${user?.accessToken}`
            }
        })
        .catch((err) => {
            Swal.fire({
                title: 'Error!',
                text: `Failed to fetch cart: ${err.message || 'Unknown error'}`,
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
            return [];
        });

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#1a1a2e] min-h-screen py-12 relative overflow-hidden mx-4 md:mx-20 my-8 md:my-30 rounded-2xl"
        >
            {/* Glowing background effect */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute w-[500px] h-[500px] bg-cyan-500/30 rounded-full filter blur-3xl opacity-30 top-[-150px] left-[-150px] animate-pulse-slow"></div>
                <div className="absolute w-[500px] h-[500px] bg-indigo-500/30 rounded-full filter blur-3xl opacity-30 bottom-[-150px] right-[-150px] animate-pulse-slow"></div>
                <div className="absolute w-[300px] h-[300px] bg-cyan-400/20 rounded-full filter blur-2xl opacity-20 top-[50%] left-[20%] animate-pulse-slow delay-1000"></div>
                <div className="absolute w-[300px] h-[300px] bg-indigo-400/20 rounded-full filter blur-2xl opacity-20 top-[30%] right-[30%] animate-pulse-slow delay-2000"></div>
            </div>
            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="text-4xl font-bold text-cyan-100 mb-8 orbitron"
                >
                    My Cart
                </motion.h1>
                <Suspense fallback={<Loader />}>
                    <CartShape orderedProductsPromise={orderedProductsPromise} />
                </Suspense>
            </div>
        </motion.section>
    );
};

export default Cart;