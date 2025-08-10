import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { IoMdAddCircleOutline } from 'react-icons/io';

const EmptyPage = () => {
    const containerVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: { duration: 0.5, staggerChildren: 0.2 },
        },
    };

    const itemVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center justify-center min-h-[60vh] text-center relative"
        >
            {/* Glowing orb effect */}
            <motion.div
                className="absolute w-64 h-20 bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full filter blur-3xl opacity-30"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold text-gray-100 dark:text-gray-800 mb-4 orbitron">
                    No Products Found
                </h2>
            </motion.div>
            <motion.p
                variants={itemVariants}
                className="text-lg text-gray-300 dark:text-gray-600 mb-8 orbitron max-w-md"
            >
                Your product list is empty. Start adding your amazing products to GalaxyMart!
            </motion.p>
            <motion.div variants={itemVariants}>
                <Link to="/add-product">
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(34,211,238,0.7)' }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600/50 to-indigo-600/50 dark:from-cyan-400/50 dark:to-indigo-400/50 text-gray-100 dark:text-gray-800 rounded-xl orbitron font-semibold shadow-[0_0_10px_rgba(34,211,238,0.3)] dark:shadow-[0_0_10px_rgba(34,211,238,0.2)] hover:from-cyan-500 hover:to-indigo-500 dark:hover:from-cyan-400 dark:hover:to-indigo-400 cursor-pointer"
                    >
                        <IoMdAddCircleOutline size={24} />
                        Add Your First Product
                    </motion.button>
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default EmptyPage;