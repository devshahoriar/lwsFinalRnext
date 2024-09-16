/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import Link from 'next/link'
import Reating from './Reating'
import AddToCartButton from './AddToCartButton'
import { auth } from '@/src/lib/auth'
import { HoverAddToWishButton } from './AddToWishList'

const ProductItem = async ({ p }: { p: any }) => {
  const { user } = ((await auth()) as any) || {}

  return (
    <div className="bg-white shadow rounded overflow-hidden group">
      <div className="relative">
        <img
          src={'https://random-image-pepebigotes.vercel.app/api/random-image'}
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
          <HoverAddToWishButton uId={user?.id} pId={String(p._id)} />
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
      <AddToCartButton uId={user?.id} pId={String(p._id)} className="w-full" />
    </div>
  )
}

export default ProductItem
