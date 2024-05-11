import React from 'react'
import ProductItem from './ProductItem'

type ProductsContainerProps = {
  title: String
}

const ProductsContainer = ({title}: ProductsContainerProps) => {
  return (
    <div className="container pb-16">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </div>
    </div>
  )
}

export default ProductsContainer
