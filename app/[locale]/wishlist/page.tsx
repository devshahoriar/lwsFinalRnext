import BrodCam from '@/src/components/shared/BrodCam'
import WishListItem from '@/src/components/ui/WishListItem'
import React from 'react'

const page = () => {
  return (
    <>
      <BrodCam title="Wishlist" />
      <div className="container gap-6 pt-4 pb-16">
        {/* wishlist */}
        <div className="mx-auto space-y-4 max-w-6xl">
          <WishListItem />
          <WishListItem />
          <WishListItem />
        </div>
        {/* ./wishlist */}
      </div>
    </>
  )
}

export default page
