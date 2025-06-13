import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { IoRocketOutline } from 'react-icons/io5';

const ErrorPage = ({ errorCode = '404', message = 'Oops, Something Went Wrong!' }) => {
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
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-[#1a1a2e] min-h-screen flex items-center justify-center relative overflow-hidden px-4"
        >
            {/* Glowing background effect */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute w-[500px] h-[500px] bg-cyan-500/30 rounded-full filter blur-3xl opacity-30 top-[-150px] left-[-150px] animate-pulse-slow"></div>
                <div className="absolute w-[500px] h-[500px] bg-indigo-500/30 rounded-full filter blur-3xl opacity-30 bottom-[-150px] right-[-150px] animate-pulse-slow"></div>
                <div className="absolute w-[300px] h-[300px] bg-cyan-400/20 rounded-full filter blur-2xl opacity-20 top-[50%] left-[20%] animate-pulse-slow delay-1000"></div>
                <div className="absolute w-[300px] h-[300px] bg-indigo-400/20 rounded-full filter blur-2xl opacity-20 top-[30%] right-[30%] animate-pulse-slow delay-2000"></div>
            </div>

            <div className="relative z-10 text-center max-w-2xl mx-auto">
                <motion.div
                    variants={containerVariants}
                    initial="initial"
                    animate="animate"
                    className="flex flex-col items-center"
                >
                    {/* Error Code */}
                    <motion.div
                        variants={itemVariants}
                        className="text-7xl md:text-9xl font-bold text-cyan-100 orbitron mb-4"
                    >
                        {errorCode}
                    </motion.div>

                    {/* Icon */}
                    <motion.div
                        variants={itemVariants}
                        className="text-cyan-200 mb-6"
                        animate={{ y: [0, -10, 0], transition: { duration: 2, repeat: Infinity } }}
                    >
                        <IoRocketOutline size={60} />
                    </motion.div>

                    {/* Message */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-bold text-cyan-100 orbitron mb-4"
                    >
                        {message}
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        variants={itemVariants}
                        className="text-lg text-cyan-200 orbitron mb-8"
                    >
                        Looks like you’ve ventured into uncharted space. Let’s get you back to GalaxyMart!
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div variants={itemVariants}>
                        <Link to="/">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(34,211,238,0.7)' }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600/50 to-indigo-600/50 text-white rounded-xl orbitron font-semibold shadow-[0_0_10px_rgba(34,211,238,0.3)] hover:from-cyan-500 hover:to-indigo-500"
                            >
                                <IoRocketOutline size={24} />
                                Back to Home
                            </motion.button>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default ErrorPage;