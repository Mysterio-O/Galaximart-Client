import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios';

const PurchaseModal = ({ product, handleCloseModal, quantity, setIsModalOpen }) => {
    const { user } = useContext(AuthContext);
    const [paymentOption, setPaymentOption] = useState('');
    const [loading, setLoading] = useState(false);
    // console.log(paymentOption)


    // Handle Escape key to close modal
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                setIsModalOpen(false);
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [setIsModalOpen]);

    const handleBuy = (e) => {
        e.preventDefault();
        setLoading(true);



        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        // console.log(data);

        const { address, paymentOption, userName, email } = data;



        if (product?.minQuantity > quantity) {
            setLoading(false);
            return Swal.fire({
                title: 'Minimum Quantity Required',
                text: `You need to purchase a minimum quantity of ${product?.minQuantity}`,
                icon: 'warning',
                confirmButtonText: 'OK',
                background: '#1a1a2e',
                color: '#e0f7ff',
                confirmButtonColor: '#22d3ee',
                customClass: {
                    popup: 'rounded-[20px_18px_14px_16px] shadow-[0_0_20px_rgba(34,211,238,0.5)]',
                    title: 'orbitron text-2xl',
                    confirmButton: 'px-6 py-2 rounded-lg hover:bg-cyan-400 transition-all duration-300'
                }
            });;
        }


        if (product?.stock < quantity) {
            setLoading(false);
            return Swal.fire({
                title: 'Product stock limit reached',
                text: `You need to purchase less than the stock- ${product?.stock}`,
                icon: 'warning',
                confirmButtonText: 'OK',
                background: '#1a1a2e',
                color: '#e0f7ff',
                confirmButtonColor: '#22d3ee',
                customClass: {
                    popup: 'rounded-[20px_18px_14px_16px] shadow-[0_0_20px_rgba(34,211,238,0.5)]',
                    title: 'orbitron text-2xl',
                    confirmButton: 'px-6 py-2 rounded-lg hover:bg-cyan-400 transition-all duration-300'
                }
            });;
        }


        if (!paymentOption) {
            setLoading(false);
            return Swal.fire({
                title: 'Payment Option Required',
                text: 'Please select a payment option',
                icon: 'error',
                confirmButtonText: 'OK',
                background: '#1a1a2e',
                color: '#e0f7ff',
                confirmButtonColor: '#22d3ee',
                customClass: {
                    popup: 'rounded-[20px_18px_14px_16px] shadow-[0_0_20px_rgba(34,211,238,0.5)]',
                    title: 'orbitron text-2xl',
                    confirmButton: 'px-6 py-2 rounded-lg hover:bg-cyan-400 transition-all duration-300'
                }
            });
        }

        const { brand, category, description, image, name, minQuantity, rating, stock } = product;

        const now = new Date();
        // console.log(now)

        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();

        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();


        // console.log(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);

        const buyingDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

        // console.log(buyingDate)

        const orderedProducts = {
            brand, category, description, image, name, minQuantity, rating, quantity, buyingDate, address, paymentOption, userName, email, stock
        }

        if(!user) return;


        axios.post(`https://galaxia-mart-server.vercel.app/ordered/products`, { orderedProducts }, {
            headers: {
                authorization: `Bearer ${user?.accessToken}`
            }
        })
            .then(res => {
                if (res.data.acknowledged || res.data.insertedId) {
                    axios.patch(`https://galaxia-mart-server.vercel.app/purchase/product/${product?._id}`, { quantity }, {
                        headers: {
                            authorization: `Bearer ${user?.accessToken}`
                        }
                    })
                        .then(res => {
                            // console.log('Purchase successful', res.data);
                            setLoading(false);
                            Swal.fire({
                                title: 'Purchase Successful',
                                text: 'Product Purchased successfully!',
                                icon: 'success',
                                confirmButtonText: 'OK',
                                background: '#1a1a2e',
                                color: '#e0f7ff',
                                confirmButtonColor: '#22d3ee'
                            });
                            setIsModalOpen(false);
                        })
                        .catch(err => {
                            console.log('error purchasing product', err);
                            setLoading(false);
                            Swal.fire({
                                title: 'Purchase Failed',
                                text: err.response?.data?.error || 'Something went wrong',
                                icon: 'error',
                                confirmButtonText: 'OK',
                                background: '#1a1a2e',
                                color: '#e0f7ff',
                                confirmButtonColor: '#22d3ee'
                            });
                        })
                }
            })
            .catch(err => console.log(err));




    };

    // Animation variants for modal
    const modalVariants = {
        initial: { y: 100, opacity: 0, scale: 0.9 },
        animate: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: 'easeOut',
                when: 'beforeChildren',
                staggerChildren: 0.1
            }
        },
        exit: { y: 100, opacity: 0, scale: 0.9, transition: { duration: 0.3 } }
    };

    const inputVariants = {
        initial: { x: -20, opacity: 0 },
        animate: { x: 0, opacity: 1, transition: { duration: 0.3 } }
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={handleCloseModal}
            >
                <motion.div
                    className="bg-[#1a1a2e] dark:bg-gray-100 text-white dark:text-gray-900 rounded-[20px_18px_14px_16px] p-6 md:p-8 w-full max-w-4xl mx-4 shadow-[0_0_20px_rgba(34,211,238,0.5),0_0_30px_rgba(79,70,229,0.3)] dark:shadow-[0_0_20px_rgba(139,92,246,0.5),0_0_30px_rgba(139,92,246,0.3)] relative overflow-hidden max-h-[90vh] overflow-y-auto"
                    variants={modalVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Background glow effect */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute w-96 h-96 bg-cyan-500/20 dark:bg-cyan-500/10 rounded-full filter blur-3xl opacity-20 top-[-100px] left-[-100px] animate-pulse-slow"></div>
                        <div className="absolute w-96 h-96 bg-indigo-500/20 dark:bg-indigo-500/10 rounded-full filter blur-3xl opacity-20 bottom-[-100px] right-[-100px] animate-pulse-slow"></div>
                    </div>

                    <div className='flex flex-col lg:flex-row gap-6'>
                        <div className='flex-1'>
                            <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 dark:from-violet-600 dark:to-indigo-600 tracking-tight orbitron mb-6 relative z-10">
                                Confirm Your Purchase
                            </h2>

                            <p className="text-cyan-200/90 dark:text-violet-700/90 mb-6 text-lg leading-relaxed relative z-10">
                                You are about to purchase <strong>{product.name}</strong> for <span className="text-cyan-100 dark:text-violet-700 font-semibold">${product.price}</span>.
                            </p>

                            <form onSubmit={handleBuy} className="space-y-6 relative z-10">
                                <motion.div variants={inputVariants}>
                                    <label className="block text-cyan-100 dark:text-violet-700 font-medium mb-2">User Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={user?.email || ''}
                                        readOnly
                                        className="w-full p-3 rounded-lg bg-gray-900/50 dark:bg-gray-200/50 text-cyan-100 dark:text-violet-800 border border-cyan-300/30 dark:border-violet-300/30 focus:border-cyan-400 dark:focus:border-violet-500 focus:ring-2 focus:ring-cyan-400/50 dark:focus:ring-violet-500/50 outline-none transition-all duration-300"
                                        placeholder="Your email"
                                    />
                                </motion.div>

                                <motion.div variants={inputVariants}>
                                    <label className="block text-cyan-100 dark:text-violet-700 font-medium mb-2">User Name</label>
                                    <input
                                        type="text"
                                        name="userName"
                                        defaultValue={user?.displayName || ''}
                                        className="w-full p-3 rounded-lg bg-gray-900/50 dark:bg-gray-200/50 text-cyan-100 dark:text-violet-800 border border-cyan-300/30 dark:border-violet-300/30 focus:border-cyan-400 dark:focus:border-violet-500 focus:ring-2 focus:ring-cyan-400/50 dark:focus:ring-violet-500/50 outline-none transition-all duration-300"
                                        placeholder="Your name"
                                        required
                                    />
                                </motion.div>
                                <motion.div variants={inputVariants}>
                                    <label className="block text-cyan-100 dark:text-violet-700 font-medium mb-2">User Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        className="w-full p-3 rounded-lg bg-gray-900/50 dark:bg-gray-200/50 text-cyan-100 dark:text-violet-800 border border-cyan-300/30 dark:border-violet-300/30 focus:border-cyan-400 dark:focus:border-violet-500 focus:ring-2 focus:ring-cyan-400/50 dark:focus:ring-violet-500/50 outline-none transition-all duration-300"
                                        placeholder="Your Address (e.g 120 E 12th St, New York)"
                                        required
                                    />
                                </motion.div>

                                <motion.div variants={inputVariants}>
                                    <label className="block text-cyan-100 dark:text-violet-700 font-medium mb-3">Payment Option</label>
                                    <div className="grid grid-cols-1 gap-4">
                                        {[
                                            { name: 'COD', label: 'Cash on Delivery' },
                                            { name: 'GPay', label: 'Google Pay' },
                                            { name: 'Card', label: 'Credit/Debit Card' }
                                        ].map((option) => (
                                            <motion.label
                                                key={option.name}
                                                className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/30 dark:bg-gray-200/30 hover:bg-cyan-500/20 dark:hover:bg-violet-500/20 transition-all duration-300 cursor-pointer"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <input
                                                    type="radio"
                                                    name="paymentOption"
                                                    value={option.name}
                                                    checked={paymentOption === option.name}
                                                    onChange={(e) => setPaymentOption(e.target.value)}
                                                    className="h-5 w-5 text-cyan-400 dark:text-violet-600 border-cyan-300/50 dark:border-violet-300/50 focus:ring-cyan-400/50 dark:focus:ring-violet-500/50 bg-gray-900/50 dark:bg-gray-200/50 rounded-full"
                                                />
                                                <span className="text-cyan-100 dark:text-violet-800">{option.label}</span>
                                            </motion.label>
                                        ))}
                                    </div>
                                </motion.div>
                                <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8 relative z-10">
                                    <motion.button
                                        className="px-6 py-2.5 bg-gradient-to-r from-gray-600/50 to-gray-800/50 dark:from-gray-400/50 dark:to-gray-600/50 text-white dark:text-gray-900 rounded-lg hover:from-gray-500 hover:to-gray-700 dark:hover:from-gray-300 dark:hover:to-gray-500 shadow-[0_0_10px_rgba(0,0,0,0.3)] dark:shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-all duration-300"
                                        onClick={handleCloseModal}
                                        whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(34,211,238,0.4)' }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        className="px-6 py-2.5 bg-gradient-to-r from-cyan-600/50 to-indigo-600/50 dark:from-cyan-500/50 dark:to-indigo-500/50 text-white dark:text-gray-900 rounded-lg hover:from-cyan-500 hover:to-indigo-500 dark:hover:from-cyan-400 dark:hover:to-indigo-400 shadow-[0_0_10px_rgba(34,211,238,0.3)] dark:shadow-[0_0_10px_rgba(139,92,246,0.2)] hover:shadow-[0_0_20px_rgba(34,211,238,0.7)] dark:hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300"
                                        type='submit'
                                        disabled={loading}
                                        whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(34,211,238,0.7)' }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {
                                            loading ? <span className="loading loading-spinner text-info"></span>
                                                : "Confirm Purchase"
                                        }
                                    </motion.button>
                                </div>
                            </form>
                        </div>
                        <div className="divider lg:divider-horizontal"></div>
                        <div className='lg:w-1/2'>
                            <div className='bg-gray-900/20 dark:bg-gray-200/20 p-4 rounded-lg'>
                                <img className='w-full max-h-48 object-contain' src={product?.image[0]} alt={`${product?.name}'s photo`} />
                                <h3 className='text-cyan-100 dark:text-violet-800 mt-4'>Product Name: {product?.name} X({quantity})</h3>
                                <div className="divider divider-primary"></div>
                                <p className='text-xl text-cyan-100 dark:text-violet-700 font-bold'>Total: {`${product?.price} x ${quantity} = ${product?.price * quantity}`}$</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PurchaseModal;