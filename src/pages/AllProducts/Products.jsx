import React, { use, useEffect, useState } from 'react';
import ProductCardShape from './ProductCardShape';
const Products = ({ productsPromise }) => {
    const [allProducts, setAllProducts] = useState([]);
    const products = use(productsPromise);
    // console.log(products);

    useEffect(() => {
        const combinedProducts = products.reduce((acc, product) => {
            return [...acc, ...product.products]
        }, []);
        setAllProducts(combinedProducts)
    }, [products])
    console.log(allProducts);
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
            {
                allProducts.map((product, index) => <ProductCardShape product={product} index={index} key={product._id}/>)
            }
        </div>
    );
};

export default Products;