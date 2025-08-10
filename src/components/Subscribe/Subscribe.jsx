import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'motion/react';
import Swal from 'sweetalert2';

const Subscribe = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        setError(null);
console.log('clicked');
        if (!email) {
            setError('Please enter an email address.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await axios.post('https://galaxia-mart-server.vercel.app/subscribe', { email });
            console.log(res);
            Swal.fire({
                title: 'Success!',
                text: 'You have successfully subscribed to GalaxiaMart updates!',
                icon: 'success',
                customClass: {
                    popup: 'swal-dark',
                    title: 'swal-title',
                    htmlContainer: 'swal-text',
                    confirmButton: 'swal-confirm-button'
                },
                buttonsStyling: false
            });
            setEmail('');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to subscribe. Please try again.');
            Swal.fire({
                title: 'Error!',
                text: err.response?.data?.error || 'Failed to subscribe. Please try again.',
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
            setIsSubmitting(false);
        }
    };

    const formVariants = {
        hidden: { opacity: 0, y: -30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };

    const inputVariants = {
        focus: { scale: 1.03, borderColor: 'rgba(34,211,238,1)', boxShadow: '0 0 15px rgba(34,211,238,0.5)', transition: { duration: 0.3 } },
        blur: { scale: 1, borderColor: 'rgba(34,211,238,0.3)', boxShadow: 'none', transition: { duration: 0.3 } }
    };

    const buttonVariants = {
        hover: { scale: 1.1, boxShadow: '0 0 20px rgba(34,211,238,0.7)', backgroundImage: 'linear-gradient(to right, rgba(34,211,238,0.8), rgba(79,70,229,0.8))' },
        tap: { scale: 0.95 }
    };

    return (
        <motion.div
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            className="relative bg-gray-900/95 dark:bg-gray-100/95 max-w-7xl mx-auto py-16 rounded-2xl px-4 mb-20 sm:px-8 border-t border-b border-cyan-500/50 dark:border-violet-500/50 overflow-hidden"
        >
            <div className="relative z-10 max-w-6xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-100 dark:text-gray-800 orbitron mb-2 text-center">Join the GalaxiMart Universe</h3>
                <p className="text-sm text-gray-300 dark:text-gray-600 mb-4 text-center">Subscribe for exclusive B2B deals, restock alerts, and cosmic updates!</p>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 items-center">
                    <motion.input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        whileFocus="focus"
                        variants={inputVariants}
                        className="w-full sm:flex-1 p-4 bg-gray-800/60 dark:bg-gray-200/60 text-gray-100 dark:text-gray-800 rounded-lg border border-cyan-400/50 dark:border-violet-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-violet-500 text-base"
                        disabled={isSubmitting}
                        aria-label="Email for subscription"
                    />
                    <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="w-full sm:w-48 px-6 py-4 bg-gradient-to-r from-cyan-600/70 to-indigo-600/70 dark:from-cyan-400/70 dark:to-indigo-400/70 text-gray-100 dark:text-gray-800 rounded-lg font-bold orbitron text-base disabled:opacity-50"
                    >
                        Subscribe Now
                    </motion.button>
                </form>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 dark:text-red-500 text-sm mt-3 text-center"
                    >
                        {error}
                    </motion.p>
                )}
            </div>
        </motion.div>
    );
};

export default Subscribe;