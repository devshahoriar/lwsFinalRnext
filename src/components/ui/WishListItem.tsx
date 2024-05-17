import { auth } from '@/src/lib/auth'
import Image from 'next/image'
import Link from 'next/link'
import AddToCartButton from './AddToCartButton'
import WishItemDelete from './WishItemDelete'

const WishListItem = async ({ product: { product },wishId }: any) => {

 
  
  const { user } = ((await auth()) as any) || {}
  return (
    <div className="flex items-center justify-between border gap-6 p-4 border-gray-200 rounded">
      <div className="w-28">
        <Image
          src={product.thumbnail}
          alt="product 6"
          className="w-full object-cover"
          height={1000}
          width={1000}
        />
      </div>
      <div className="w-1/3">
        <Link
          href={`/product/${product._id}`}
          className="hover:text-primary text-gray-800"
        >
          <h2 className=" text-xl font-medium uppercase">{product.title}</h2>
        </Link>
        <p className="text-gray-500 text-sm">
          Availability:{' '}
          {product.stock > 0 ? (
            <span className="text-green-600">In Stock</span>
          ) : (
            <span className="text-primary">Out of Stock</span>
          )}
        </p>
      </div>
      <div className="text-primary text-lg font-semibold">${product.price}</div>
      <AddToCartButton uId={user?.id} pId={String(product._id)} className="!w-fit !rounded-md px-3" />
      <WishItemDelete uId={user?.id} pId={String(wishId)} />
    </div>
  )
}

export default WishListItem
