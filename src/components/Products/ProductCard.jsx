import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import ProductRating from '../Rating/ProductRating';
import PrimaryButton from '../../shared/PrimaryButton';
import ProductTitle from '../../shared/ProductTitle';


const ProductCard = ({ product, index }) => {

    const ratingNumber = product?.rating;

    return (
        <>
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
                        src={product?.image[0]}
                        alt={`${product?.name}'s photo`}
                        className="rounded-lg object-cover w-full h-30 transition-all duration-300 group-hover:brightness-110"
                    />
                </figure>
                <div className="card-body items-center text-center text-gray-100">
                    <ProductTitle product={product}/>
                    <p
                        className={`text-green-400 ${product?.stock < product?.minQuantity && 'text-red-500'} font-semibold text-sm`}
                    >{`${product?.stock > product?.minQuantity ? `${product?.stock} left` : 'Out of Stock'}`}</p>
                    <p className='text-base md:text-lg font-medium text-gray-200'>Price: {product?.price}$</p>

                    <div id='rating' className='flex'>
                        <ProductRating ratingNumber={ratingNumber} />
                    </div>

                    <div className="card-actions mt-4">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link to={`/product/details/${product?._id}`}>
                                <PrimaryButton text={"View Details"} />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default ProductCard;