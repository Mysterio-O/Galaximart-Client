import React, { useState, useEffect, use, useContext} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import PurchaseModal from "./PurchaseModal";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate, useLocation, Navigate  } from "react-router";
import Swal from "sweetalert2";
import axios from 'axios';

const ProductDetailsShape = ({ productPromise }) => {

    const location = useLocation();

    const { user, loading } = useContext(AuthContext);
    const [cartLoading,setCartLoading]=useState(false);
    const navigate = useNavigate();

    const product = use(productPromise)
    const ratingNumber = Math.floor(product.rating);

    const [isStocked, setIsStocked] = useState(true);

    useEffect(() => {
        if (product?.stock < product?.minQuantity) {
            setIsStocked(false);
        }
        console.log(product);
    }, [product])



    const [isModalOpen, setIsModalOpen] = useState(false);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(product.minQuantity);
    const [isFavorite, setIsFavorite] = useState(false);
    const [timeLeft, setTimeLeft] = useState({
        days: 2,
        hours: 12,
        minutes: 45,
        seconds: 5,
    });

    useEffect(() => {
        document.title = `${product?.name}'s Details`
    }, [product])

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                } else if (prev.days > 0) {
                    return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
                }
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % product.image.length);
    };

    const previousImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + product.image.length) % product.image.length);
    };

    const formatNumber = (number) => number.toString().padStart(2, "0");


    const handleAddToCart = async (id) => {
        console.log(id);
        console.log(quantity);
        if (user) {
            setCartLoading(true);
            const cartDetails = {
                productId: id,
                quantity,
                user: user?.email
            }

            const result = await axios.post('http://localhost:3000/add-to-cart', cartDetails, {
                headers: {
                    authorization: `Bearer ${user?.accessToken}`
                }
            });
            console.log(result);
            if (result?.data?.result?.insertedId) {
                setCartLoading(false);
                Swal.fire({
                    title: "Items added to the cart.",
                    icon: 'success',
                    confirmButtonText: "OK",
                    customClass: {
                        popup: 'swal-dark',
                        title: 'swal-title',
                        confirmButton: 'swal-confirm-button',
                    },
                    buttonsStyling: false,
                })
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
                    return navigate('/auth/signin',{
                        state: location?.pathname
                    })
                }
            })
        }

    }

    const handleBuyNow = () => {
        // console.log('clicked buy now')

        if (user) {
            setIsModalOpen(true)
        } else {
            Swal.fire({
                title: "Sign In Required!",
                text: "SIGNIN TO BUY THIS PRODUCT.",
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
                    return navigate('/auth/signin');
                }
            })
        }


    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }


    return (
        <div className="mx-auto md:px-8 md:py-12 bg-[#1a1a2e] text-white ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Left side - Image gallery */}
                <div className="space-y-4">
                    <div className="relative aspect-square rounded-[20px_18px_14px_16px] overflow-hidden">
                        {/* NEW and SALE tags */}
                        <div className="absolute top-4 left-4 z-10 space-y-2">
                            <motion.span
                                className="inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r from-gray-900/95 to-cyan-900/95 text-white rounded-lg shadow-[0_0_10px_rgba(34,211,238,0.4)]"
                                whileHover={{ scale: 1.05 }}
                            >
                                NEW
                            </motion.span>
                            <motion.div
                                className="inline-block px-3 py-1 text-xs font-semibold bg-gradient-to-r from-emerald-600/80 to-emerald-800/80 text-white rounded-lg shadow-[0_0_10px_rgba(16,185,129,0.4)]"
                                whileHover={{ scale: 1.05 }}
                            >
                                -50%
                            </motion.div>
                        </div>

                        {/* Main image with navigation arrows */}
                        <div className="relative h-full">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentImageIndex}
                                    src={product.image[currentImageIndex]}
                                    alt={`Product view ${currentImageIndex + 1}`}
                                    className="w-full h-full object-cover"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </AnimatePresence>
                            <motion.button
                                onClick={previousImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gradient-to-r from-cyan-600/50 to-indigo-600/50 shadow-lg hover:from-cyan-500 hover:to-indigo-500"
                                aria-label="Previous image"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <BiChevronLeft className="w-6 h-6 text-white" />
                            </motion.button>
                            <motion.button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gradient-to-r from-cyan-600/50 to-indigo-600/50 shadow-lg hover:from-cyan-500 hover:to-indigo-500"
                                aria-label="Next image"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <BiChevronRight className="w-6 h-6 text-white" />
                            </motion.button>
                        </div>
                    </div>

                    {/* Thumbnail images */}
                    <div className="flex gap-4 flex-wrap">
                        {product.image.map((image, index) => (
                            <motion.button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`relative transition-all duration-300 w-[8rem] aspect-square rounded-lg ${currentImageIndex === index
                                    ? "ring-2 ring-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                                    : "hover:ring-2 hover:ring-cyan-400 hover:shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Right side - Product details */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                            {[...Array(ratingNumber)].map((_, i) => (
                                <FaStar key={i} className="w-4 h-4 fill-cyan-400" />
                            ))}
                        </div>
                        <span className="text-sm text-cyan-200">11 Reviews</span>
                    </div>

                    <h1 className="text-[1.8rem] md:text-[2.2rem] font-bold text-cyan-100 tracking-wide">{product.name}</h1>

                    {
                        !isStocked && <p className="text-red-400 font-semibold">(Out Of Stock)</p>
                    }

                    <p className="text-cyan-200/80 text-[0.9rem] leading-relaxed">
                        {product.description ||
                            "Buy one or buy a few and make every space where you sit more convenient. Light and easy to move around with removable tray top, handy for serving snacks."}
                    </p>

                    <div className="flex items-center gap-3">
                        <span className="text-[1.6rem] font-semibold text-cyan-100">${product.price || "199.00"}</span>
                        <span className="text-lg text-cyan-200/50 line-through">${product.price * 2}</span>
                    </div>

                    <div className="pb-2">
                        <p className="font-medium text-[0.9rem] text-cyan-100">Offer expires in:</p>
                        <div className="flex items-center gap-[10px] mt-2">
                            {["days", "hours", "minutes", "seconds"].map((unit) => (
                                <motion.div
                                    key={unit}
                                    className="flex items-center justify-center flex-col gap-[0.2rem]"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.1 * ["days", "hours", "minutes", "seconds"].indexOf(unit) }}
                                >
                                    <h5 className="py-2 px-4 bg-gradient-to-r from-gray-900/95 to-cyan-900/95 text-[1.9rem] font-semibold text-cyan-100 rounded-lg shadow-[0_0_8px_rgba(34,211,238,0.3)]">
                                        {formatNumber(timeLeft[unit])}
                                    </h5>
                                    <span className="text-[0.7rem] text-cyan-200 capitalize">{unit}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2 border-t border-cyan-300/30 pt-4">
                        <p className="font-medium text-[0.9rem] text-cyan-100">Short Details</p>
                        {
                            product.features.map((details, index) => <p
                                key={index}
                                className="text-cyan-200/80"><span className="text-cyan-100 font-bold">{details.title}:</span> <span>{details?.details}</span></p>)
                        }

                    </div>

                    <div className="flex gap-4 items-center pt-6">
                        <div className="flex items-center bg-gradient-to-r from-gray-900/95 to-cyan-900/95 rounded-md">
                            <motion.button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="px-4 py-[0.560rem] text-[1.3rem] font-[300] text-cyan-100 hover:bg-cyan-500/30 rounded-l-md"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                −
                            </motion.button>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                className="w-10 font-medium outline-none text-[0.9rem] bg-transparent text-center text-cyan-100"
                            />
                            <motion.button
                                onClick={() => setQuantity(quantity + 1)}
                                className="px-4 py-[0.560rem] text-[1.3rem] font-[300] text-cyan-100 hover:bg-cyan-500/30 rounded-r-md"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                +
                            </motion.button>
                        </div>
                        <motion.button
                            onClick={() => setIsFavorite(!isFavorite)}
                            className="py-3 border border-cyan-300/30 rounded-md text-cyan-100 hover:bg-cyan-500/20 flex items-center justify-center gap-[10px] grow"
                            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(34, 211, 238, 0.4)" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isFavorite ? (
                                <FaHeart className="w-5 h-5 text-red-500" />
                            ) : (
                                <FaRegHeart className="w-5 h-5 text-cyan-100" />
                            )}
                            Wishlist
                        </motion.button>
                    </div>

                    {
                        isStocked && <div className="flex gap-5">
                            <motion.button
                                onClick={() => handleAddToCart(product?._id)}
                                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600/50 to-indigo-600/50 text-white rounded-xl hover:from-cyan-500 hover:to-indigo-500 shadow-[0_0_10px_rgba(34,211,238,0.3)] hover:shadow-[0_0_20px_rgba(34,211,238,0.7)] transition-all duration-500"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {
                                    loading ? "Loading.." : "Add to Cart"
                                }
                            </motion.button>
                            <motion.button
                                onClick={handleBuyNow}
                                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600/50 to-indigo-600/50 text-white rounded-xl hover:from-cyan-500 hover:to-indigo-500 shadow-[0_0_10px_rgba(34,211,238,0.3)] hover:shadow-[0_0_20px_rgba(34,211,238,0.7)] transition-all duration-500"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {
                                    loading || cartLoading ? "Loading.." : "Buy Now"
                                }
                            </motion.button>
                        </div>
                    }
                </div>
            </div>


            <AnimatePresence>
                {isModalOpen && <PurchaseModal product={product} handleCloseModal={handleCloseModal} quantity={quantity} setIsModalOpen={setIsModalOpen} />}
            </AnimatePresence>


        </div>
    );
};

export default ProductDetailsShape;