import React from 'react';
import { Rating } from 'react-simple-star-rating'

const ProductRating = ({ratingNumber}) => {



    return (
        <div>
            <Rating
                initialValue={ratingNumber}
                size={30}
                allowFraction={true}
                SVGclassName="inline-block"
                fillColor="#ffb400"
                emptyColor="#ccc"
                readonly 
            />
        </div>
    );
};

export default ProductRating;