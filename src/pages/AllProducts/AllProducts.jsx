import React, { Suspense, useContext, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Products from './Products';
import Loader from '../../Loaders/Default_Loader/Loader';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';
import TableFormat from './TableFormat';
import { FaAnglesUp } from "react-icons/fa6";
import TableSkeleton from '../../Loaders/TableSkeleton/TableSkeleton';
import CardSkeleton from '../../Loaders/CardSkeleton/CardSkeleton';

const AllProducts = () => {
    const { user } = useContext(AuthContext);

    const [isTable, setIsTable] = useState(false);

    const [sortValue, setSortValue] = useState('');

    const [title, setTitle] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [paginationInfo, setPaginationInfo] = useState({
        total: 0,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false
    });

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

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
        setCurrentPage(1);
    }

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    }

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(e.target.value);
        setCurrentPage(1);
    }

    useEffect(() => {
        if (!token) return;
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`https://galaxia-mart-server.vercel.app/allProducts?sortParam=${sortValue}&page=${currentPage}&limit=${itemsPerPage}`, {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                });
                setProducts(res?.data?.data);
                setPaginationInfo({
                    total: res?.data?.pagination?.total,
                    totalPages: res?.data?.pagination?.totalPages || Math.ceil(res?.data?.pagination?.total / itemsPerPage),
                    hasNextPage: res?.data?.pagination?.hasNextPage,
                    hasPrevPage: res?.data?.pagination?.hasPrevPage
                });
            }
            catch (err) {
                console.error("error fetching products", err);
                setProducts([]);
                setError("Failed to load products");
            }
            finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchProducts();
        }

    }, [sortValue, currentPage, itemsPerPage, token]);





    // console.log(sortValue)

    const handleScroll = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className='min-h-screen max-w-6xl mx-auto mb-10 relative'>

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
                            className="text-sm md:text-base font-bold text-gray-100 dark:text-gray-800"
                        >
                            Sort Items:
                        </label>
                        <motion.select
                            id="sortOptions"
                            name="sortOptions"
                            className="p-2 rounded-lg bg-gray-800/50 dark:bg-gray-200/50 border border-cyan-500/30 dark:border-violet-500/30 text-gray-300 dark:text-gray-700 text-sm md:text-base focus:border-cyan-400 dark:focus:border-violet-600 focus:outline-none cursor-pointer focus:shadow-[0_0_8px_rgba(139,92,246,0.3)] transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
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

                {/* Items per page selector */}
                <div className="flex items-center">
                    <label htmlFor="itemsPerPage" className="mr-2 text-sm text-gray-300 dark:text-gray-700">
                        Items per page:
                    </label>
                    <select
                        id="itemsPerPage"
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        className="p-1 rounded bg-gray-800/50 dark:bg-gray-200/50 border border-cyan-500/30 dark:border-violet-500/30 text-gray-300 dark:text-gray-700"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>
                </div>

                {/* // table format button */}
                <div>
                    <div className="flex items-center justify-center">
                        <div className="relative group">
                            <button
                                onClick={() => setIsTable(!isTable)}
                                className="relative inline-block p-px font-semibold leading-6 text-gray-100 dark:text-gray-800 bg-gray-900/95 dark:bg-gray-100/95 shadow-2xl cursor-pointer rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.3)] dark:shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
                            >
                                <span
                                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 via-magenta-500 to-violet-500 dark:from-cyan-600 dark:via-magenta-600 dark:to-violet-600 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                ></span>

                                <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950 dark:bg-gray-50">
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

            {
                !isTable ?
                    <Products products={products}></Products>
                    :
                    <TableFormat products={products} />
            }

            {/* Pagination Controls */}
            <div className="flex justify-center mt-8">
                <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={!paginationInfo.hasPrevPage}
                        className={`relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-700 dark:border-gray-300 bg-gray-800/50 dark:bg-gray-200/50 text-sm font-medium ${paginationInfo.hasPrevPage ? 'text-gray-100 dark:text-gray-800 hover:bg-gray-700/50 dark:hover:bg-gray-300/50' : 'text-gray-500 dark:text-gray-400 cursor-not-allowed'}`}
                    >
                        Previous
                    </button>

                    {Array.from({ length: Math.min(5, paginationInfo.totalPages) }, (_, i) => {
                        // Show pages around current page
                        let pageNum;
                        if (paginationInfo.totalPages <= 5) {
                            pageNum = i + 1;
                        } else if (currentPage <= 3) {
                            pageNum = i + 1;
                        } else if (currentPage >= paginationInfo.totalPages - 2) {
                            pageNum = paginationInfo.totalPages - 4 + i;
                        } else {
                            pageNum = currentPage - 2 + i;
                        }

                        return (
                            <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`relative inline-flex items-center px-4 py-2 border border-gray-700 dark:border-gray-300 text-sm font-medium ${currentPage === pageNum ? 'bg-cyan-600/50 dark:bg-violet-600/50 text-white dark:text-white' : 'bg-gray-800/50 dark:bg-gray-200/50 text-gray-100 dark:text-gray-800 hover:bg-gray-700/50 dark:hover:bg-gray-300/50'}`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={!paginationInfo.hasNextPage}
                        className={`relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-700 dark:border-gray-300 bg-gray-800/50 dark:bg-gray-200/50 text-sm font-medium ${paginationInfo.hasNextPage ? 'text-gray-100 dark:text-gray-800 hover:bg-gray-700/50 dark:hover:bg-gray-300/50' : 'text-gray-500 dark:text-gray-400 cursor-not-allowed'}`}
                    >
                        Next
                    </button>
                </nav>
            </div>

            <div className="text-center text-sm text-gray-400 dark:text-gray-500 mt-2">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, paginationInfo.total)} of {paginationInfo.total} items
            </div>

            <motion.span
                onClick={handleScroll}
                className="fixed z-50 bottom-10 right-10 cursor-pointer bg-gradient-to-r from-cyan-500/30 to-violet-500/30 dark:from-cyan-300/30 dark:to-violet-300/30 text-gray-100 dark:text-gray-800 p-3 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)] dark:shadow-[0_0_10px_rgba(34,211,238,0.3)] hover:from-cyan-400 hover:to-violet-400 dark:hover:from-cyan-500 dark:hover:to-violet-500 transition-all duration-300"
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