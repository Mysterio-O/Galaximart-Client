import React, { use } from 'react';

const MyProductsShape = ({productsPromise}) => {
    
    const products = use(productsPromise);
    console.log(products);

    return (
        <div>
            
        </div>
    );
};

export default MyProductsShape;