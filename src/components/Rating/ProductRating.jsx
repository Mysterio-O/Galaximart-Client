import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { motion } from 'framer-motion';

const ProductRating = ({ rating = 4, size = 30, edit = false }) => {
    const ratingConfig = {
        size: size, // Star size in pixels
        value: rating, // Rating value (e.g., 4 out of 5)
        edit: edit, // Disable interaction if false
        isHalf: true, // Allow half-star ratings
        color: 'rgba(255, 255, 255, 0.3)', // Inactive star color (light gray for dark theme)
        activeColor: '#22D3EE', // Active star color (cyan to match GalaxiMart theme)
        classNames: 'flex justify-center items-center', // Tailwind classes for centering
    };

    return (
        <motion.div
            className="flex justify-center items-center p-2 bg-gradient-to-r from-gray-900/50 to-violet-950/50 rounded-lg shadow-[0_0_8px_rgba(34,211,238,0.3)]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            role="img"
            aria-label={`Product rating: ${rating} out of 5 stars`}
        >
            {ReactStars ? (
                <ReactStars {...ratingConfig} />
            ) : (
                <p className="text-gray-400 text-sm">Rating component failed to load</p>
            )}
        </motion.div>
    );
};

export default ProductRating;
