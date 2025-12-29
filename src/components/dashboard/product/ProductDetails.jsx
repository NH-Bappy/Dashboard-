import React from 'react'
import { useParams } from 'react-router';
import { getSingleProduct } from '../../../hooks/api';

const ProductDetails = () => {

    let {slug} = useParams()
    console.log(slug);

    const {data} = getSingleProduct(slug)
    console.log(data);



  return <div>ProductDetails</div>;
};

export default ProductDetails