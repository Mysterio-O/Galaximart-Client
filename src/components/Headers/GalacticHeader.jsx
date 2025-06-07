import React from 'react';
import { motion } from 'framer-motion';

const GalacticHeader = () => {
    const text = 'Shop the Galactic Frontier';
    const characters = text.split('');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const characterVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
    };

    return (
        <motion.div
            className="text-center py-4 bg-gray-900/50"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold orbitron bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500 text-transparent inline-block text-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                {characters.map((char, index) => (
                    <motion.span
                        key={`${char}-${index}`}
                        variants={characterVariants}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                ))}
            </h1>
        </motion.div>
    );
};

export default GalacticHeader;