import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { motion } from 'motion/react';
import Swal from 'sweetalert2';
import { IoCartOutline, IoRocketOutline, IoTrashOutline, IoAddOutline, IoRemoveOutline } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router';
import CheckOutModal from './CheckOutModal';

const MyCart = () => {

    const { user, loading } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();


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

    useEffect(()=>{
        document.title = "My Cart"
    },[])

    useEffect(() => {
        if (loading || !user?.email) return;

        const fetchCartItems = async () => {
            setIsFetching(true);
            setError(null);

            try {
                const res = await axios.get(`https://galaxia-mart-server.vercel.app/cart-items?email=${user?.email}`, {
                    headers: {
                        authorization: `Bearer ${user?.accessToken}`
                    }
                });
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
                const res = await axios.post('https://galaxia-mart-server.vercel.app/cart-item-details-by-id', { ids: itemIds }, {
                    headers: {
                        authorization: `Bearer ${user?.accessToken}`
                    }
                });
                setProducts(res.data);
            }
            catch (err) {
                console.error(err);
            }
        }
        fetchProducts();

    }, [cartItems, user]);
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
                await axios.delete(`https://galaxia-mart-server.vercel.app/cart-items/${cartItemId}`, {
                    headers: {
                        authorization: `Bearer ${user?.accessToken}`
                    }
                });
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
            const res = await axios.patch(`https://galaxia-mart-server.vercel.app/cart-items/${cartItemId}`, {
                quantity: newQuantity
            }, {
                headers: {
                    authorization: `Bearer ${user?.accessToken}`
                }
            });
            console.log(res);

            if (res?.data?.result?.modifiedCount > 0) {
                Swal.fire({
                    title: 'Quantity updated',
                    icon: 'success',
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

                setIsModalOpen(true);

                // Swal.fire({
                //     title: 'Checkout Successful!',
                //     text: 'Your order has been placed successfully.',
                //     icon: 'success',
                //     customClass: {
                //         container: 'swal-dark',
                //         popup: 'swal-dark',
                //         title: 'swal-title',
                //         htmlContainer: 'swal-text',
                //         confirmButton: 'swal-confirm-button'
                //     }
                // });
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
        navigate('/#categories')
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const [paymentLoading, setPaymentLoading] = useState(false);
    const confirmPayment = async (cartItems, total, paymentMethod) => {
        // console.log(cartItems, total());

        if (paymentMethod === '') {
            return Swal.fire({
                title: 'Payment Method Required',
                text: 'Please select a payment method to continue',
                icon: 'warning',
                confirmButtonText: 'OK',
                customClass: {
                    container: 'swal-dark',
                    popup: 'swal-dark',
                    title: 'swal-title',
                    htmlContainer: 'swal-text',
                    confirmButton: 'swal-confirm-button'
                },
                background: '#1a1a2e',
                buttonsStyling: false,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })
        }

        try {
            setPaymentLoading(true)
            const transactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

            const orderedDate = new Date().toISOString();

            const userEmail = user?.email;

            const totalAmount = +total(); // (+) prevents turing into string

            const purchaseDetails = {
                transactionId,
                orderedDate,
                userEmail,
                items: cartItems.map(item => ({
                    productId: item?._id,
                    name: item?.name,
                    brand: item?.brand,
                    price: item?.price,
                    quantity: item?.quantity,
                    image: item?.image[0]
                })),
                totalAmount,
                paymentStatus: "pending",
                deliveryStatus: 'processing'
            }
            console.log(purchaseDetails);

            const res = await axios.post('https://galaxia-mart-server.vercel.app/create-confirm-order', { purchaseDetails }, {
                headers: {
                    authorization: `Bearer ${user?.accessToken}`
                }
            });
            // console.log(res);

            if (res?.data?.insertedId) {

                await clearCartItems();
                setPaymentLoading(false);

                await Swal.fire({
                    title: 'Order Successful!',
                    text: 'Your order was confirmed.',
                    icon: 'success',
                    confirmButtonText: 'View Order',
                    customClass: {
                        container: 'swal-dark',
                        popup: 'swal-dark',
                        title: 'swal-title',
                        htmlContainer: 'swal-text',
                        confirmButton: 'swal-confirm-button'
                    },
                    buttonsStyling: false
                }).then(result => {
                    if (result.isConfirmed) {
                        navigate('/my-orders')
                    }
                })



                setIsModalOpen(false);
            } else {
                throw new Error('Order placement failed!');
            }
        }
        catch (error) {
            console.log("error confirming order from my cart", error);
            setPaymentLoading(false);
            Swal.fire({
                title: 'Order Failed!',
                text: error?.message || 'Your order was failed.',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    container: 'swal-dark',
                    popup: 'swal-dark',
                    title: 'swal-title',
                    htmlContainer: 'swal-text',
                    confirmButton: 'swal-confirm-button'
                },
                buttonsStyling: false
            })
        }

    };

    const clearCartItems = async () => {
        try {
            const res = await axios.delete(`https://galaxia-mart-server.vercel.app/delete-all-cart-items?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${user?.accessToken}`
                }
            });
            console.log(res);
            setCartItems([]);

            setProducts([]);
        }
        catch (error) {
            Swal.fire({
                title: 'Delete Failed!',
                text: error?.message || 'Your delete request failed.',
                icon: 'error',
                confirmButtonText: 'OK',
                customClass: {
                    container: 'swal-dark',
                    popup: 'swal-dark',
                    title: 'swal-title',
                    htmlContainer: 'swal-text',
                    confirmButton: 'swal-confirm-button'
                },
                buttonsStyling: false
            })
        }
    }



    if (isFetching) {
        return (
            <div className="container mx-auto px-4 max-w-5xl py-8">
                <div className="bg-gray-900/90 dark:bg-gray-100/90 h-10 w-1/3 rounded mb-8 animate-pulse"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="bg-gray-900/90 dark:bg-gray-100/90 rounded-xl overflow-hidden border border-cyan-500/30 dark:border-violet-500/30 p-6 animate-pulse">
                                <div className="flex flex-col sm:flex-row">
                                    <div className="sm:w-1/3">
                                        <div className="w-full h-[257px] bg-gray-800/50 dark:bg-gray-200/50 rounded"></div>
                                    </div>
                                    <div className="sm:w-2/3 p-6 space-y-4">
                                        <div className="bg-gray-800/50 dark:bg-gray-200/50 h-6 w-3/4 rounded"></div>
                                        <div className="bg-gray-800/50 dark:bg-gray-200/50 h-4 w-1/2 rounded"></div>
                                        <div className="bg-gray-800/50 dark:bg-gray-200/50 h-6 w-1/4 rounded"></div>
                                        <div className="flex items-center space-x-4">
                                            <div className="bg-gray-800/50 dark:bg-gray-200/50 h-8 w-24 rounded"></div>
                                            <div className="bg-gray-800/50 dark:bg-gray-200/50 h-8 w-16 rounded"></div>
                                        </div>
                                        <div className="bg-gray-800/50 dark:bg-gray-200/50 h-4 w-1/3 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="md:col-span-1">
                        <div className="bg-gray-900/90 dark:bg-gray-100/90 rounded-xl border border-cyan-500/30 dark:border-violet-500/30 p-6 sticky top-6 animate-pulse">
                            <div className="bg-gray-800/50 dark:bg-gray-200/50 h-6 w-1/2 rounded mb-4"></div>
                            <div className="space-y-3">
                                <div className="bg-gray-800/50 dark:bg-gray-200/50 h-4 w-full rounded"></div>
                                <div className="bg-gray-800/50 dark:bg-gray-200/50 h-4 w-full rounded"></div>
                                <div className="bg-gray-800/50 dark:bg-gray-200/50 h-4 w-full rounded"></div>
                            </div>
                            <div className="bg-gray-800/50 dark:bg-gray-200/50 h-10 w-full rounded mt-6"></div>
                            <div className="bg-gray-800/50 dark:bg-gray-200/50 h-10 w-full rounded mt-4"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }



    if (error) {
        return (
            <div className="container mx-auto px-4 max-w-5xl py-8 text-center">
                <div className="bg-red-900/20 dark:bg-red-500/10 border border-red-500/50 dark:border-red-500/30 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-red-400 dark:text-red-500 mb-2">Error Loading Cart</h2>
                    <p className="text-red-300 dark:text-red-400">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-red-600/50 dark:bg-red-500/50 hover:bg-red-600 dark:hover:bg-red-500 rounded-lg text-gray-100 dark:text-gray-800"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }



    return (
        <div className="container mx-auto px-4 max-w-5xl py-8">
            <h1 className="text-xl md:text-3xl font-bold text-gray-100 dark:text-gray-800 mb-8 orbitron flex items-center gap-2">
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
                        className="absolute w-64 h-10 bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full filter blur-3xl opacity-30"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div variants={emptyItemVariants}>
                        <h2 className="text-3xl font-bold text-gray-100 dark:text-gray-800 mb-4 orbitron">
                            Your Cart is Empty
                        </h2>
                    </motion.div>
                    <motion.p
                        variants={emptyItemVariants}
                        className="text-lg text-gray-300 dark:text-gray-600 mb-8 orbitron max-w-md"
                    >
                        You haven't added any products yet. Explore our collection and find something amazing!
                    </motion.p>
                    <motion.div variants={emptyItemVariants}>
                        <motion.button
                            onClick={handleContinueShopping}
                            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(34,211,238,0.7)' }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600/50 to-indigo-600/50 dark:from-cyan-400/50 dark:to-indigo-400/50 text-gray-100 dark:text-gray-800 rounded-xl orbitron font-semibold shadow-[0_0_10px_rgba(34,211,238,0.3)] dark:shadow-[0_0_10px_rgba(34,211,238,0.2)] hover:from-cyan-500 hover:to-indigo-500 dark:hover:from-cyan-400 dark:hover:to-indigo-400 cursor-pointer"
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
                                    className="bg-gray-900/90 dark:bg-gray-100/90 rounded-xl overflow-hidden border border-cyan-500/30 dark:border-violet-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.3)] dark:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                                >
                                    <div className="flex flex-col sm:flex-row">
                                        <div className="sm:w-1/3">
                                            <img
                                                src={item.image?.[0] || 'https://via.placeholder.com/300x200?text=Product'}
                                                alt={item.name}
                                                className="w-full h-[257px] object-cover"
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/300x200?text=Image+Error';
                                                }}
                                            />
                                        </div>
                                        <div className="sm:w-2/3 p-6">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-xl font-semibold text-gray-100 dark:text-gray-800 orbitron">
                                                    {item.name}
                                                </h3>
                                                <button
                                                    onClick={() => handleRemoveItem(item.cartItemId, item.name)}
                                                    disabled={isUpdating}
                                                    className="text-red-400 dark:text-red-500 hover:text-red-300 dark:hover:text-red-400 cursor-pointer hover:scale-110 transition-all duration-300"
                                                >
                                                    <IoTrashOutline size={20} />
                                                </button>
                                            </div>
                                            <p className="text-sm text-gray-300 dark:text-gray-600 mt-1 orbitron">
                                                Brand: {item.brand}
                                            </p>
                                            <p className="text-cyan-400 dark:text-cyan-500 text-lg font-bold mt-2">
                                                ${item.price.toFixed(2)}
                                            </p>

                                            <div className="flex items-center mt-4">
                                                <span className="text-sm text-gray-300 dark:text-gray-600 mr-3 orbitron">Quantity:</span>
                                                <div className="flex items-center border border-cyan-400/30 dark:border-violet-400/30 rounded-lg overflow-hidden">
                                                    <button
                                                        onClick={() => handleUpdateQuantity(item.cartItemId, item.quantity - 1)}
                                                        disabled={isUpdating || item.quantity <= 1}
                                                        className="px-3 py-1 bg-cyan-900/20 dark:bg-violet-900/20 hover:bg-cyan-800/40 dark:hover:bg-violet-800/40 text-gray-100 dark:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed"
                                                    >
                                                        <IoRemoveOutline size={16} />
                                                    </button>
                                                    <span className="px-4 py-1 text-gray-100 dark:text-gray-800">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => handleUpdateQuantity(item.cartItemId, item.quantity + 1)}
                                                        disabled={isUpdating}
                                                        className="px-3 py-1 bg-cyan-900/20 dark:bg-violet-900/20 hover:bg-cyan-800/40 dark:hover:bg-violet-800/40 text-gray-100 dark:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed"
                                                    >
                                                        <IoAddOutline size={16} />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-4 flex justify-between items-center">
                                                <div className="flex items-center">
                                                    <span className="text-yellow-400 dark:text-yellow-500 text-lg">★</span>
                                                    <span className="ml-1 text-sm font-medium text-gray-100 dark:text-gray-800 orbitron">
                                                        {item.rating}
                                                    </span>
                                                </div>
                                                <p className="text-gray-100 dark:text-gray-800 orbitron">
                                                    Subtotal: <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="md:col-span-1">
                            <div className="bg-gray-900/90 dark:bg-gray-100/90 rounded-xl border border-cyan-500/30 dark:border-violet-500/30 p-6 sticky top-6 backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.3)] dark:shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                                <h3 className="text-xl font-bold text-gray-100 dark:text-gray-800 mb-4 orbitron">Order Summary</h3>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between">
                                        <span className="text-gray-300 dark:text-gray-600 orbitron">Subtotal</span>
                                        <span className="text-gray-100 dark:text-gray-800 font-medium">${calculateTotal()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300 dark:text-gray-600 orbitron">Shipping</span>
                                        <span className="text-gray-100 dark:text-gray-800 font-medium">$0.00</span>
                                    </div>
                                    <div className="flex justify-between border-t border-cyan-300/20 dark:border-violet-300/20 pt-3">
                                        <span className="text-gray-100 dark:text-gray-800 orbitron font-bold">Total</span>
                                        <span className="text-gray-50 dark:text-gray-900 font-bold text-lg">${calculateTotal()}</span>
                                    </div>
                                </div>

                                <motion.button
                                    onClick={handleCheckout}
                                    whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(34,211,238,0.7)' }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={isUpdating || mergedCart.length === 0}
                                    className="w-full bg-gradient-to-r from-cyan-600/50 to-indigo-600/50 dark:from-cyan-400/50 dark:to-indigo-400/50 text-gray-100 dark:text-gray-800 py-3 rounded-lg font-bold orbitron hover:from-cyan-500 hover:to-indigo-500 dark:hover:from-cyan-400 dark:hover:to-indigo-400 shadow-[0_0_10px_rgba(34,211,238,0.3)] dark:shadow-[0_0_10px_rgba(34,211,238,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Proceed to Checkout
                                </motion.button>

                                <motion.button
                                    onClick={handleContinueShopping}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full mt-4 bg-transparent border border-cyan-400/30 dark:border-violet-400/30 text-gray-100 dark:text-gray-800 py-3 rounded-lg font-medium orbitron hover:bg-cyan-900/20 dark:hover:bg-violet-900/20"
                                >
                                    Continue Shopping
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {isModalOpen && <CheckOutModal isOpen={isModalOpen} onClose={handleCloseModal} cartItems={mergedCart} total={calculateTotal} confirmPayment={confirmPayment} paymentLoading={paymentLoading} />}
        </div>

    );
};

export default MyCart;