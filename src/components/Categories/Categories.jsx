import React, { Suspense } from 'react';
import { getCategories } from '../../apis/products_api';
import CategoryLayout from './CategoryLayout';
import CategoryHeader from '../../components/Headers/CategoryHeader'

const Categories = () => {
    const productsPromise = getCategories();
    // console.log(products, typeof products, Array.isArray(products));
    return (
        <div>
            <CategoryHeader />
            <Suspense fallback={'loading...'}>
                <CategoryLayout productsPromise={productsPromise} />
            </Suspense>
        </div>
    );
};

export default Categories;
