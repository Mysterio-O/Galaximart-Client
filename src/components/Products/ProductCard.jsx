import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';

const ProductCard = ({ products }) => {
    return (
        <>
            {products.map((product, index) => (
                <motion.div
                    key={product?.id}
                    className="card bg-gradient-to-br from-gray-900/90 via-violet-950/90 to-cyan-900/90 backdrop-blur-md shadow-[0_0_15px_rgba(139,92,246,0.3)] rounded-xl overflow-hidden border border-cyan-500/30"
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
                    whileHover={{
                        scale: 1.05,
                        y: -10,
                        boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)',
                        transition: { duration: 0.3, ease: 'easeOut' },
                    }}
                >
                    <figure className="px-6 pt-6">
                        <img
                            src={product?.image}
                            alt={`${product?.name}'s photo`}
                            className="rounded-lg object-cover w-full h-48 transition-all duration-300 group-hover:brightness-110"
                        />
                    </figure>
                    <div className="card-body items-center text-center text-gray-100">
                        <h2 className="card-title text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-violet-400 tracking-tight [text-shadow:_0_2px_4px_rgba(0,0,0,0.3)]">
                            {product?.name}
                        </h2>
                        <p className="text-gray-300 text-sm mt-2">
                            Explore the finest quality with a sleek, modern design tailored for excellence.
                        </p>
                        <div className="card-actions mt-4">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link to={`/product/details/${product?.id}`}>
                                    <motion.button
                                        className="flex items-center px-6 py-3 text-sm font-semibold uppercase tracking-wide text-gray-100 bg-gradient-to-r from-cyan-500/30 to-violet-500/30 rounded-lg shadow-[0_0_8px_rgba(34,211,238,0.3)] hover:bg-gradient-to-r hover:from-cyan-400 hover:to-magenta-500 hover:text-white group"
                                        transition={{ duration: 0.3 }}
                                    >
                                        View Details
                                        <span
                                            className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        >
                                            <svg
                                                width="28"
                                                height="28"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </motion.button>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </>
    );
};

export default ProductCard;