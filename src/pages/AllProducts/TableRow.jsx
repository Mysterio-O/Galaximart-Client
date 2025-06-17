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
            className="bg-[#2a2a5e]/50 backdrop-blur-sm rounded-lg hover:bg-[#3a3a7e]/70 transition-all duration-300 shadow-md shadow-orange-500/10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <td className="py-4 px-6">
                <div className="flex items-center gap-4">
                    <div className="avatar">
                        <div className="mask mask-squircle h-14 w-14 border-2 border-orange-500/30">
                            <img
                                src={product?.image[0]}
                                alt={product?.name}
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold text-white text-lg">{product?.name}</div>
                        <div className="text-sm text-orange-300/70">{product?.brand}</div>
                    </div>
                </div>
            </td>
            <td className="px-6">
                <span className="text-white font-medium">Min: {product?.minQuantity} pcs</span>
            </td>
            <td className="px-6">
                <span className="text-orange-400 font-semibold">${product?.price}</span>
            </td>
            <td className="px-6 text-white/80 max-w-xs truncate">{product?.description}</td>
            <td className="px-6">
                <motion.button
                    onClick={() => handleUpdateProduct(product?._id)}
                    className="btn bg-orange-500 text-white btn-sm rounded-full px-6 hover:bg-orange-600 transition-all duration-300 border-none shadow-lg shadow-orange-500/30"
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