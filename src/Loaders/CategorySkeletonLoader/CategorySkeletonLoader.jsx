import React from 'react';
import {motion} from 'motion/react'

const CategorySkeletonLoader = () => {

    const skeletonItems = Array(6).fill(0);

    return (
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
            {skeletonItems.map((_, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                            delay: index * 0.1,
                            duration: 0.5
                        }
                    }}
                    className="relative bg-gray-900/80 backdrop-blur-md rounded-lg p-6 border border-cyan-500/30 overflow-hidden"
                >
                    {/* Animated gradient background */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-gray-800/50 via-gray-700/50 to-gray-800/50"
                        animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'linear'
                        }}
                        style={{
                            backgroundSize: '200% 200%'
                        }}
                    />
                    
                    {/* Pulsing content */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full">
                        <div className="w-3/4 h-6 mb-3 bg-gray-700/50 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-cyan-400/20 to-violet-500/20"
                                animate={{
                                    x: [-100, 100],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: 'easeInOut'
                                }}
                            />
                        </div>
                        <div className="w-1/2 h-4 bg-gray-700/30 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-cyan-400/10 to-violet-500/10"
                                animate={{
                                    x: [-100, 100],
                                }}
                                transition={{
                                    duration: 1.8,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                    delay: 0.3
                                }}
                            />
                        </div>
                    </div>
                    
                    {/* Glowing particles */}
                    <div className="absolute inset-0 pointer-events-none">
                        <motion.div
                            className="absolute w-24 h-24 bg-cyan-500/20 rounded-full filter blur-xl"
                            animate={{
                                opacity: [0.2, 0.4, 0.2],
                                top: ['-20px', '-10px', '-20px'],
                                left: ['-20px', '-30px', '-20px']
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                        />
                        <motion.div
                            className="absolute w-32 h-32 bg-violet-500/20 rounded-full filter blur-xl"
                            animate={{
                                opacity: [0.2, 0.3, 0.2],
                                bottom: ['-30px', '-20px', '-30px'],
                                right: ['-30px', '-40px', '-30px']
                            }}
                            transition={{
                                duration: 4,
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

export default CategorySkeletonLoader;