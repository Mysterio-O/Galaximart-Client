import axios from 'axios';
import React, { Suspense, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import MyProductsShape from './MyProductsShape';
import Loader from '../../Loaders/Default_Loader/Loader';
import { motion } from 'motion/react';
import Swal from 'sweetalert2';


const CardSkeleton = () => {
    return (
        <div className="min-h-[calc(100vh-432px)] py-12 mx-4 my-3 md:my-30 md:mx-20">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="bg-gray-800/50 dark:bg-gray-200/50 h-10 w-1/3 rounded mb-8 animate-pulse"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array(6).fill(0).map((_, i) => (
                        <div key={i} className="bg-gray-900/90 dark:bg-gray-100/90 rounded-xl overflow-hidden border border-cyan-500/30 dark:border-violet-500/30 animate-pulse">
                            <div className="w-full h-48 bg-gray-800/50 dark:bg-gray-200/50"></div>
                            <div className="p-6">
                                <div className="bg-gray-800/50 dark:bg-gray-200/50 h-6 w-3/4 rounded mb-2"></div>
                                <div className="bg-gray-800/50 dark:bg-gray-200/50 h-4 w-1/2 rounded mb-2"></div>
                                <div className="bg-gray-800/50 dark:bg-gray-200/50 h-4 w-1/2 rounded mb-3"></div>
                                <div className="bg-gray-800/50 dark:bg-gray-200/50 h-4 w-1/4 rounded mb-4"></div>
                                <div className="bg-gray-800/50 dark:bg-gray-200/50 h-10 w-full rounded-lg mb-2"></div>
                                <div className="bg-gray-800/50 dark:bg-gray-200/50 h-10 w-full rounded-lg"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const MyProducts = () => {
    const { user, loading } = useContext(AuthContext);

    const [productsPromise, setProductsPromise] = useState(null);


    useEffect(() => {
        if (!loading && user && user?.accessToken) {
            const fetchProducts = axios
                .get(`https://galaxia-mart-server.vercel.app/products?email=${user?.email}`, {
                    headers: {
                        authorization: `Bearer ${user?.accessToken}`
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
            setProductsPromise(fetchProducts);
        }

        let title = "";
        if (user && user?.displayName) {
            title = `${user?.displayName}'s Products`
        } else {
            title = "My Products"
        }
        document.title = title;

    }, [loading, user]);
    return (
        <>
            {loading || !productsPromise ? (
                <CardSkeleton />
            ) : (
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-900/90 dark:bg-gray-100/90 min-h-[calc(100vh-432px)] py-12 relative overflow-hidden mx-4 my-3 md:my-30 md:mx-20 rounded-2xl border border-cyan-500/30 dark:border-violet-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(34,211,238,0.5),0_0_30px_rgba(79,70,229,0.3)] dark:shadow-[0_0_20px_rgba(34,211,238,0.4),0_0_30px_rgba(79,70,229,0.2)]"
                >
                    {/* Background glow effect */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute w-96 h-96 bg-cyan-500/25 dark:bg-cyan-500/15 rounded-full filter blur-3xl opacity-20 top-[-100px] left-[-100px] animate-pulse-slow"></div>
                        <div className="absolute w-96 h-96 bg-magenta-500/25 dark:bg-magenta-500/15 rounded-full filter blur-3xl opacity-20 bottom-[-100px] right-[-100px] animate-pulse-slow"></div>
                    </div>
                    <div className="container mx-auto px-4 max-w-5xl relative z-10">
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="text-4xl font-bold text-gray-100 dark:text-gray-800 mb-8 orbitron"
                        >
                            My Products
                        </motion.h1>
                        <Suspense fallback={<CardSkeleton />}>
                            <MyProductsShape productsPromise={productsPromise} />
                        </Suspense>
                    </div>
                </motion.section>
            )}
        </>
    );
};

export default MyProducts;