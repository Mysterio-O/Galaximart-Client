import React from 'react';

const ProductTitle = ({product}) => {

    const maxTotalLength = 20;
    const brandFirst = `${product?.brand} ${product?.name}`
    
    if(brandFirst.length <= maxTotalLength){
        return(
            <h2 className='card-title text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-violet-400 tracking-tight [text-shadow:_0_2px_4px_rgba(0,0,0,0.3)]'>
                {product?.name} {product?.brand}
            </h2>
        );
    };

    const availableSpace = maxTotalLength - product?.brand.length - 4;
    const truncatedName = availableSpace > 3 ? `${product?.name.substring(0, availableSpace, -3)}...`
    : '...'

    return (
        <h2 
        title={`${product?.name} (${product?.brand})`}
        className='card-title text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-violet-400 tracking-tight [text-shadow:_0_2px_4px_rgba(0,0,0,0.3)]'
        >
            {truncatedName} {product?.brand}
        </h2>
    );
};

export default ProductTitle;