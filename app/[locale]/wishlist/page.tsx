import BrodCam from '@/src/components/shared/BrodCam'
import WishListItem from '@/src/components/ui/WishListItem'
import dbConnect from '@/src/db/dbConnect'
import { auth } from '@/src/lib/auth'
import wishList_model from '@/src/models/wishList_model'
import Link from 'next/link'
import React from 'react'

const page = async () => {
  const { user } = (await auth()) || {}
  await dbConnect()
  const { products } = (await wishList_model
    .findOne({ user: user?.id })
    .populate('products.product', 'title thumbnail price stock')
    .lean()) as any || { products: [] }

  return (
    <>
      <BrodCam title="Wishlist" />
      <div className="container gap-6 pt-4 pb-16">
        {/* wishlist */}
        <div className="mx-auto space-y-4 max-w-6xl">
          {products?.length === 0 ? (
            <div className="container flex items-center justify-center h-96 flex-col">
              <h3 className="text-gray-800 text-lg font-medium">
                Your wishlist is empty
              </h3>
              <Link href="/shop" className="text-primary">
                Continue shopping
              </Link>
            </div>
          ) : (
            products?.map((product: any) => (
              <WishListItem
                key={product._id}
                product={product}
                wishId={product?._id}
              />
            ))
          )}
        </div>
        {/* ./wishlist */}
      </div>
    </>
  )
}

export default page
