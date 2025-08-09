import React from 'react';
import {motion} from 'motion/react';

const ProductLoader = () => {
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 p-8'>
            {[...Array(10)].map((_, index) => (
                <motion.div
                    key={index}
                    className="card bg-gradient-to-br from-gray-900/90 via-violet-950/90 to-cyan-900/90 backdrop-blur-md rounded-xl overflow-hidden border border-cyan-500/30"
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                            delay: index * 0.1,
                            duration: 0.6
                        }
                    }}
                >
                    {/* Animated image placeholder */}
                    <div className="px-6 pt-6 relative">
                        <motion.div
                            className="w-full h-30 rounded-lg bg-gradient-to-r from-gray-800 to-gray-700"
                            animate={{
                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: 'linear'
                            }}
                            style={{
                                backgroundSize: '200% 200%'
                            }}
                        />
                    </div>

                    {/* Content skeleton */}
                    <div className="card-body items-center text-center space-y-4">
                        {/* Title skeleton */}
                        <motion.div
                            className="w-3/4 h-6 rounded-full bg-gradient-to-r from-gray-700 to-gray-600"
                            animate={{
                                opacity: [0.7, 1, 0.7],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                        />

                        {/* Stock skeleton */}
                        <motion.div
                            className="w-1/2 h-4 rounded-full bg-gradient-to-r from-gray-700 to-gray-600"
                            animate={{
                                opacity: [0.7, 1, 0.7],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: 0.3
                            }}
                        />

                        {/* Price skeleton */}
                        <motion.div
                            className="w-1/3 h-5 rounded-full bg-gradient-to-r from-gray-700 to-gray-600"
                            animate={{
                                opacity: [0.7, 1, 0.7],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: 0.6
                            }}
                        />

                        {/* Rating skeleton */}
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-4 h-4 rounded-sm bg-gradient-to-r from-gray-700 to-gray-600"
                                    animate={{
                                        opacity: [0.4, 0.8, 0.4],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: i * 0.2
                                    }}
                                />
                            ))}
                        </div>

                        {/* Button skeleton */}
                        <motion.div
                            className="w-24 h-10 rounded-lg bg-gradient-to-r from-cyan-500/20 to-violet-500/20"
                            animate={{
                                boxShadow: [
                                    '0 0 8px rgba(34,211,238,0.1)',
                                    '0 0 12px rgba(139,92,246,0.3)',
                                    '0 0 8px rgba(34,211,238,0.1)'
                                ],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                        />
                    </div>

                    {/* Glowing particles */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <motion.div
                            className="absolute w-20 h-20 bg-cyan-500/10 rounded-full blur-xl"
                            animate={{
                                top: ['10%', '30%', '10%'],
                                left: ['10%', '20%', '10%'],
                                opacity: [0.1, 0.3, 0.1]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                        />
                        <motion.div
                            className="absolute w-24 h-24 bg-violet-500/10 rounded-full blur-xl"
                            animate={{
                                bottom: ['10%', '20%', '10%'],
                                right: ['10%', '25%', '10%'],
                                opacity: [0.1, 0.2, 0.1]
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: 1
                            }}
                        />
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default ProductLoader;