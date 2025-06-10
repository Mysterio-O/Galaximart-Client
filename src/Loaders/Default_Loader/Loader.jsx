import React from 'react';
import { motion } from 'motion/react';

const Loader = () => {
    const ringVariants = {
        animate: {
            rotate: 360,
            transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
            },
        },
    };

    const pulseVariants = {
        animate: {
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
            },
        },
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-gray-900/95 backdrop-blur-md z-50"
            role="status"
            aria-label="Loading GalaxiMart content"
        >
            <div className="relative w-16 h-16 md:w-20 md:h-20">
                {/* Outer Ring */}
                <motion.div
                    className="absolute inset-0 rounded-full border-4 border-t-cyan-400 border-r-violet-500 border-b-cyan-400 border-l-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.6)]"
                    variants={ringVariants}
                    animate="animate"
                />
                {/* Inner Pulsing Circle */}
                <motion.div
                    className="absolute inset-2 rounded-full bg-gradient-to-r from-cyan-500/30 to-violet-500/30 shadow-[0_0_10px_rgba(34,211,238,0.4)]"
                    variants={pulseVariants}
                    animate="animate"
                />
                {/* Centered Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs md:text-sm font-semibold text-gray-100 tracking-wide uppercase opacity-80">
                        GalaxiMart
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Loader;