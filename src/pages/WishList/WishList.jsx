import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { FaHeart, FaTrash, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router';
import axios from 'axios';
import useWishlist from '../../hooks/useWishlist';
import { AuthContext } from '../../Provider/AuthProvider';
import { useContext } from 'react';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router';

const WishList = () => {

    const { wishlist, removeFromWishlist } = useWishlist();
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartLoading, setCartLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchWishlistProducts = async () => {
            try {
                setLoading(true);
                const productPromises = wishlist.map(item =>
                    axios.get(`http://localhost:3000/product/${item._id}`)
                );
                const responses = await Promise.all(productPromises);
                setProducts(responses.map(res => res.data));
            } catch (error) {
                console.error("Error fetching wishlist products:", error);
            } finally {
                setLoading(false);
            }
        };

        if (wishlist.length > 0) {
            fetchWishlistProducts();
        } else {
            setLoading(false);
            setProducts([]);
        }
    }, [wishlist]);


    const handleAddToCart = async (product) => {
        if (user) {
            setCartLoading(true);
            const cartDetails = {
                productId: product._id,
                quantity: product.minQuantity,
                user: user?.email
            };

            try {
                const result = await axios.post('http://localhost:3000/add-to-cart', cartDetails, {
                    headers: {
                        authorization: `Bearer ${user?.accessToken}`
                    }
                });

                if (result?.data?.result?.insertedId) {
                    Swal.fire({
                        title: "Item added to cart!",
                        icon: 'success',
                        confirmButtonText: "OK",
                        customClass: {
                            popup: 'swal-dark',
                            title: 'swal-title',
                            confirmButton: 'swal-confirm-button',
                        },
                        buttonsStyling: false,
                    });
                }
            } catch (error) {
                console.error("Error adding to cart:", error);
            } finally {
                setCartLoading(false);
            }
        } else {
            Swal.fire({
                title: "Sign In Required!",
                text: "SIGNIN TO ADD TO CART.",
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: "SignIn",
                cancelButtonText: "Cancel",
                customClass: {
                    popup: 'swal-dark',
                    title: 'swal-title',
                    text: 'swal-text',
                    confirmButton: 'swal-confirm-button',
                    cancelButton: 'swal-cancel-button',
                    icon: "swal2-info",
                    actions: 'flex gap-4'
                },
                buttonsStyling: false,

            }).then((result) => {
                if (result.isConfirmed) {
                    return navigate('/auth/signin', {
                        state: location?.pathname
                    })
                }
            })
        }
    };


    const handleRemoveItem = (productId) => {
        Swal.fire({
            title: "Remove from wishlist?",
            text: "This will remove the item from your wishlist",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Remove",
            cancelButtonText: "Cancel",
            customClass: {
                popup: 'swal-dark',
                title: 'swal-title',
                confirmButton: 'swal-confirm-button',
                cancelButton: 'swal-cancel-button',
                actions: 'flex gap-4'
            },
            buttonsStyling: false,
        }).then((result) => {
            if (result.isConfirmed) {
                removeFromWishlist(productId);
            }
        });
    };

    const handleGoBack = () => {
        navigate(-1); // Go back to previous page
    };


    return (
        <div className="min-h-screen bg-gray-900/90 dark:bg-gray-100/90 text-gray-100 dark:text-gray-800 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center mb-8">
                    <button
                        onClick={handleGoBack}
                        className="mr-4 p-2 rounded-full bg-gray-800/50 dark:bg-gray-200/50 hover:bg-gray-700/50 dark:hover:bg-gray-300/50 transition-colors"
                    >
                        <FaArrowLeft className="text-xl text-cyan-400 dark:text-cyan-500" />
                    </button>
                    <h1 className="text-3xl font-bold text-cyan-400 dark:text-cyan-500">Your Wishlist</h1>
                    <span className="ml-4 px-3 py-1 bg-cyan-600/50 dark:bg-cyan-400/50 rounded-full text-sm">
                        {wishlist.length} items
                    </span>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="bg-gray-800/50 dark:bg-gray-200/50 rounded-xl overflow-hidden animate-pulse">
                                <div className="h-48 bg-gray-700/50 dark:bg-gray-300/50"></div>
                                <div className="p-4 space-y-3">
                                    <div className="h-6 bg-gray-700/50 dark:bg-gray-300/50 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-700/50 dark:bg-gray-300/50 rounded w-1/2"></div>
                                    <div className="h-10 bg-gray-700/50 dark:bg-gray-300/50 rounded mt-4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="mx-auto w-24 h-24 bg-gray-800/50 dark:bg-gray-200/50 rounded-full flex items-center justify-center mb-6">
                            <FaHeart className="text-4xl text-cyan-400 dark:text-cyan-500" />
                        </div>
                        <h2 className="text-2xl font-semibold mb-2 text-cyan-400 dark:text-cyan-500">Your wishlist is empty</h2>
                        <p className="text-cyan-300 dark:text-cyan-400 mb-6">Start adding items you love!</p>
                        <Link
                            to="/#categories"
                            className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 dark:from-cyan-500 dark:to-indigo-500 rounded-lg hover:shadow-lg transition-all"
                        >
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <motion.div
                                key={product._id}
                                className="bg-gray-800/50 dark:bg-gray-200/50 rounded-xl overflow-hidden shadow-lg relative border border-cyan-500/30 dark:border-violet-500/30"
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="relative">
                                    <img
                                        src={product.image[0]}
                                        alt={product.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <button
                                        onClick={() => handleRemoveItem(product._id)}
                                        className="absolute top-2 right-2 p-2 bg-red-500/80 dark:bg-red-600/80 rounded-full hover:bg-red-500 dark:hover:bg-red-600 transition-colors"
                                        aria-label="Remove from wishlist"
                                    >
                                        <FaTrash className="text-white" />
                                    </button>
                                    {product.stock < product.minQuantity && (
                                        <div className="absolute top-2 left-2 px-2 py-1 bg-red-500/80 dark:bg-red-600/80 rounded text-xs font-semibold">
                                            Out of Stock
                                        </div>
                                    )}
                                </div>

                                <div className="p-4">
                                    <h3 className="text-xl font-semibold mb-2 text-cyan-100 dark:text-cyan-800 truncate">{product.name}</h3>
                                    <div className="flex justify-between items-center mb-4">
                                        <div>
                                            <span className="text-lg font-bold">${product.price}</span>
                                            {product.price * 2 && (
                                                <span className="ml-2 text-sm text-cyan-300/50 dark:text-cyan-600/50 line-through">
                                                    ${product.price * 2}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center">
                                            <FaHeart className="text-red-500 dark:text-red-600 mr-1" />
                                            <span>{product.rating || '0'}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Link
                                            to={`/product/details/${product._id}`}
                                            className="flex-1 py-2 text-center bg-cyan-600/50 dark:bg-cyan-500/50 hover:bg-cyan-600 dark:hover:bg-cyan-500 rounded-lg transition-colors"
                                        >
                                            View Details
                                        </Link>
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            disabled={cartLoading || product.stock < product.minQuantity}
                                            className={`flex-1 py-2 bg-indigo-600/50 dark:bg-indigo-500/50 hover:bg-indigo-600 dark:hover:bg-indigo-500 rounded-lg transition-colors flex items-center justify-center gap-2 ${product.stock < product.minQuantity ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                        >
                                            {cartLoading ? 'Adding...' : (
                                                <>
                                                    <FaShoppingCart />
                                                    Add to Cart
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishList;