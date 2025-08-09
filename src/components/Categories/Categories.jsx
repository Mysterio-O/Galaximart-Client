import React, { Suspense, useEffect } from 'react';
import CategoryLayout from './CategoryLayout';
import CategoryHeader from '../../components/Headers/CategoryHeader'
import { getCategories } from '../../apis/categoryApi';
import Loader from '../../Loaders/Product_Loader/Loader';
import CategorySkeletonLoader from '../../Loaders/CategorySkeletonLoader/CategorySkeletonLoader';

const Categories = () => {

    const productsPromise = getCategories();
    // console.log(productsPromise)

    useEffect(()=>{
        document.title="Product Categories"
    },[])

    return (
        <div>
            <CategoryHeader />
            <Suspense fallback={<CategorySkeletonLoader/>}>
                <CategoryLayout productsPromise={productsPromise} />
            </Suspense>
        </div>
    );
};

export default Categories;
