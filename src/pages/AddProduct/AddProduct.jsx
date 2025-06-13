import React from 'react';
import AddProductForm from './AddProductForm';

const AddProduct = () => {
    return (
        <div>
            <h3 className='text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-magenta-500 to-violet-500 tracking-tighter drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] orbitron text-center py-4 mt-8'>Add Your New Product</h3>
            <div className='my-10'>
                <AddProductForm/>
            </div>
        </div>
    );
};

export default AddProduct;