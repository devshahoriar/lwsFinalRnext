import Image from 'next/image'
import Reating from './Reating'
import Link from 'next/link'
import { auth } from '@/src/lib/auth'
import AddToCartButton from './AddToCartButton'
import { HoverAddToWishButton } from './AddToWishList'

const RelatedProductItem = async ({ product }: { product: any }) => {
  const { user } = ((await auth()) as any) || {}
  return (
    <div className="bg-white shadow rounded overflow-hidden group">
      <div className="relative">
        <Image
          src={product.thumbnail}
          height={1000}
          width={1000}
          alt="product 1"
          className="w-ful aspect-video object-cover"
        />
        <div
          className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
              justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
        >
          <Link
            href={`/product/${product._id}`}
            className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
            title="view product"
          >
            <i className="fa-solid fa-magnifying-glass" />
          </Link>
          <HoverAddToWishButton uId={user?.id} pId={String(product?._id)} />
        </div>
      </div>
      <div className="pt-4 pb-3 px-4">
        <Link href={`/product/${product._id}`}>
          <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition line-clamp-1">
            {product.title}
          </h4>
        </Link>
        <div className="flex items-baseline mb-1 space-x-2">
          <p className="text-xl text-primary font-semibold">
            ${product.price}.00
          </p>
          <p className="text-sm text-gray-400 line-through">
            ${product.price - 10}.00
          </p>
        </div>
        <div className="flex items-center">
          <Reating p={product.rating} />
          <div className="text-xs text-gray-500 ml-3">({product.stock})</div>
        </div>
      </div>
      <AddToCartButton pId={String(product?._id)} uId={user?.id} className="w-full" />
    </div>
  )
}

export default RelatedProductItem
