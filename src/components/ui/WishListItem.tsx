import p1 from '@/public/images/products/product1.jpg'
import Image from 'next/image'

const WishListItem = () => {
  return (
    <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
      <div className="w-28">
        <Image src={p1} alt="product 6" className="w-full" />
      </div>
      <div className="w-1/3">
        <h2 className="text-gray-800 text-xl font-medium uppercase">
          Italian L shape
        </h2>
        <p className="text-gray-500 text-sm">
          Availability: <span className="text-green-600">In Stock</span>
        </p>
      </div>
      <div className="text-primary text-lg font-semibold">$320.00</div>
      <a
        href="#"
        className="px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
      >
        add to cart
      </a>
      <div className="text-gray-600 cursor-pointer hover:text-primary">
        <i className="fa-solid fa-trash" />
      </div>
    </div>
  )
}

export default WishListItem
