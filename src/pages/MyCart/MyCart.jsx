import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { motion } from 'motion/react';
import Swal from 'sweetalert2';
import { IoCartOutline, IoRocketOutline, IoTrashOutline, IoAddOutline, IoRemoveOutline } from 'react-icons/io5';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useLocation } from 'react-router';

const MyCart = () => {

    const { user, loading } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);


    const emptyStateVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const emptyItemVariants = {
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1, transition: { duration: 0.5 } }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.5 }
        }),
        hover: { y: -5, boxShadow: '0 10px 20px rgba(34, 211, 238, 0.3)' }
    };


    useEffect(() => {
        if (loading || !user?.email) return;

        const fetchCartItems = async () => {
            setIsFetching(true);
            setError(null);

            try {
                const res = await axios.get(`http://localhost:3000/cart-items?email=${user?.email}`);
                setCartItems(res.data);
            }
            catch (err) {
                setError(err.message);
            }
            finally {
                setIsFetching(false);
            }
        };
        fetchCartItems();

    }, [user, loading]);

    // console.log(cartItems);

    useEffect(() => {
        if (cartItems.length === 0) return;

        const itemIds = cartItems.map(item => item?.productId);
        console.log(itemIds);

        const fetchProducts = async () => {
            try {
                const res = await axios.post('http://localhost:3000/cart-item-details-by-id', { ids: itemIds });
                setProducts(res.data);
            }
            catch (err) {
                console.error(err);
            }
        }
        fetchProducts();

    }, [cartItems]);
    // console.log(products);

    const mergedCart = products.map(product => {
        const cartItem = cartItems.find(item => item.productId === product._id.toString());
        return {
            ...product,
            quantity: cartItem?.quantity || 1,
            cartItemId: cartItem?._id
        };
    });
    console.log(mergedCart);


    const handleRemoveItem = async (cartItemId, productName) => {
        try {
            const result = await Swal.fire({
                title: 'Remove Item',
                text: `Are you sure you want to remove ${productName} from your cart?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, remove it!',
                cancelButtonText: 'No, keep it',
                customClass: {
                    container: 'swal-dark',
                    popup: 'swal-dark',
                    title: 'swal-title',
                    htmlContainer: 'swal-text',
                    confirmButton: 'swal-confirm-button',
                    cancelButton: 'swal-cancel-button'
                }
            });

            if (result.isConfirmed) {
                setIsUpdating(true);
                await axios.delete(`http://localhost:3000/cart-items/${cartItemId}`);
                setCartItems(cartItems.filter(item => item._id !== cartItemId));

                Swal.fire({
                    title: 'Removed!',
                    text: `${productName} has been removed from your cart.`,
                    icon: 'success',
                    customClass: {
                        container: 'swal-dark',
                        popup: 'swal-dark',
                        title: 'swal-title',
                        htmlContainer: 'swal-text',
                        confirmButton: 'swal-confirm-button'
                    }
                });
            }
        } catch (error) {
            console.log("error removing item in my cart", error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to remove item from cart.',
                icon: 'error',
                customClass: {
                    container: 'swal-dark',
                    popup: 'swal-dark',
                    title: 'swal-title',
                    htmlContainer: 'swal-text',
                    confirmButton: 'swal-confirm-button'
                }
            });
        } finally {
            setIsUpdating(false);
        }
    };


    const handleUpdateQuantity = async (cartItemId, newQuantity) => {
        if (newQuantity < 1) return;

        try {
            setIsUpdating(true);
            const res = await axios.patch(`http://localhost:3000/cart-items/${cartItemId}`, {
                quantity: newQuantity
            });
            console.log(res);

            if (res?.data?.result?.modifiedCount > 0) {
                Swal.fire({
                    title:'Quantity updated',
                    icon:'success',
                    toast: true,
                    timer: 1500,
                    position: 'top',
                    showConfirmButton: false,
                    customClass: {
                        popup: 'swal-dark',
                        title: 'swal-title'
                    }
                })
                setCartItems(cartItems.map(item =>
                    item._id === cartItemId ? { ...item, quantity: newQuantity } : item
                ));
            } else {
                Swal.fire({
                    title: 'Something went wrong!',
                    text: 'Failed to update quantity.',
                    icon: 'error',
                    customClass: {
                        container: 'swal-dark',
                        popup: 'swal-dark',
                        title: 'swal-title',
                        htmlContainer: 'swal-text',
                        confirmButton: 'swal-confirm-button'
                    }
                });
            };


        } catch (error) {
            console.log("error updating quantity in the my cart", error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update quantity.',
                icon: 'error',
                customClass: {
                    container: 'swal-dark',
                    popup: 'swal-dark',
                    title: 'swal-title',
                    htmlContainer: 'swal-text',
                    confirmButton: 'swal-confirm-button'
                }
            });
        } finally {
            setIsUpdating(false);
        }
    };


    const handleCheckout = async () => {
        try {
            const result = await Swal.fire({
                title: 'Proceed to Checkout',
                text: `You're about to checkout ${mergedCart.length} items. Continue?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes, checkout!',
                cancelButtonText: 'No, continue shopping',
                customClass: {
                    container: 'swal-dark',
                    popup: 'swal-dark',
                    title: 'swal-title',
                    htmlContainer: 'swal-text',
                    confirmButton: 'swal-confirm-button',
                    cancelButton: 'swal-cancel-button'
                }
            });

            if (result.isConfirmed) {
                // Implement your checkout logic here
                // For example, redirect to checkout page or process payment
                Swal.fire({
                    title: 'Checkout Successful!',
                    text: 'Your order has been placed successfully.',
                    icon: 'success',
                    customClass: {
                        container: 'swal-dark',
                        popup: 'swal-dark',
                        title: 'swal-title',
                        htmlContainer: 'swal-text',
                        confirmButton: 'swal-confirm-button'
                    }
                });
            }
        } catch (error) {
            console.log('error checking out from my cart', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to process checkout.',
                icon: 'error',
                customClass: {
                    container: 'swal-dark',
                    popup: 'swal-dark',
                    title: 'swal-title',
                    htmlContainer: 'swal-text',
                    confirmButton: 'swal-confirm-button'
                }
            });
        }
    };


    const calculateTotal = () => {
        return mergedCart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };


    const handleContinueShopping = () => {
        // Implement navigation to shop page
        console.log('Continue shopping clicked');
    };



    if (isFetching) {
        return (
            <div className="container mx-auto px-4 max-w-5xl py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="bg-[#2a2a3e] rounded-xl overflow-hidden border border-cyan-300/30 p-6">
                            <Skeleton height={192} className="mb-4" />
                            <Skeleton count={5} />
                            <div className="flex justify-between mt-4">
                                <Skeleton width={100} height={40} />
                                <Skeleton width={100} height={40} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }



    if (error) {
        return (
            <div className="container mx-auto px-4 max-w-5xl py-8 text-center">
                <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-red-400 mb-2">Error Loading Cart</h2>
                    <p className="text-red-300">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-red-600/50 hover:bg-red-600 rounded-lg text-white"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }



    return (
        <div className="container mx-auto px-4 max-w-5xl py-8">
            <h1 className="text-3xl font-bold text-cyan-100 mb-8 orbitron flex items-center gap-2">
                <IoCartOutline size={28} />
                My Shopping Cart
            </h1>

            {mergedCart.length === 0 ? (
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
                        You haven't added any products yet. Explore our collection and find something amazing!
                    </motion.p>
                    <motion.div variants={emptyItemVariants}>
                        <motion.button
                            onClick={handleContinueShopping}
                            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(34,211,238,0.7)' }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600/50 to-indigo-600/50 text-white rounded-xl orbitron font-semibold shadow-[0_0_10px_rgba(34,211,238,0.3)] hover:from-cyan-500 hover:to-indigo-500 cursor-pointer"
                        >
                            <IoRocketOutline size={24} />
                            Continue Shopping
                        </motion.button>
                    </motion.div>
                </motion.div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-6">
                            {mergedCart.map((item, index) => (
                                <motion.div
                                    key={item._id}
                                    custom={index}
                                    initial="hidden"
                                    animate="visible"
                                    variants={cardVariants}
                                    whileHover="hover"
                                    className="bg-[#2a2a3e] rounded-xl overflow-hidden border border-cyan-300/30"
                                >
                                    <div className="flex flex-col sm:flex-row">
                                        <div className="sm:w-1/3">
                                            <img
                                                src={item.image?.[0] || 'https://via.placeholder.com/300x200?text=Product'}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/300x200?text=Image+Error';
                                                }}
                                            />
                                        </div>
                                        <div className="sm:w-2/3 p-6">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-xl font-semibold text-cyan-100 orbitron">
                                                    {item.name}
                                                </h3>
                                                <button
                                                    onClick={() => handleRemoveItem(item.cartItemId, item.name)}
                                                    disabled={isUpdating}
                                                    className="text-red-400 hover:text-red-300 transition-colors"
                                                >
                                                    <IoTrashOutline size={20} />
                                                </button>
                                            </div>
                                            <p className="text-sm text-cyan-200 mt-1 orbitron">
                                                Brand: {item.brand}
                                            </p>
                                            <p className="text-cyan-400 text-lg font-bold mt-2">
                                                ${item.price.toFixed(2)}
                                            </p>

                                            <div className="flex items-center mt-4">
                                                <span className="text-sm text-cyan-200 mr-3 orbitron">Quantity:</span>
                                                <div className="flex items-center border border-cyan-400/30 rounded-lg overflow-hidden">
                                                    <button
                                                        onClick={() => handleUpdateQuantity(item.cartItemId, item.quantity - 1)}
                                                        disabled={isUpdating || item.quantity <= 1}
                                                        className="px-3 py-1 bg-cyan-900/20 hover:bg-cyan-800/40 text-cyan-100 disabled:opacity-30 disabled:cursor-not-allowed"
                                                    >
                                                        <IoRemoveOutline size={16} />
                                                    </button>
                                                    <span className="px-4 py-1 text-cyan-100">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => handleUpdateQuantity(item.cartItemId, item.quantity + 1)}
                                                        disabled={isUpdating}
                                                        className="px-3 py-1 bg-cyan-900/20 hover:bg-cyan-800/40 text-cyan-100 disabled:opacity-30 disabled:cursor-not-allowed"
                                                    >
                                                        <IoAddOutline size={16} />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-4 flex justify-between items-center">
                                                <div className="flex items-center">
                                                    <span className="text-yellow-400 text-lg">★</span>
                                                    <span className="ml-1 text-sm font-medium text-cyan-100 orbitron">
                                                        {item.rating}
                                                    </span>
                                                </div>
                                                <p className="text-cyan-100 orbitron">
                                                    Subtotal: <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="md:col-span-1">
                            <div className="bg-[#2a2a3e] rounded-xl border border-cyan-300/30 p-6 sticky top-6">
                                <h3 className="text-xl font-bold text-cyan-100 mb-4 orbitron">Order Summary</h3>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between">
                                        <span className="text-cyan-200 orbitron">Subtotal</span>
                                        <span className="text-cyan-100 font-medium">${calculateTotal()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-cyan-200 orbitron">Shipping</span>
                                        <span className="text-cyan-100 font-medium">$0.00</span>
                                    </div>
                                    <div className="flex justify-between border-t border-cyan-300/20 pt-3">
                                        <span className="text-cyan-100 orbitron font-bold">Total</span>
                                        <span className="text-cyan-50 font-bold text-lg">${calculateTotal()}</span>
                                    </div>
                                </div>

                                <motion.button
                                    onClick={handleCheckout}
                                    whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(34,211,238,0.7)' }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={isUpdating || mergedCart.length === 0}
                                    className="w-full bg-gradient-to-r from-cyan-600/50 to-indigo-600/50 text-white py-3 rounded-lg font-bold orbitron hover:from-cyan-500 hover:to-indigo-500 shadow-[0_0_10px_rgba(34,211,238,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Proceed to Checkout
                                </motion.button>

                                <motion.button
                                    onClick={handleContinueShopping}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full mt-4 bg-transparent border border-cyan-400/30 text-cyan-100 py-3 rounded-lg font-medium orbitron hover:bg-cyan-900/20"
                                >
                                    Continue Shopping
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default MyCart;