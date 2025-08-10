import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const CheckOutModal = ({ isOpen, onClose, cartItems, total, confirmPayment }) => {

    const [paymentMethod, setPaymentMethod] = useState('');

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
                        className="relative bg-[#1e1e2e] rounded-2xl border border-cyan-400/30 shadow-[0_0_30px_rgba(34,211,238,0.3)] max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        initial={{ y: 50, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 50, opacity: 0, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    >
                        {/* Glowing background elements */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            <motion.div
                                className="absolute w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl -top-20 -left-20"
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
                                className="absolute w-64 h-64 bg-violet-500/10 rounded-full filter blur-3xl -bottom-20 -right-20"
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
                                <h2 className="text-2xl font-bold text-cyan-100 orbitron">
                                    Order Confirmation
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="text-cyan-200 hover:text-cyan-100 transition-colors"
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
                                <h3 className="text-lg font-semibold text-cyan-200 mb-4 orbitron border-b border-cyan-400/30 pb-2">
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
                                                <div className="w-16 h-16 rounded-lg overflow-hidden border border-cyan-400/20">
                                                    <img
                                                        src={item.image?.[0]}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="text-cyan-100 font-medium">{item.name}</h4>
                                                    <p className="text-sm text-cyan-300">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <p className="text-cyan-100 font-medium">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Order totals */}
                            <motion.div
                                className="bg-[#2a2a3e]/50 rounded-xl p-4 mb-8"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-cyan-200">Subtotal</span>
                                        <span className="text-cyan-100">${total()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-cyan-200">Shipping</span>
                                        <span className="text-cyan-100">$0.00</span>
                                    </div>
                                    <div className="flex justify-between border-t border-cyan-400/20 pt-3 mt-3">
                                        <span className="text-cyan-100 font-bold">Total</span>
                                        <span className="text-cyan-50 font-bold text-lg">${total()}</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Payment form */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                <h3 className="text-lg font-semibold text-cyan-200 mb-4 orbitron border-b border-cyan-400/30 pb-2">
                                    Payment Method
                                </h3>
                                <div className="space-y-3">
                                    <motion.div
                                        className="flex items-center space-x-3 p-3 bg-[#2a2a3e]/50 rounded-lg border border-cyan-400/20 hover:border-cyan-400/40 transition-colors cursor-pointer"
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        onClick={() => setPaymentMethod('cash')}
                                    >
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === 'cash'
                                                ? 'border-cyan-400 bg-cyan-400/20'
                                                : 'border-cyan-400/40'
                                            }`}>
                                            {paymentMethod === 'cash' && (
                                                <motion.div
                                                    className="w-2 h-2 rounded-full bg-cyan-400"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ type: 'spring' }}
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="text-cyan-100 font-medium">Cash on Delivery</h4>
                                            <p className="text-sm text-cyan-300">Pay when you receive your order</p>
                                        </div>
                                    </motion.div>
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
                                    className="px-6 py-3 border border-cyan-400/30 text-cyan-100 rounded-lg font-medium hover:bg-cyan-900/20 transition-colors"
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    onClick={() => confirmPayment(cartItems, total, paymentMethod)}
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white rounded-lg font-bold orbitron shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all"
                                >
                                    Confirm Payment
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