import React, { Suspense, useContext, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Products from './Products';
import Loader from '../../Loaders/Default_Loader/Loader';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';
import TableFormat from './TableFormat';
import { FaAnglesUp } from "react-icons/fa6";

const AllProducts = () => {
    const { user } = useContext(AuthContext);

    const [isTable, setIsTable] = useState(false);

    const [sortValue, setSortValue] = useState('');

    const [title, setTitle] = useState('');

    useEffect(() => {
        let newTitle = 'All Products'
        if (sortValue == 50) {
            newTitle = "Min Buy 50 "
        } else if (sortValue == 100) {
            newTitle = "Min Buy 100 "
        } else {
            newTitle = "All Products "
        }
        newTitle += isTable ? "Table View" : "Card View";
        newTitle += "- Galactic"
        setTitle(newTitle);
        document.title = title
    }, [sortValue, isTable, title])



    const token = user?.accessToken
    // console.log("user->",user,"token->",token)



    const handleSortChange = (e) => {
        const value = e.target.value
        setSortValue(value === '' ? '' : value);
        // console.log('Selected sort value:', value);
    }

    const productsPromise = axios.get(`https://galaxia-mart-server.vercel.app/allProducts?sortParam=${sortValue}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then(res => res.data)
        .catch(err => {
            console.log('error fetching products data', err);
        });
    // console.log(productsPromise)



    // console.log(sortValue)

    const handleScroll = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className='min-h-screen mt-32 max-w-6xl mx-auto mb-10 relative'>

            <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                    <motion.form
                        className="flex items-center justify-center md:justify-start gap-2 p-4 md:p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, type: 'spring', stiffness: 100, damping: 20 }}
                    >
                        <label
                            htmlFor="sortOptions"
                            className="text-sm md:text-base font-bold text-white"
                        >
                            Sort Items:
                        </label>
                        <motion.select
                            id="sortOptions"
                            name="sortOptions"
                            className="p-2 rounded-lg bg-neutral-800 border-2 border-neutral-600 text-neutral-400 text-sm md:text-base focus:border-teal-400 focus:outline-none cursor-pointer"
                            whileHover={{ scale: 1.05, borderColor: '#2DD4BF' }}
                            whileFocus={{ scale: 1.05, boxShadow: '0 0 10px rgba(45, 212, 191, 0.5)' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            onChange={handleSortChange}
                            value={sortValue ?? ''}
                        >
                            <option value="" selected disabled>Select Sort Param</option>
                            <option value="">Default</option>
                            <option value="50">Min Buy 50 or higher</option>
                            <option value="100">Min Buy 100 or higher</option>
                        </motion.select>
                    </motion.form>
                </div>

                {/* // table format button */}
                <div>
                    <div className="flex items-center justify-center">
                        <div className="relative group">
                            <button
                                onClick={() => setIsTable(!isTable)}
                                className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
                            >
                                <span
                                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                ></span>

                                <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                                    <div className="relative z-10 flex items-center space-x-2">
                                        <span className="transition-all duration-500 group-hover:translate-x-1"
                                        >
                                            {
                                                !isTable ? 'Show in table format'
                                                    : "Back to default format"
                                            }
                                        </span
                                        >
                                        <svg
                                            className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                                            data-slot="icon"
                                            aria-hidden="true"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                clipRule="evenodd"
                                                d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                                fillRule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                </span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <Suspense fallback={<Loader />}>
                {
                    !isTable ? <Products productsPromise={productsPromise}></Products>
                        : <TableFormat productsPromise={productsPromise} />
                }
            </Suspense>

            <motion.span
                onClick={handleScroll}
                className="fixed z-50 bottom-10 right-10 cursor-pointer bg-indigo-300 text-white p-3 rounded-full shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-all duration-300"
                role="button"
                aria-label="Scroll to top"
                whileHover={{ translateY: -10 }}
                transition={{ duration: 0.3 }}
            >
                <FaAnglesUp size={24} />
            </motion.span>

        </div>
    );
};

export default AllProducts;