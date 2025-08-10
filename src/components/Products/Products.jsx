import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { motion } from 'motion/react';
import Loader from '../../Loaders/Product_Loader/Loader';
import ProductCard from './ProductCard';
import ProductLoader from '../../Loaders/ProductLoader/ProductLoader';

const Products = () => {

    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const param = useParams();
    // console.log(param?.product_name)

    useEffect(() => {
        fetch(`https://galaxia-mart-server.vercel.app/products/category/${param?.product_name}`)
            .then(res => res.json())
            .then(data => {
                setAllProducts(data)
                setLoading(false);
            })
            .catch(err => console.log('error fetching product data in Products Component', err))
    }, [param])

    // console.log(allProducts);

    useEffect(() => {
        document.title = allProducts[0]?.category
    }, [allProducts])

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
                    : <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 p-8'>
                        {
                            allProducts.map((product, index) => <ProductCard
                                key={product._id}
                                product={product}
                                index={index}
                            />)
                        }
                    </div>
            }
        </section>
    );
};

export default Products;