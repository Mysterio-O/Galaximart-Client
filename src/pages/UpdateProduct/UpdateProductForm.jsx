import React, { use, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { IoMdAddCircleOutline } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const UpdateProductForm = ({ productPromise, fnProductName }) => {

    const [extraInput, setExtraInput] = useState([]);

    const product = use(productPromise);

    const inputVariants = {
        initial: { opacity: 0, y: 10 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: 'easeOut'
            }
        }
    };

    const handleUpdateProduct = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form)
        const data = Object.fromEntries(formData.entries());
        // console.log(data);

        const images = Object.keys(data).filter(key => key.startsWith('image-') || key.startsWith('newImage-'))
            .map(key => data[key])
            .filter(url => url.trim() !== '');

        const updatedProduct = {
            ...data, images
        }

        console.log(updatedProduct)

    }



    useEffect(() => {
        fnProductName(product?.name)
    }, [fnProductName, product?.name])

    // console.log(extraInput)

    const fnAddInput = () => {
        setExtraInput([...extraInput, Date.now()])
    }
    // console.log(extraInput);

    const fnRemoveInput = (id) => {
        setExtraInput(extraInput.filter(input => input !== id))
    }

    return (
        <motion.form
            onSubmit={handleUpdateProduct}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-[#1a1a2e] rounded-[20px_18px_14px_16px] shadow-[0_0_20px_rgba(34,211,238,0.5),0_0_30px_rgba(79,70,229,0.3)] relative overflow-hidden max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
        >
            {/* Background glow effect */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl opacity-20 top-[-100px] left-[-100px] animate-pulse-slow"></div>
                <div className="absolute w-96 h-96 bg-indigo-500/20 rounded-full filter blur-3xl opacity-20 bottom-[-100px] right-[-100px] animate-pulse-slow"></div>
            </div>

            {/* Image Fields */}
            <motion.fieldset variants={inputVariants} className="relative z-10">
                <label className="flex gap-2 items-center text-cyan-100 font-medium mb-2 orbitron text-lg">Product Images
                    <motion.span
                        className='cursor-pointer'
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.2, rotate: 90, color: 'green' }}
                        whileTap={{ scale: 1 }}
                        onClick={fnAddInput}>
                        <IoMdAddCircleOutline size={26} />
                    </motion.span>
                </label>
                <div className="flex flex-col gap-4 max-h-[200px] overflow-scroll">
                    {product.image.map((image, index) => (
                        <input
                            key={index}
                            name={`image-${index}`}
                            type="text"
                            defaultValue={image}
                            className="w-full p-3 rounded-lg bg-gray-900/50 text-cyan-100 border border-cyan-300/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none transition-all duration-300 hover:shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                            placeholder={`Image URL ${index + 1}`}
                        />
                    ))}
                    <AnimatePresence>
                        {extraInput.length >= 0 && extraInput.map((inputId, index) => (
                            <motion.div
                                key={inputId}
                                initial={{ scale: 0.7, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.7, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.input
                                    name={`newImage-${index + 1}`}
                                    type="text"
                                    className="w-full p-3 rounded-lg bg-gray-900/50 text-cyan-100 border border-cyan-300/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none transition-all duration-300 hover:shadow-[0_0_8px_rgba(34,211,238,0.3)] relative"
                                    placeholder={`enter new image url-${index + 1}`}
                                />
                                <motion.span
                                    initial={{ scale: 1, opacity: 0.4 }}
                                    whileHover={{ scale: 1.2, opacity: 1 }}
                                    whileTap={{ scale: 1, opacity: 0.4 }}
                                    transition={{ duration: 0.3 }}
                                    onClick={() => fnRemoveInput(inputId)}
                                    className='absolute right-7 top-45 z-10 text-red-500 cursor-pointer'>
                                    <RxCross2 size={24} />

                                </motion.span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </motion.fieldset>

            {/* Name Field */}
            <motion.div variants={inputVariants} className="relative z-10">
                <label className="block text-cyan-100 font-medium mb-2 orbitron">Name</label>
                <input
                    type="text"
                    name="name"
                    defaultValue={product?.name}
                    className="w-full p-3 rounded-lg bg-gray-900/50 text-cyan-100 border border-cyan-900/30 focus:border-cyan-500 focus:ring-2 focus:ring-blue-500/50 outline-none"
                    placeholder="Product name"
                />
            </motion.div>

            {/* Brand Field */}
            <motion.div variants={inputVariants} className="relative z-10">
                <label className="block text-cyan-100 font-medium mb-2 orbitron">Brand</label>
                <input
                    type="text"
                    name="brand"
                    defaultValue={product?.brand}
                    className="w-full p-3 rounded-lg bg-gray-900/50 text-cyan-100 border border-cyan-300/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none transition-all duration-300 hover:shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                    placeholder="Brand name"
                />
            </motion.div>

            {/* Category Field */}
            <motion.div variants={inputVariants} className="relative z-10">
                <label className="block text-cyan-100 font-medium mb-2 orbitron">Category</label>
                <select
                    name="category"
                    className="w-full p-3 rounded-lg bg-gray-900/50 text-cyan-100 border border-cyan-300/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none transition-all duration-300 hover:shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                >
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing & Apparel">Clothing & Apparel</option>
                    <option value="Books & Stationery">Books & Stationery</option>
                    <option value="Sports & Outdoors">Sports & Outdoors</option>
                    <option value="Toys & Games">Toys & Games</option>
                    <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                </select>
            </motion.div>

            {/* Rating Field */}
            <motion.div variants={inputVariants} className="relative z-10">
                <label className="block text-cyan-100 font-medium mb-2 orbitron">Rating</label>
                <input
                    type="number"
                    name="rating"
                    defaultValue={product?.rating}
                    className="w-full p-3 rounded-lg bg-gray-900/50 text-cyan-100 border border-cyan-300/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none transition-all duration-300 hover:shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                    placeholder="Rating (0-5)"
                    min="0"
                    max="5"
                    step="0.1"
                />
            </motion.div>

            {/* Description Field */}
            <motion.div variants={inputVariants} className="relative z-10 md:col-span-2">
                <label className="block text-cyan-100 font-medium mb-2 orbitron">Description</label>
                <textarea
                    name="description"
                    defaultValue={product?.description}
                    className="w-full p-3 rounded-lg bg-gray-900/50 text-cyan-100 border border-cyan-300/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none transition-all duration-300 hover:shadow-[0_0_8px_rgba(34,211,238,0.3)] resize-y min-h-[100px]"
                    placeholder="Product description"
                />
            </motion.div>

            {/* Main Quantity Field */}
            <motion.div variants={inputVariants} className="relative z-10">
                <label className="block text-cyan-100 font-medium mb-2 orbitron">Main Quantity</label>
                <input
                    type="number"
                    name="mainQuantity"
                    defaultValue={product?.stock}
                    className="w-full p-3 rounded-lg bg-gray-900/50 text-cyan-100 border border-cyan-300/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none transition-all duration-300 hover:shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                    placeholder="Stock quantity"
                    min="0"
                />
            </motion.div>

            {/* Min Quantity Field */}
            <motion.div variants={inputVariants} className="relative z-10">
                <label className="block text-cyan-100 font-medium mb-2 orbitron">Min Quantity</label>
                <input
                    type="number"
                    name="minQuantity"
                    defaultValue={product?.minQuantity}
                    className="w-full p-3 rounded-lg bg-gray-900/50 text-cyan-100 border border-cyan-300/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none transition-all duration-300 hover:shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                    placeholder="Minimum order quantity"
                    min="1"
                />
            </motion.div>

            {/* Submit Button */}
            <motion.div
                variants={inputVariants}
                className="md:col-span-2 relative z-10 mt-6"
            >
                <motion.button
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600/50 to-indigo-600/50 text-white rounded-xl hover:from-cyan-500 hover:to-indigo-500 shadow-[0_0_10px_rgba(34,211,238,0.3)] hover:shadow-[0_0_20px_rgba(34,211,238,0.7)] transition-all duration-300 orbitron font-semibold"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(34,211,238,0.7)' }}
                    whileTap={{ scale: 0.95 }}
                >
                    Update Product
                </motion.button>
            </motion.div>
        </motion.form>
    );
};

export default UpdateProductForm;