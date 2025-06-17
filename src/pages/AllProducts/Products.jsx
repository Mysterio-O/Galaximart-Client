import React, { use } from 'react';
import ProductCardShape from './ProductCardShape';
const Products = ({ productsPromise }) => {
    const products = use(productsPromise);
    console.log(products);
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
            {
                products.map((product, index) => <ProductCardShape product={product} index={index} key={product._id}/>)
            }
        </div>
    );
};

export default Products;