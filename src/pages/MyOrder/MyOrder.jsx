import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';
import { motion } from 'motion/react';
import { FaBoxOpen, FaBox, FaShippingFast, FaCheckCircle } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Swal from 'sweetalert2';

const MyOrder = () => {

    const { user, loading } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {

        if (!user || loading) return;

        const fetchItems = async () => {
            setIsFetching(true);
            setError(null);

            try {
                const res = await axios.get(`http://localhost:3000/my-ordered-items?email=${user?.email}`);
                setOrders(res.data);
            }
            catch (err) {
                setError(err?.message);
            }
            finally {
                setIsFetching(false);
            }

        }
        fetchItems();

    }, [user, loading]);

    // console.log(orders);

    const getStatusIcon = (status) => {
        switch (status) {
            case 'processing':
                return <FaBox className="text-yellow-400 dark:text-yellow-500" />;
            case 'shipped':
                return <FaShippingFast className="text-blue-400 dark:text-blue-500" />;
            case 'delivered':
                return <FaCheckCircle className="text-green-400 dark:text-green-500" />;
            default:
                return <FaBoxOpen className="text-gray-400 dark:text-gray-500" />;
        }
    }


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const handleDeleteOrder = async (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure to delete order?',
            icon: 'warning',
            confirmButtonText: 'Delete',
            showCancelButton: true,
            cancelButtonText: "Cancel",
            customClass: {
                container: 'swal-dark',
                popup: 'swal-dark',
                title: 'swal-title',
                htmlContainer: 'swal-text',
                confirmButton: 'swal-cancel-button',
                cancelButton: 'swal-confirm-button',
                actions: 'flex gap-4',
            },
            buttonsStyling: false
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axios.delete(`http://localhost:3000/delete-my-orders?id=${id}`);
                console.log(res);
                if (res?.data?.deletedCount > 0) {

                    Swal.fire({
                        title: 'Order Deleted!',
                        text: 'Your order was deleted.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        customClass: {
                            container: 'swal-dark',
                            popup: 'swal-dark',
                            title: 'swal-title',
                            htmlContainer: 'swal-text',
                            confirmButton: 'swal-confirm-button',
                        },
                        buttonsStyling: false
                    });

                    setOrders([]);
                }
            }
        })



    }


    if (isFetching) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-5xl">
                <div className="bg-gray-800/50 dark:bg-gray-200/50 h-10 w-1/3 rounded mb-8 animate-pulse"></div>
                <div className="space-y-6">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="bg-gray-900/90 dark:bg-gray-100/90 rounded-xl border border-cyan-500/30 dark:border-violet-500/30 p-6 animate-pulse">
                            <div className="flex justify-between items-start mb-4">
                                <div className="space-y-2">
                                    <div className="bg-gray-800/50 dark:bg-gray-200/50 h-6 w-32 rounded"></div>
                                    <div className="bg-gray-800/50 dark:bg-gray-200/50 h-4 w-24 rounded"></div>
                                </div>
                                <div className="space-y-2 text-right">
                                    <div className="bg-gray-800/50 dark:bg-gray-200/50 h-6 w-20 rounded"></div>
                                    <div className="bg-gray-800/50 dark:bg-gray-200/50 h-4 w-16 rounded"></div>
                                </div>
                            </div>
                            <div className="border-t border-cyan-500/20 dark:border-violet-500/20 pt-4 mt-4">
                                <div className="bg-gray-800/50 dark:bg-gray-200/50 h-6 w-24 rounded mb-3"></div>
                                <div className="space-y-4">
                                    {[...Array(2)].map((_, i) => (
                                        <div key={i} className="flex justify-between items-center bg-gray-800/50 dark:bg-gray-200/50 rounded-lg p-3">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-16 h-16 bg-gray-700/50 dark:bg-gray-300/50 rounded-lg"></div>
                                                <div className="space-y-2">
                                                    <div className="bg-gray-800/50 dark:bg-gray-200/50 h-4 w-32 rounded"></div>
                                                    <div className="bg-gray-800/50 dark:bg-gray-200/50 h-3 w-20 rounded"></div>
                                                </div>
                                            </div>
                                            <div className="space-y-2 text-right">
                                                <div className="bg-gray-800/50 dark:bg-gray-200/50 h-4 w-16 rounded"></div>
                                                <div className="bg-gray-800/50 dark:bg-gray-200/50 h-3 w-24 rounded"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-between items-center mt-6 pt-4 border-t border-cyan-500/20 dark:border-violet-500/20">
                                <div className="bg-gray-800/50 dark:bg-gray-200/50 h-4 w-48 rounded"></div>
                                <div className="bg-gray-800/50 dark:bg-gray-200/50 h-8 w-32 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };


    if (error) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-5xl text-center">
                <div className="bg-red-900/20 dark:bg-red-500/10 border border-red-500/50 dark:border-red-500/30 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-red-400 dark:text-red-500 mb-2">Error Loading Orders</h2>
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
    };



    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <motion.h1
                className="text-2xl md:text-3xl font-bold text-gray-100 dark:text-gray-800 mb-8 flex items-center gap-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <FaBoxOpen className="text-cyan-400 dark:text-cyan-500" />
                My Order History
            </motion.h1>

            {orders.length === 0 ? (
                <motion.div
                    className="flex flex-col items-center justify-center min-h-[50vh] text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="w-32 h-32 bg-cyan-900/20 dark:bg-cyan-700/20 rounded-full flex items-center justify-center mb-6">
                        <FaBoxOpen className="text-cyan-400 dark:text-cyan-500 text-5xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-100 dark:text-gray-800 mb-2">No Orders Found</h2>
                    <p className="text-gray-300 dark:text-gray-600 max-w-md">
                        You haven't placed any orders yet. Start shopping to see your order history here.
                    </p>
                </motion.div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <motion.div
                            key={order._id}
                            className="bg-gray-900/90 dark:bg-gray-100/90 rounded-xl overflow-hidden border border-cyan-500/30 dark:border-violet-500/30 shadow-[0_0_15px_rgba(34,211,238,0.3)] dark:shadow-[0_0_15px_rgba(34,211,238,0.2)] backdrop-blur-md"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(34,211,238,0.2)' }}
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-100 dark:text-gray-800 flex items-center gap-2">
                                            {getStatusIcon(order.purchaseDetails.deliveryStatus)}
                                            Order #{order._id.toString().slice(-6).toUpperCase()}
                                        </h2>
                                        <p className="text-gray-300 dark:text-gray-600 text-sm mt-1">
                                            {formatDate(order.purchaseDetails.orderedDate)}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-gray-100 dark:text-gray-800">
                                            ${order.purchaseDetails.totalAmount.toFixed(2)}
                                        </p>
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mt-1 ${order.purchaseDetails.deliveryStatus === 'processing'
                                            ? 'bg-yellow-500/20 dark:bg-yellow-500/10 text-yellow-400 dark:text-yellow-500'
                                            : order.purchaseDetails.deliveryStatus === 'shipped'
                                                ? 'bg-blue-500/20 dark:bg-blue-500/10 text-blue-400 dark:text-blue-500'
                                                : 'bg-green-500/20 dark:bg-green-500/10 text-green-400 dark:text-green-500'
                                            }`}>
                                            {order.purchaseDetails.deliveryStatus}
                                        </span>
                                    </div>
                                </div>

                                <div className="border-t border-cyan-500/20 dark:border-violet-500/20 pt-4 mt-4">
                                    <h3 className="text-lg font-semibold text-gray-300 dark:text-gray-600 mb-3">
                                        Items ({order.purchaseDetails.items.length})
                                    </h3>
                                    <div className="space-y-4">
                                        {order.purchaseDetails.items.map((item, index) => (
                                            <motion.div
                                                key={index}
                                                className="flex justify-between items-center bg-gray-800/50 dark:bg-gray-200/50 rounded-lg p-3"
                                                whileHover={{ scale: 1.01 }}
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-16 h-16 rounded-lg object-cover border border-cyan-500/20 dark:border-violet-500/20"
                                                        onError={(e) => {
                                                            e.target.src = 'https://via.placeholder.com/100?text=Image+Error';
                                                        }}
                                                    />
                                                    <div>
                                                        <h4 className="text-gray-100 dark:text-gray-800 font-medium">{item.name}</h4>
                                                        <p className="text-gray-300 dark:text-gray-600 text-sm">{item.brand}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-gray-100 dark:text-gray-800">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </p>
                                                    <p className="text-gray-300 dark:text-gray-600 text-sm">
                                                        {item.quantity} × ${item.price.toFixed(2)}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mt-6 pt-4 border-t border-cyan-500/20 dark:border-violet-500/20">
                                    <p className="text-gray-300 dark:text-gray-600 text-sm">
                                        Transaction ID: {order.purchaseDetails.transactionId}
                                    </p>
                                    <motion.button
                                        className="flex items-center gap-2 px-4 py-2 bg-red-600/20 dark:bg-red-500/20 hover:bg-red-600/30 dark:hover:bg-red-500/30 text-red-400 dark:text-red-500 rounded-lg text-sm transition-colors cursor-pointer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleDeleteOrder(order._id)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            />
                                        </svg>
                                        Delete Order
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrder;