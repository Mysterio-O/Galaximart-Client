import React, { useContext, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const AddProductForm = () => {

    const { user } = useContext(AuthContext);

    const [extraImages, setExtraImages] = useState([]);

    const [extraDetails, setExtraDetails] = useState([]);

    // Animation variants for input fields
    const inputVariants = {
        initial: { opacity: 0, y: 10 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: 'easeOut',
            },
        },
        exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
    };

    const detailsVariants = {
        initial: { opacity: 0, scale: 0.7 },
        animate: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.3, ease: 'easeOut' }
        },
        exit: { opacity: 0, scale: 0.7, transition: { duration: 0.3 } }
    }

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const images = Object.keys(data)
            .filter((key) => key.startsWith('image-'))
            .map((key) => data[key])
            .filter((url) => url.trim() !== '');

        const details = Object.keys(data)
            .filter((key) => key.startsWith('title-'))
            .map((key, index) => ({
                title: data[`title-${index}`] || '',
                details: data[`details-${index}`] || '',
            }))
            .filter((detail) => detail.title.trim() !== '' || detail.details.trim() !== '');

        const productData = { ...data, images, details };
        const { name, brand, category, rating, price, description, stock, minQuantity } = productData;

        const newProduct = {
            name: name,
            brand: brand,
            category: category,
            rating: parseInt(rating),
            price: parseInt(price),
            description: description,
            stock: parseInt(stock),
            minQuantity: parseInt(minQuantity),
            image: images,
            features: details,
            email: user?.email
        }

        console.log(newProduct);

        Swal.fire({
            title: 'Adding Product...',
            text: 'Please wait while we process your request.',
            icon: 'info',
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            },
            customClass: {
                popup: 'swal-dark',
                title: 'swal-title',
                content: 'swal-content',
            },
        });

        fetch('https://galaxia-mart-server.vercel.app/products', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data?.insertedId || data?.acknowledged) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Product added successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        customClass: {
                            popup: 'swal-dark',
                            title: 'swal-title',
                            content: 'swal-content',
                            confirmButton: 'swal-confirm-button',
                        },
                        buttonsStyling: false,
                    });
                    console.log('Product added:', data);
                }
            })
            .catch(err => {
                Swal.fire({
                    title: 'Error!',
                    text: `Failed to add product: ${err.message || 'Unknown error'}`,
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                    customClass: {
                        popup: 'swal-dark',
                        title: 'swal-title',
                        content: 'swal-content',
                        confirmButton: 'swal-confirm-button',
                    },
                    buttonsStyling: false,
                });
                console.error('Error adding product:', err);
            })

        //     form.reset();

    };

    // Add a new image input
    const addImageInput = () => {
        setExtraImages([...extraImages, Date.now()]);
    };

    // Remove a specific image input
    const removeImageInput = (id) => {
        setExtraImages(extraImages.filter((imageId) => imageId !== id));
    };


    const addDetailsInput = () => {
        setExtraDetails([...extraDetails, Date.now()])
    }

    const removeDetailsInput = (id) => {
        setExtraDetails(extraDetails.filter(details => details !== id));
    }

    return (
        <motion.form
            onSubmit={handleSubmit}
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

            {/* Product Name */}
            <motion.div variants={inputVariants} className="relative z-10">
                <label className="block text-cyan-100 font-medium mb-2 orbitron">Product Name</label>
                <input
                    type="text"
                    name="name"
                    className="w-full p-3 rounded-lg bg-gray-900/50 text-cyan-100 border border-cyan-300/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none hover:shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                    placeholder="Enter Product Name"
                    required
                />
            </motion.div>

            {/* Product Images */}
            <motion.fieldset variants={inputVariants} className="relative z-10">
                <label className="flex gap-2 items-center text-cyan-100 font-medium mb-2 orbitron text-lg">
                    Product Images
                    <motion.span
                        className="cursor-pointer"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.2, rotate: 90, color: '#22d3ee' }}
                        whileTap={{ scale: 1 }}
                        onClick={addImageInput}
                    >
                        <IoMdAddCircleOutline size={26} />
                    </motion.span>
                </label>
                <div className="flex flex-col gap-4 max-h-[200px] overflow-scroll">
                    <input
                        type="url"
                        name="image-0"
                        className="w-full p-3 rounded-lg bg-gray-900/50 text-cyan-100 border border-cyan-300/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none hover:shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                        placeholder="Enter Image URL"
                        required
                    />
                    <AnimatePresence>
                        {extraImages.map((imageId, index) => (
                            <motion.div
                                key={imageId}
                                variants={inputVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="relative"
                            >
                                <input
                                    type="url"
                                    name={`image-${index + 1}`}
                                    className="w-full p-3 rounded-lg bg-gray-900/50 text-cyan-100 border border-cyan-300/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none hover:shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                                    placeholder={`Enter Image URL ${index + 1}`}
                                    required
                                />
                                <span
                                    onClick={() => removeImageInput(imageId)}
                                    className="absolute right-7 top-1/2 transform -translate-y-1/2 opacity-40 cursor-pointer hover:opacity-100 transition-opacity"
                                >
                                    <RxCross2 size={24} />
                                </span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </motion.fieldset>

            {/* Product Brand */}
            <motion.div variants={inputVariants} className="relative z-10">
                <label className="block text-cyan-100 font-medium mb-2 orbitron">Brand</label>
                <input
                    type="text"
                    name="brand"
                    className="w-full p-3 rounded-lg bg-gray-900/50 text-cyan-100 border border-cyan-300/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none hover:shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                    placeholder="Enter Brand Name"
                    required
                />
            </motion.div>

            {/* Product Category */}
            <motion.div variants={inputVariants} className="relative z-10">
                <label className="block text-cyan-100 font-medium mb-2 orbitron">Category</label>
                <select
                    name="category"
                    className="w-full p-3 rounded-lg bg-gray-900/50 text-cyan-100 border border-cyan-300/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none hover:shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                    required
                >
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing & Apparel">Clothing & Apparel</option>
                    <option value="Books & Stationery">Books & Stationery</option>
                    <option value="Sports & Outdoors">Sports & Outdoors</option>
                    <option value="Toys & Games">Toys & Games</option>
                    <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                </select>
            </motion.div>

            {/* Product Rating */}
            <motion.div variants={inputVariants} className="relative z-10">
                <label className="block text-cyan-100 font-medium mb-2 orbitron">Rating</label>
                <input
                    type="number"
                    name="rating"
                    className="w-full p-3 rounded-lg bg-gray-900/50 text-cyan-100 border border-cyan-300/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none hover:shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                    placeholder="Enter Rating (0-5)"
                    min="0"
                    max="5"
                    step="0.1"
                    required
                />
            </motion.div>

            {/* product price */}
            <motion.div variants={inputVariants} className="relative z-10">
                <label className="block text-cyan-100 font-medium mb-2 orbitron">Product Price</label>
                <input
                    type="number"
                    name="price"
                    className="w-full p-3 rounded-lg bg-gray-900/50 text-cyan-100 border border-cyan-300/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none hover:shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                    placeholder="Enter Product Price"
                    step='0.01'
                    required
                />
            </motion.div>

            {/* Product Description */}
            <motion.div variants={inputVariants} className="relative z-10 md:col-span-2">
                <label className="block text-cyan-100 font-medium mb-2 orbitron">Description</label>
                <textarea
                    name="description"
                    className="w-full p-3 rounded-lg bg-gray-900/50 text-cyan-100 border border-cyan-300/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none hover:shadow-[0_0_8px_rgba(34,211,238,0.3)] resize-y min-h-[100px]"
                    placeholder="Enter Product Description"
                    required
                />
            </motion.div>

            {/* Stock Quantity */}
            <motion.div variants={inputVariants} className="relative z-10">
                <label className="block text-cyan-100 font-medium mb-2 orbitron">Stock Quantity</label>
                <input
                    type="number"
                    name="stock"
                    className="w-full p-3 rounded-lg bg-gray-900/50 text-cyan-100 border border-cyan-300/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none hover:shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                    placeholder="Enter Stock Quantity"
                    min="1"
                    required
                />
            </motion.div>

            {/* Minimum Order Quantity */}
            <motion.div variants={inputVariants} className="relative z-10">
                <label className="block text-cyan-100 font-medium mb-2 orbitron">Minimum Order Quantity</label>
                <input
                    type="number"
                    name="minQuantity"
                    className="w-full p-3 rounded-lg bg-gray-900/50 text-cyan-100 border border-cyan-300/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none hover:shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                    placeholder="Enter Minimum Order Quantity"
                    min="1"
                    required
                />
            </motion.div>

            {/* product details */}
            <motion.div variants={inputVariants} className="relative z-10 md:col-span-2">
                <label className="flex gap-2 items-center text-cyan-100 font-medium mb-2 orbitron text-lg">
                    Product Details
                    <motion.span
                        className="cursor-pointer"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.2, rotate: 90, color: '#22d3ee' }}
                        whileTap={{ scale: 1 }}
                        onClick={addDetailsInput}
                    >
                        <IoMdAddCircleOutline size={26} />
                    </motion.span>
                </label>
                <motion.div
                    variants={inputVariants}
                    className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 mb-4 relative"
                >
                    <div>
                        <label className="block text-cyan-100 font-medium mb-1 orbitron">Title</label>
                        <input
                            type="text"
                            name="title-0"
                            className="w-full p-3 rounded-lg bg-gray-900/50 text-cyan-100 border border-cyan-300/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none hover:shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                            placeholder="Enter Title"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-cyan-100 font-medium mb-1 orbitron">Details</label>
                        <textarea
                            name="details-0"
                            className="w-full p-3 rounded-lg bg-gray-900/50 text-cyan-100 border border-cyan-300/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none hover:shadow-[0_0_8px_rgba(34,211,238,0.3)] resize-y min-h-[80px]"
                            placeholder="Enter Details"
                            required
                        />
                    </div>
                </motion.div>
                <AnimatePresence>
                    {extraDetails.map((detailsId, index) => (
                        <motion.div
                            key={detailsId}
                            variants={detailsVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 mb-4 relative"
                        >
                            <div>
                                <label className="block text-cyan-100 font-medium mb-1 orbitron">Title</label>
                                <input
                                    type="text"
                                    name={`title-${index + 1}`}
                                    className="w-full p-3 rounded-lg bg-gray-900/50 text-cyan-100 border border-cyan-300/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none hover:shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                                    placeholder="Enter Title"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-cyan-100 font-medium mb-1 orbitron">Details</label>
                                <textarea
                                    name={`details-${index + 1}`}
                                    className="w-full p-3 rounded-lg bg-gray-900/50 text-cyan-100 border border-cyan-300/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none hover:shadow-[0_0_8px_rgba(34,211,238,0.3)] resize-y min-h-[80px]"
                                    placeholder="Enter Details"
                                    required
                                />
                            </div>
                            <span
                                onClick={() => removeDetailsInput(detailsId)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-40 cursor-pointer hover:opacity-100 transition-opacity text-cyan-100"
                            >
                                <RxCross2 size={24} />
                            </span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={inputVariants} className="md:col-span-2 relative z-10 mt-6">
                <motion.button
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600/50 to-indigo-600/50 text-white rounded-xl hover:from-cyan-500 hover:to-indigo-500 shadow-[0_0_10px_rgba(34,211,238,0.3)] hover:shadow-[0_0_20px_rgba(34,211,238,0.7)] orbitron font-semibold"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(34,211,238,0.7)' }}
                    whileTap={{ scale: 0.95 }}
                >
                    Add Product
                </motion.button>
            </motion.div>
        </motion.form>
    );
};

export default AddProductForm;