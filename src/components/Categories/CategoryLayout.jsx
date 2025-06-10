import React, { use } from 'react';
import CategoryShape from './CategoryShape';

const CategoryLayout = ({ productsPromise }) => {
    const productLists = use(productsPromise);
    console.log(productLists, typeof productLists, Array.isArray(productLists));
    return (
        <div id='categories' className='max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4'>
{
    productLists.map((product, index) => <CategoryShape key={product._id} product={product} index={index}/>)
}
        </div>
    );
};

export default CategoryLayout;