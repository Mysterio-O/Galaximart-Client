import React, { useEffect } from 'react';
import { motion, useAnimationControls } from 'motion/react';
import { Link } from 'react-router';
import { useInView } from 'react-intersection-observer';

const CategoryShape = ({ product, index }) => {
    // console.log(product)

    const controls = useAnimationControls();

    const { ref, inView } = useInView({
        threshold: 0.2, 
        rootMargin: '-100px 0px 0px 0px',
        triggerOnce: false,
    });

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
                delay: index * 0.1
            }
        },
        exit: {
            opacity: 0,
            y: -50,
            transition: { duration: 0.4, ease: 'easeIn' }
        },
        hover: { scale: 1.05, boxShadow: '0 0 20px rgba(124, 58, 237, 0.5)' },
        tap: { scale: 0.95 },
    };

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        } else {
            controls.start('exit');
        }
    }, [inView, controls]);

    return (
        <Link to={`/products/${product.category}`}>
            <motion.div
                ref={ref}
                animate={controls}
                variants={cardVariants}
                whileHover="hover"
                whileTap="tap"
                className="relative bg-gray-900/80 backdrop-blur-md rounded-lg p-6 border border-cyan-500/30 shadow-[0_0_10px_rgba(139,92,246,0.3)] overflow-hidden"
            >
                {/* Particle Effect */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute w-24 h-24 bg-cyan-500/20 rounded-full filter blur-xl animate-pulse opacity-30 top-[-20px] left-[-20px]"></div>
                    <div className="absolute w-32 h-32 bg-magenta-500/20 rounded-full filter blur-xl animate-pulse-slow opacity-30 bottom-[-30px] right-[-30px]"></div>
                </div>

                {/* Category Name */}
                <h3 className="relative z-10 text-lg font-bold text-white text-center bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500 orbitron">
                    {product.category}
                </h3>

                {/* Hover Overlay */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                />
            </motion.div>
        </Link>
    );
};

export default CategoryShape;