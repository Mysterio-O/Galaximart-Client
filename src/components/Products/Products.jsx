import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { motion } from 'motion/react';
import Loader from '../../Loaders/Product_Loader/Loader';
import ProductCard from './ProductCard';
import ProductLoader from '../../Loaders/ProductLoader/ProductLoader';
import axios from 'axios';

const Products = () => {

    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [paginationInfo, setPaginationInfo] = useState({
        total: 0,
        totalPages: 1,
        hasNextPage: false,
        hasPrevPage: false
    });

    const param = useParams();
    // console.log(param?.product_name)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`https://galaxia-mart-server.vercel.app/products/category/${param?.product_name}?page=${currentPage}&limit=${itemsPerPage}`);
                console.log(res);
                setAllProducts(res?.data?.data);
                setPaginationInfo({
                    total: res?.data?.pagination?.total,
                    totalPages: res?.data?.pagination?.totalPages,
                    hasNextPage: res?.data?.pagination?.hasNextPage,
                    hasPrevPage: res?.data?.pagination?.hasPrevPage
                })
            }
            catch (err) {
                console.log("error fetching product data with category", err);
            }
            finally {
                setLoading(false);
            }
        }

        fetchProducts();

    }, [param, currentPage, itemsPerPage]);

    // console.log(allProducts);

    useEffect(() => {
        document.title = allProducts[0]?.category
    }, [allProducts]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    }

    return (
        <section>
            <motion.h2
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-500 to-violet-500 dark:from-cyan-600 dark:via-magenta-600 dark:to-violet-600 tracking-tighter drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] dark:drop-shadow-[0_0_8px_rgba(139,92,246,0.3)] orbitron py-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                {allProducts[0]?.category}
            </motion.h2>
            {
                loading ? <ProductLoader />
                    : <>
                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 p-8'>
                            {
                                allProducts.map((product, index) => <ProductCard
                                    key={product._id}
                                    product={product}
                                    index={index}
                                />)
                            }
                        </div>

                        <div className="flex justify-center mt-8">
                            <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={!paginationInfo.hasPrevPage}
                                    className={`relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-700 dark:border-gray-300 bg-gray-800/50 dark:bg-gray-200/50 text-sm font-medium ${paginationInfo.hasPrevPage
                                        ? 'text-gray-100 dark:text-gray-800 hover:bg-gray-700/50 dark:hover:bg-gray-300/50'
                                        : 'text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    Previous
                                </button>

                                {Array.from({ length: Math.min(5, paginationInfo.totalPages) }, (_, i) => {
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
                                            className={`relative inline-flex items-center px-4 py-2 border border-gray-700 dark:border-gray-300 text-sm font-medium ${currentPage === pageNum
                                                ? 'bg-cyan-600/50 dark:bg-violet-600/50 text-white dark:text-white'
                                                : 'bg-gray-800/50 dark:bg-gray-200/50 text-gray-100 dark:text-gray-800 hover:bg-gray-700/50 dark:hover:bg-gray-300/50'
                                                }`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={!paginationInfo.hasNextPage}
                                    className={`relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-700 dark:border-gray-300 bg-gray-800/50 dark:bg-gray-200/50 text-sm font-medium ${paginationInfo.hasNextPage
                                        ? 'text-gray-100 dark:text-gray-800 hover:bg-gray-700/50 dark:hover:bg-gray-300/50'
                                        : 'text-gray-500 dark:text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    Next
                                </button>
                            </nav>
                        </div>

                        <div className="text-center text-sm text-gray-400 dark:text-gray-500 mt-2">
                            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                            {Math.min(currentPage * itemsPerPage, paginationInfo.total)} of{' '}
                            {paginationInfo.total} items
                        </div>

                    </>
            }
        </section>
    );
};

export default Products;