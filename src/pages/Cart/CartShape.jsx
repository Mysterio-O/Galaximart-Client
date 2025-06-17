import React, { use, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { IoRocketOutline } from 'react-icons/io5';

const CartShape = ({ orderedProductsPromise }) => {

    const orderedProducts = use(orderedProductsPromise);

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setProducts(orderedProducts?.data)
    }, [orderedProducts])


    const emptyStateVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: { duration: 0.5, staggerChildren: 0.2 },
        },
    };

    const emptyItemVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

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

    const handleRemove = async (productId, productName, quantity) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `You are about to remove "${productName}" from your cart. This action cannot be undone.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove it!',
            cancelButtonText: 'Cancel',
            customClass: {
                popup: 'swal-dark',
                title: 'swal-title',
                content: 'swal-content',
                confirmButton: 'swal-confirm-button',
                cancelButton: 'swal-cancel-button',
                actions: 'flex gap-4'
            },
            buttonsStyling: false,
        });

        if (result.isConfirmed) {
            try {
                Swal.fire({
                    title: 'Removing Product...',
                    text: 'Please wait while we process your request.',
                    icon: 'info',
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                    customClass: {
                        popup: 'swal-dark',
                        title: 'swal-title',
                        content: 'swal-content',
                    },
                });

                const response = await axios.delete(`http://localhost:3000/ordered/product/${productId}`);

                if (response.data.acknowledged && response.data.deletedCount > 0) {
                    setProducts(products.filter((product) => product._id !== productId));

                    await axios.patch(`http://localhost:3000/ordered/products/${productName}`, { quantity })
                        .then(res => console.log(res.data))
                        .catch(err => console.log(err));

                    Swal.fire({
                        title: 'Removed!',
                        text: 'Product has been removed from your cart.',
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
                } else {
                    throw new Error('Product not found');
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: `Failed to remove product: ${error.response?.data?.error || error.message}`,
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
            }
        }
    };

    // console.log(products)

    const handleCategories = () => {
        // console.log('clicked');
        if (window.location.pathname === '/') {
            const element = document.getElementById('categories');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            } else {
                setTimeout(() => {
                    const retryElement = document.getElementById('categories');
                    if (retryElement) {
                        retryElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 500);
            }
        }
        else {
            navigate('/#categories');
        }

    }

    return (
        <div className="container mx-auto px-4 max-w-5xl">
            {products.length === 0 ? (
                <motion.div
                    variants={emptyStateVariants}
                    initial="initial"
                    animate="animate"
                    className="flex flex-col items-center justify-center min-h-[60vh] text-center relative"
                >
                    <motion.div
                        className="absolute w-64 h-10 bg-cyan-500/10 rounded-full filter blur-3xl opacity-30"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div variants={emptyItemVariants}>
                        <h2 className="text-3xl font-bold text-cyan-100 mb-4 orbitron">
                            Your Cart is Empty
                        </h2>
                    </motion.div>
                    <motion.p
                        variants={emptyItemVariants}
                        className="text-lg text-cyan-200 mb-8 orbitron max-w-md"
                    >
                        You haven’t purchased any products yet. Explore GalaxyMart and add something amazing!
                    </motion.p>
                    <motion.div variants={emptyItemVariants}>
                        <motion.button
                            onClick={handleCategories}
                            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(34,211,238,0.7)' }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600/50 to-indigo-600/50 text-white rounded-xl orbitron font-semibold shadow-[0_0_10px_rgba(34,211,238,0.3)] hover:from-cyan-500 hover:to-indigo-500 cursor-pointer"
                        >
                            <IoRocketOutline size={24} />
                            Shop Now
                        </motion.button>
                    </motion.div>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                        <motion.div
                            key={product._id}
                            custom={index}
                            initial="hidden"
                            animate="visible"
                            variants={cardVariants}
                            whileHover="hover"
                            className="bg-[#2a2a3e] rounded-xl overflow-hidden border border-cyan-300/30"
                        >
                            <img
                                src={product.image?.[0] || 'https://via.placeholder.com/300x200?text=Product'}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/300x200?text=Image+Error';
                                }}
                            />
                            <div className="p-6 space-y-3">
                                <h3 className="text-lg font-semibold text-cyan-100 truncate orbitron">
                                    {product.name}
                                </h3>
                                <p className="text-sm text-cyan-200 mt-1 orbitron">
                                    Brand: {product.brand}
                                </p>
                                <p className="text-sm text-cyan-200 orbitron">
                                    Category: {product.category}
                                </p>
                                <p className="text-sm text-cyan-200 orbitron">
                                    Bought On: {new Date(product.buyingDate).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        timeZone: 'Asia/Dhaka',
                                    })}
                                </p>
                                <p className="text-sm text-cyan-200 orbitron">
                                    Min. Quantity: {product.minQuantity}
                                </p>
                                <p className="text-sm text-cyan-200 orbitron">
                                    Quantity: {product.quantity}
                                </p>
                                <p className="text-sm text-cyan-200 orbitron truncate">
                                    Description: {product.description}
                                </p>
                                <p className="text-sm text-cyan-200 orbitron">
                                    Payment: {product.paymentOption}
                                </p>
                                <div className="flex items-center mt-2">
                                    <span className="text-yellow-400 text-lg">★</span>
                                    <span className="ml-1 text-sm font-medium text-cyan-100 orbitron">
                                        {product.rating}
                                    </span>
                                </div>
                                <motion.button
                                    onClick={() => handleRemove(product?._id, product?.name, product?.quantity)}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="mt-4 w-full bg-gradient-to-r from-red-600/50 to-red-800/50 text-white py-2.5 rounded-lg font-medium orbitron hover:from-red-500 hover:to-red-700 shadow-[0_0_10px_rgba(239,68,68,0.3)] hover:shadow-[0_0_20px_rgba(239,68,68,0.7)] cursor-pointer"
                                >
                                    Cancel Order
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CartShape;