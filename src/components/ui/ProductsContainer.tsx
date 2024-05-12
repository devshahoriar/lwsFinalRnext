import ProductItem from './ProductItem'

type ProductsContainerProps = {
  title: String
  products: Array<any>
}

const ProductsContainer = ({ title, products }: ProductsContainerProps) => {
  return (
    <div className="container pb-16">
      <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductItem key={product._id} p={product} />
        ))}
      </div>
    </div>
  )
}

export default ProductsContainer
