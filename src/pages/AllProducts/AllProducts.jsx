import React, { Suspense, useContext, useState } from 'react';
import { motion } from 'motion/react';
import Products from './Products';
import Loader from '../../Loaders/Default_Loader/Loader';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';

const AllProducts = () => {

    const { user } = useContext(AuthContext);

    const token = user?.accessToken
    // console.log("user->",user,"token->",token)

    const [sortValue, setSortValue] = useState('');

    const handleSortChange = (e) => {
        const value = e.target.value
        setSortValue(value === '' ? '' : value);
        console.log('Selected sort value:', value);

    }

    const productsPromise = axios.get(`http://localhost:3000/allProducts?sortParam=${sortValue}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
        .then(res => res.data)
        .catch(err => {
            console.log('error fetching products data', err);
        });;
    // console.log(productsPromise)



    console.log(sortValue)

    return (
        <div className='min-h-screen mt-32 max-w-6xl mx-auto'>

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

            <Suspense fallback={<Loader />}>
                <Products productsPromise={productsPromise}></Products>
            </Suspense>
        </div>
    );
};

export default AllProducts;