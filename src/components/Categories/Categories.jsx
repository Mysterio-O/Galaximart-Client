import React, { Suspense, useEffect } from 'react';
import CategoryLayout from './CategoryLayout';
import CategoryHeader from '../../components/Headers/CategoryHeader'
import { getCategories } from '../../apis/categoryApi';
import Loader from '../../Loaders/Product_Loader/Loader';

const Categories = () => {

    const productsPromise = getCategories();
    // console.log(productsPromise)

    useEffect(()=>{
        document.title="Product Categories"
    },[])

    return (
        <div>
            <CategoryHeader />
            <Suspense fallback={<Loader/>}>
                <CategoryLayout productsPromise={productsPromise} />
            </Suspense>
        </div>
    );
};

export default Categories;
