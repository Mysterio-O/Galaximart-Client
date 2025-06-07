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
        fetch('/product_categories.json')
            .then(res => res.json())
            .then(data => {
                setAllProducts(data)
                setLoading(false);
            })
            .catch(err => console.log('error fetching product data in Products Component', err))
    }, [])

    // console.log(allProducts);


    const findTheRightProduct = allProducts.filter(product => product.category === param?.product_name);
    console.log(findTheRightProduct)

    // findTheRightProduct.map(p => console.log(p.products))

    return (
        <section>
            <motion.h2
                className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-violet-400 tracking-tight uppercase [text-shadow:_0_2px_4px_rgba(0,0,0,0.3)] my-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                {findTheRightProduct[0]?.category}
            </motion.h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
                {
                    !loading ? findTheRightProduct.map((product, index) => <ProductCard
                        key={`${product?.category}'-'${index} `}
                        products={product?.products}
                        index={index}
                    />)
                        : <Loader />
                }
            </div>
        </section>
    );
};

export default Products;