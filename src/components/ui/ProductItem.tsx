import Image from 'next/image'
import Link from 'next/link'
import Reating from './Reating'

const ProductItem = ({ p }: { p: any }) => {
  return (
    <div className="bg-white shadow rounded overflow-hidden group">
      <div className="relative">
        <Image
          src={p?.thumbnail}
          alt="product 1"
          className="w-full aspect-square object-cover"
          width={1000}
          height={1000}
        />
        <div
          className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
              justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
        >
          <Link
            href={`/product/${p._id}`}
            className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
            title="view product"
          >
            <i className="fa-solid fa-magnifying-glass" />
          </Link>
          <a
            href="#"
            className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
            title="add to wishlist"
          >
            <i className="fa-solid fa-heart" />
          </a>
        </div>
      </div>
      <div className="pt-4 pb-3 px-4">
        <Link href={`/product/${p._id}`}>
          <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition line-clamp-1">
            {p?.title}
          </h4>
        </Link>
        <div className="flex items-baseline mb-1 space-x-2">
          <p className="text-xl text-primary font-semibold">${p.price}</p>
          <p className="text-sm text-gray-400 line-through">${p.price + 10}</p>
        </div>
        <div className="flex items-center" title={p.rating}>
          <Reating p={p.rating} />
          <div className="text-xs text-gray-500 ml-3">({p.stock})</div>
        </div>
      </div>
      <a
        href="#"
        className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
      >
        Add to cart
      </a>
    </div>
  )
}

export default ProductItem
