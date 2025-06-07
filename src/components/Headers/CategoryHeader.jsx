import React from 'react';
import { motion } from 'motion/react';

const CategoryHeader = () => {
    const headerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' },
        },
    };

    return (
        <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center orbitron bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500 text-transparent py-4 mb-8 relative"
            initial="hidden"
            animate="visible"
            variants={headerVariants}
        >
            Explore Our Cosmic Collections
            {/* Neon Underline */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-cyan-400 to-violet-500 shadow-[0_0_10px_rgba(34,211,238,0.5)] rounded-full" />
        </motion.h2>
    );
};

export default CategoryHeader;