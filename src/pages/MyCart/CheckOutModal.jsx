import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Swal from 'sweetalert2';

const CheckOutModal = ({ isOpen, onClose, cartItems, total, confirmPayment, paymentLoading }) => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [address, setAddress] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [errors, setErrors] = useState({ address: '', mobileNumber: '' });

    const validateInputs = () => {
        let isValid = true;
        const newErrors = { address: '', mobileNumber: '' };

        if (!address.trim()) {
            newErrors.address = 'Address is required';
            isValid = false;
        }
        if (!mobileNumber.trim()) {
            newErrors.mobileNumber = 'Mobile number is required';
            isValid = false;
        } else if (!/^\+?\d{10,15}$/.test(mobileNumber)) {
            newErrors.mobileNumber = 'Invalid mobile number';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleConfirmPayment = () => {
        if (!paymentMethod) {
            Swal.fire({
                title: 'Error!',
                text: 'Please select a payment method.',
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

        if (!validateInputs()) {
            return;
        }

        confirmPayment(cartItems, total, paymentMethod, { address, mobileNumber });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="relative bg-gray-900/90 dark:bg-gray-100/90 rounded-2xl border border-cyan-400/30 dark:border-violet-400/30 shadow-[0_0_30px_rgba(34,211,238,0.3)] dark:shadow-[0_0_30px_rgba(34,211,238,0.2)] max-w-2xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-md"
                        initial={{ y: 50, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 50, opacity: 0, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    >
                        {/* Glowing background elements */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <motion.div
                                className="absolute w-64 h-64 bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full filter blur-3xl -top-20 -left-20"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.1, 0.2, 0.1]
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: 'easeInOut'
                                }}
                            />
                            <motion.div
                                className="absolute w-64 h-64 bg-violet-500/10 dark:bg-violet-500/5 rounded-full filter blur-3xl -bottom-20 -right-20"
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.1, 0.15, 0.1]
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                    delay: 1
                                }}
                            />
                        </div>

                        {/* Modal content */}
                        <div className="relative z-10 p-8">
                            {/* Header */}
                            <motion.div
                                className="flex justify-between items-start mb-6"
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <h2 className="text-2xl font-bold text-gray-100 dark:text-gray-800 orbitron">
                                    Order Confirmation
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="text-gray-300 dark:text-gray-600 hover:text-gray-100 dark:hover:text-gray-800 transition-colors"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </button>
                            </motion.div>

                            {/* Order summary */}
                            <motion.div
                                className="mb-8"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <h3 className="text-lg font-semibold text-gray-300 dark:text-gray-600 mb-4 orbitron border-b border-cyan-400/20 dark:border-violet-400/20 pb-2">
                                    Your Order
                                </h3>
                                <div className="space-y-4">
                                    {cartItems.map((item, index) => (
                                        <motion.div
                                            key={item._id}
                                            className="flex justify-between items-center"
                                            initial={{ x: -20, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: 0.4 + index * 0.05 }}
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className="w-16 h-16 rounded-lg overflow-hidden border border-cyan-400/20 dark:border-violet-400/20">
                                                    <img
                                                        src={item.image?.[0]}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="text-gray-100 dark:text-gray-800 font-medium">{item.name}</h4>
                                                    <p className="text-sm text-gray-300 dark:text-gray-600">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <p className="text-gray-100 dark:text-gray-800 font-medium">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Order totals */}
                            <motion.div
                                className="bg-gray-800/50 dark:bg-gray-200/50 rounded-xl p-4 mb-8"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-300 dark:text-gray-600">Subtotal</span>
                                        <span className="text-gray-100 dark:text-gray-800">${total()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300 dark:text-gray-600">Shipping</span>
                                        <span className="text-gray-100 dark:text-gray-800">$0.00</span>
                                    </div>
                                    <div className="flex justify-between border-t border-cyan-300/20 dark:border-violet-300/20 pt-3 mt-3">
                                        <span className="text-gray-100 dark:text-gray-800 font-bold">Total</span>
                                        <span className="text-gray-50 dark:text-gray-900 font-bold text-lg">${total()}</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Payment and shipping form */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                <h3 className="text-lg font-semibold text-gray-300 dark:text-gray-600 mb-4 orbitron border-b border-cyan-400/20 dark:border-violet-400/20 pb-2">
                                    Shipping & Payment Details
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-gray-300 dark:text-gray-600 mb-2 orbitron">Address</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your shipping address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className={`w-full p-3 bg-gray-800/50 dark:bg-gray-200/50 text-gray-100 dark:text-gray-800 rounded-lg border ${errors.address ? 'border-red-500/50' : 'border-cyan-400/30 dark:border-violet-400/30'} focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-violet-500`}
                                        />
                                        {errors.address && (
                                            <p className="text-red-400 dark:text-red-500 text-sm mt-1">{errors.address}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-gray-300 dark:text-gray-600 mb-2 orbitron">Mobile Number</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your mobile number"
                                            value={mobileNumber}
                                            onChange={(e) => setMobileNumber(e.target.value)}
                                            className={`w-full p-3 bg-gray-800/50 dark:bg-gray-200/50 text-gray-100 dark:text-gray-800 rounded-lg border ${errors.mobileNumber ? 'border-red-500/50' : 'border-cyan-400/30 dark:border-violet-400/30'} focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-violet-500`}
                                        />
                                        {errors.mobileNumber && (
                                            <p className="text-red-400 dark:text-red-500 text-sm mt-1">{errors.mobileNumber}</p>
                                        )}
                                    </div>
                                    <div className="mt-6">
                                        <h4 className="text-gray-300 dark:text-gray-600 mb-2 orbitron">Payment Method</h4>
                                        <motion.div
                                            className="flex items-center space-x-3 p-3 bg-gray-800/50 dark:bg-gray-200/50 rounded-lg border border-cyan-400/20 dark:border-violet-400/20 hover:border-cyan-400/40 dark:hover:border-violet-400/40 transition-colors cursor-pointer"
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            onClick={() => setPaymentMethod('cash')}
                                        >
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'cash'
                                                ? 'border-cyan-400 dark:border-violet-400 bg-cyan-400/20 dark:bg-violet-400/20'
                                                : 'border-cyan-400/40 dark:border-violet-400/40'
                                                }`}>
                                                {paymentMethod === 'cash' && (
                                                    <motion.div
                                                        className="w-2 h-2 rounded-full bg-cyan-400 dark:bg-violet-400"
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ type: 'spring' }}
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="text-gray-100 dark:text-gray-800 font-medium">Cash on Delivery</h4>
                                                <p className="text-sm text-gray-300 dark:text-gray-600">Pay when you receive your order</p>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Actions */}
                            <motion.div
                                className="flex justify-end space-x-4 mt-8"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.7 }}
                            >
                                <motion.button
                                    onClick={onClose}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="px-6 py-3 border border-cyan-400/30 dark:border-violet-400/30 text-gray-100 dark:text-gray-800 rounded-lg font-medium hover:bg-cyan-900/20 dark:hover:bg-violet-900/20 transition-colors"
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    onClick={handleConfirmPayment}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="px-6 py-3 bg-gradient-to-r from-cyan-600/50 to-indigo-600/50 dark:from-cyan-400/50 dark:to-indigo-400/50 text-gray-100 dark:text-gray-800 rounded-lg font-bold orbitron shadow-[0_0_15px_rgba(34,211,238,0.3)] dark:shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] dark:hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all"
                                >
                                    {
                                        paymentLoading ? <span className="loading loading-spinner text-info"></span>
                                            : 'Confirm Payment'
                                    }
                                </motion.button>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CheckOutModal;