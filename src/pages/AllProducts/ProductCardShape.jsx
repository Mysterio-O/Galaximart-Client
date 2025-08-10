import React from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import ProductTitle from '../../shared/ProductTitle';

const ProductCardShape = ({ product, index }) => {
    const navigate = useNavigate();


    const handleUpdateProduct = (id) => {
        // console.log(id);
        navigate(`/product/update/${id}`)
    }

    return (
        <motion.div
            key={product?.id}
            className="card bg-gradient-to-br from-gray-900/90 via-violet-950/90 to-cyan-900/90 dark:from-gray-100/90 dark:via-violet-100/90 dark:to-cyan-100/90 backdrop-blur-md shadow-[0_0_15px_rgba(139,92,246,0.3)] dark:shadow-[0_0_15px_rgba(139,92,246,0.2)] rounded-lg overflow-hidden border border-cyan-500/30 dark:border-violet-500/30 w-full max-w-[250px]"
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
            <figure className="px-4 pt-4">
                <img
                    src={product?.image[0]}
                    alt={`${product?.name}'s photo`}
                    className="rounded-lg object-cover w-full h-36 transition-all duration-300 group-hover:brightness-110"
                />
            </figure>
            <div className="card-body items-center text-center text-gray-100 dark:text-gray-800 p-4">
                <ProductTitle product={product}/>
                <p className='text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-500 to-violet-500 dark:from-cyan-600 dark:via-magenta-600 dark:to-violet-600 tracking-tight [text-shadow:_0_2px_4px_rgba(0,0,0,0.3)]'>{product?.category}</p>
                <p className='text-base font-semibold text-cyan-400 dark:text-cyan-600 mt-2'>Minimum Quantity: {product?.minQuantity}</p>
                <p className='text-sm font-medium text-gray-200 dark:text-gray-600'>Price: {product?.price}$</p>
                <div className="card-actions mt-3">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.button
                            onClick={() => handleUpdateProduct(product._id)}
                            className="flex items-center px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-100 dark:text-gray-800 bg-gradient-to-r from-cyan-500/30 to-violet-500/30 dark:from-cyan-300/30 dark:to-violet-300/30 rounded-lg shadow-[0_0_8px_rgba(34,211,238,0.3)] dark:shadow-[0_0_8px_rgba(34,211,238,0.2)] hover:from-cyan-400 hover:to-magenta-500 dark:hover:from-cyan-500 dark:hover:to-magenta-600 hover:text-white dark:hover:text-gray-900 group"
                            transition={{ duration: 0.3 }}
                        >
                            Update Product
                            <span
                                className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                                <svg
                                    width="24"
                                    height="24"
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
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCardShape;