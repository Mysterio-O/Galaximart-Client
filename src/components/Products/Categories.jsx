import React, { Suspense } from 'react';
import { getCategories } from '../../apis/products_api';
import CategoryLayout from './CategoryLayout';

const Categories = () => {
    const products = getCategories();
    // console.log(products, typeof products, Array.isArray(products));
    return (
        <div>
            <Suspense fallback={'loading...'}>
                <CategoryLayout products={products}/>
            </Suspense>
        </div>
    );
};

export default Categories;
