import React, { Suspense } from 'react';
import CategoryLayout from './CategoryLayout';
import CategoryHeader from '../../components/Headers/CategoryHeader'
import { getCategories } from '../../apis/categoryApi';

const Categories = () => {

    const productsPromise = getCategories();

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
