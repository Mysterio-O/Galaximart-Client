import React, { use, useContext, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router'; // Assuming React Router
import EmptyPage from './EmptyPage';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';

const MyProductsShape = ({ productsPromise }) => {
    const [myProducts, setMyProducts] = useState([]);

    const { user, loading } = useContext(AuthContext);
    if (loading) return;

    const products = use(productsPromise);

    useEffect(() => {
        setMyProducts(products?.data || []);
    }, [products]);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.4 },
        }),
        hover: {
            scale: 1.05,
            boxShadow: '0 0 20px rgba(34, 211, 238, 0.5)',
            borderColor: 'rgba(34, 211, 238, 0.7)',
        },
    };

    const handleDelete = (id) => {

        const product = myProducts.find(product => product._id === id);
        const productName = product.name
        // console.log(product);

        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete ${productName}. This action cannot be undone.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            customClass: {
                popup: 'swal-dark',
                title: 'swal-title',
                content: 'swal-content',
                confirmButton: 'swal-confirm-button',
                cancelButton: 'swal-cancel-button',
            },
            buttonsStyling: false,
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://galaxia-mart-server.vercel.app/products/delete/${id}`, {
                    headers: {
                        authorization: `Bearer ${user?.accessToken}`
                    }
                })
                    .then(res => {
                        // console.log(res)
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Product has been deleted successfully.',
                            icon: 'success',
                            confirmButtonText: 'OK',
                            customClass: {
                                popup: 'swal-dark',
                                title: 'swal-title',
                                content: 'swal-content',
                                confirmButton: 'swal-confirm-button',
                            },
                            buttonsStyling: false,
                        });
                        setMyProducts(myProducts.filter(product => product._id !== id));
                    })
                    .catch(error => {
                        console.log('error fetching your data', error)
                        Swal.fire({
                            title: 'Error!',
                            text: `Failed to delete product: ${error.response?.data?.error || error.message}`,
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
                    });
            }
        });


    }

    return (
        <div className="container mx-auto px-4 max-w-5xl">
            {myProducts.length === 0 ? (
                <EmptyPage />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myProducts.map((product, index) => (
                        <motion.div
                            key={product._id}
                            custom={index}
                            initial="hidden"
                            animate="visible"
                            variants={cardVariants}
                            whileHover="hover"
                            className="bg-gray-900/90 dark:bg-gray-100/90 rounded-xl overflow-hidden border border-cyan-500/30 dark:border-violet-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.3)] dark:shadow-[0_0_15px_rgba(34,211,238,0.2)] max-w-[300px]"
                        >
                            <img
                                src={product.image?.[0] || 'https://via.placeholder.com/300x200?text=Product'}
                                alt={product.name}
                                className="w-full h-36 object-cover"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/300x200?text=Image+Error';
                                }}
                            />
                            <div className="p-4">
                                <h3 className="text-base font-semibold text-gray-100 dark:text-gray-800 truncate orbitron">
                                    {product.name}
                                </h3>
                                <p className="text-sm text-gray-300 dark:text-gray-600 mt-1 orbitron">
                                    Brand: {product.brand}
                                </p>
                                <p className="text-sm text-gray-300 dark:text-gray-600 orbitron">
                                    Category: {product.category}
                                </p>
                                <div className="flex items-center mt-2">
                                    <span className="text-yellow-400 dark:text-yellow-500 text-base">★</span>
                                    <span className="ml-1 text-sm font-medium text-gray-100 dark:text-gray-800 orbitron">
                                        {product.rating}
                                    </span>
                                </div>
                                <Link to={`/product/details/${product._id}`}>
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="mt-3 w-full bg-gradient-to-r from-cyan-600/50 to-indigo-600/50 dark:from-cyan-400/50 dark:to-indigo-400/50 text-gray-100 dark:text-gray-800 py-2 rounded-lg font-medium orbitron hover:from-cyan-500 hover:to-indigo-500 dark:hover:from-cyan-400 dark:hover:to-indigo-400 shadow-[0_0_10px_rgba(34,211,238,0.3)] dark:shadow-[0_0_10px_rgba(34,211,238,0.2)] hover:shadow-[0_0_20px_rgba(34,211,238,0.7)] dark:hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                                    >
                                        View Details
                                    </motion.button>
                                </Link>
                                <motion.button
                                    onClick={() => handleDelete(product._id)}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="mt-2 w-full bg-gradient-to-r from-red-600/50 to-red-800/50 dark:from-red-500/50 dark:to-red-700/50 text-gray-100 dark:text-gray-800 py-2 rounded-lg font-medium orbitron hover:from-red-500 hover:to-red-700 dark:hover:from-red-400 dark:hover:to-red-600 shadow-[0_0_10px_rgba(239,68,68,0.3)] dark:shadow-[0_0_10px_rgba(239,68,68,0.2)] hover:shadow-[0_0_20px_rgba(239,68,68,0.7)] dark:hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                                >
                                    Delete Product
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyProductsShape;