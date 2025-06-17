import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { motion } from 'motion/react';
import Loader from '../../Loaders/Product_Loader/Loader';
import ProductCard from './ProductCard';

const Products = () => {

    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const param = useParams();
    // console.log(param?.product_name)

    useEffect(() => {
        fetch(`http://localhost:3000/products/category/${param?.product_name}`)
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
                className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-violet-400 tracking-tight uppercase [text-shadow:_0_2px_4px_rgba(0,0,0,0.3)] my-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                {allProducts[0]?.category}
            </motion.h2>
            {
                loading ? <Loader />
                    : <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8'>
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