import React, { Suspense } from 'react';
import CategoryLayout from './CategoryLayout';
import CategoryHeader from '../../components/Headers/CategoryHeader'
import { getCategories } from '../../apis/categoryApi';

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
