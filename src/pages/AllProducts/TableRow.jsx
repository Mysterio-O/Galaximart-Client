import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';

const TableRow = ({ product }) => {
    const navigate = useNavigate();

    const handleUpdateProduct = (id) => {
        navigate(`/product/update/${id}`);
    };

    return (
        <motion.tr
            className="bg-gray-900/50 dark:bg-gray-100/50 backdrop-blur-md rounded-lg hover:bg-gray-800/50 dark:hover:bg-gray-200/50 transition-all duration-300 shadow-[0_0_10px_rgba(139,92,246,0.3)] dark:shadow-[0_0_10px_rgba(139,92,246,0.2)] border border-cyan-500/30 dark:border-violet-500/30"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <td className="py-4 px-6">
                <div className="flex items-center gap-4">
                    <div className="avatar">
                        <div className="mask mask-squircle h-14 w-14 border-2 border-cyan-500/30 dark:border-violet-500/30">
                            <img
                                src={product?.image[0]}
                                alt={product?.name}
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold text-gray-100 dark:text-gray-800 text-lg">{product?.name}</div>
                        <div className="text-sm text-cyan-300/70 dark:text-cyan-500/70">{product?.brand}</div>
                    </div>
                </div>
            </td>
            <td className="px-6">
                <span className="text-gray-100 dark:text-gray-800 font-medium">Min: {product?.minQuantity} pcs</span>
            </td>
            <td className="px-6">
                <span className="text-cyan-400 dark:text-cyan-600 font-semibold">${product?.price}</span>
            </td>
            <td className="px-6 text-gray-300/80 dark:text-gray-700/80 max-w-xs truncate">{product?.description}</td>
            <td className="px-6">
                <motion.button
                    onClick={() => handleUpdateProduct(product?._id)}
                    className="btn bg-gradient-to-r from-cyan-500 to-violet-500 dark:from-cyan-300 dark:to-violet-300 text-gray-100 dark:text-gray-800 btn-sm rounded-full px-6 hover:from-cyan-600 hover:to-violet-600 dark:hover:from-cyan-400 dark:hover:to-violet-400 transition-all duration-300 border-none shadow-[0_0_10px_rgba(34,211,238,0.5)] dark:shadow-[0_0_10px_rgba(34,211,238,0.3)]"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Update
                </motion.button>
            </td>
        </motion.tr>
    );
};

export default TableRow;