import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { FaBox, FaShippingFast, FaCheckCircle, FaTimes } from 'react-icons/fa';

const OrderTrackingWidget = () => {
    const { user } = useContext(AuthContext);
    const [transactionId, setTransactionId] = useState('');
    const [order, setOrder] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

    const statusSteps = [
        { status: 'processing', icon: <FaBox className="text-yellow-400 dark:text-yellow-500" />, label: 'Processing' },
        { status: 'shipped', icon: <FaShippingFast className="text-blue-400 dark:text-blue-500" />, label: 'Shipped' },
        { status: 'delivered', icon: <FaCheckCircle className="text-green-400 dark:text-green-500" />, label: 'Delivered' },
    ];

    const handleTrackOrder = async (e) => {
        e.preventDefault();
        if (!user) {
            Swal.fire({
                title: 'Error!',
                text: 'Please log in to track an order.',
                icon: 'error',
                customClass: {
                    popup: 'swal-dark',
                    title: 'swal-title',
                    htmlContainer: 'swal-text',
                    confirmButton: 'swal-confirm-button'
                },
                buttonsStyling: false
            });
            return;
        }
        if (!transactionId) {
            Swal.fire({
                title: 'Error!',
                text: 'Please enter a valid transaction ID.',
                icon: 'error',
                customClass: {
                    popup: 'swal-dark',
                    title: 'swal-title',
                    htmlContainer: 'swal-text',
                    confirmButton: 'swal-confirm-button'
                },
                buttonsStyling: false
            });
            return;
        }

        setIsFetching(true);
        setError(null);
        try {
            const res = await axios.get(`https://galaxia-mart-server.vercel.app/track-order?transactionId=${transactionId}&email=${user.email}`, {
                headers: {
                    authorization: `Bearer ${user?.accessToken}`
                }
            });
            setOrder(res.data);
        } catch (err) {
            setError(err.message);
            Swal.fire({
                title: 'Error!',
                text: err.message || 'Order not found.',
                icon: 'error',
                customClass: {
                    popup: 'swal-dark',
                    title: 'swal-title',
                    htmlContainer: 'swal-text',
                    confirmButton: 'swal-confirm-button'
                },
                buttonsStyling: false
            });
        } finally {
            setIsFetching(false);
        }
    };

    const handleClear = () => {
        setTransactionId('');
        setOrder(null);
        setError(null);
    };

    const widgetVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
        hover: { boxShadow: '0 0 20px rgba(34,211,238,0.5)' }
    };

    const stepVariants = {
        active: { scale: 1.1, opacity: 1, transition: { duration: 0.3 } },
        inactive: { scale: 0.9, opacity: 0.5, transition: { duration: 0.3 } }
    };

    return (
        <motion.div
            variants={widgetVariants}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            className="bg-gray-900/90 dark:bg-gray-100/90 rounded-xl border border-cyan-500/30 dark:border-violet-500/30 p-6 max-w-3xl mx-auto mb-20 relative overflow-hidden"
        >
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute w-64 h-64 bg-cyan-500/25 dark:bg-cyan-500/15 rounded-full filter blur-3xl opacity-20 top-[-50px] left-[-50px]"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />
            </div>
            <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-100 dark:text-gray-800 mb-4 orbitron">Track Your Order</h3>
                <form onSubmit={handleTrackOrder} className="mb-4">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Enter Transaction ID"
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            className="flex-1 p-2 bg-gray-800/50 dark:bg-gray-200/50 text-gray-100 dark:text-gray-800 rounded-lg border border-cyan-400/30 dark:border-violet-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-violet-500"
                        />
                        <motion.button
                            type="submit"
                            disabled={isFetching}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-gradient-to-r from-cyan-600/50 to-indigo-600/50 dark:from-cyan-400/50 dark:to-indigo-400/50 text-gray-100 dark:text-gray-800 rounded-lg font-medium orbitron disabled:opacity-50"
                        >
                            Track
                        </motion.button>
                        <motion.button
                            type="button"
                            onClick={handleClear}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-gradient-to-r from-red-600/50 to-red-800/50 dark:from-red-400/50 dark:to-red-600/50 text-gray-100 dark:text-gray-800 rounded-lg font-medium orbitron"
                        >
                            <FaTimes />
                        </motion.button>
                    </div>
                </form>
                {isFetching ? (
                    <div className="animate-pulse">
                        <div className="bg-gray-800/50 dark:bg-gray-200/50 h-4 w-3/4 rounded mb-2"></div>
                        <div className="flex justify-between gap-2">
                            {statusSteps.map((_, index) => (
                                <div key={index} className="bg-gray-800/50 dark:bg-gray-200/50 h-12 w-12 rounded-full"></div>
                            ))}
                        </div>
                    </div>
                ) : error ? (
                    <p className="text-red-400 dark:text-red-500 text-center">{error}</p>
                ) : order ? (
                    <div>
                        <p className="text-gray-100 dark:text-gray-800 mb-2">
                            Transaction #{order.purchaseDetails.transactionId} - {order.purchaseDetails.deliveryStatus}
                        </p>
                        <div className="flex justify-between items-center gap-2">
                            {statusSteps.map((step, index) => (
                                <motion.div
                                    key={step.status}
                                    variants={stepVariants}
                                    animate={
                                        statusSteps.findIndex(s => s.status === order.purchaseDetails.deliveryStatus) >= index
                                            ? 'active'
                                            : 'inactive'
                                    }
                                    className="flex flex-col items-center"
                                >
                                    <div className="text-2xl">{step.icon}</div>
                                    <span className="text-xs text-gray-300 dark:text-gray-600 mt-1">{step.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-300 dark:text-gray-600 text-center">Enter a transaction ID to track its status.</p>
                )}
            </div>
        </motion.div>
    );
};

export default OrderTrackingWidget;