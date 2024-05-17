/* eslint-disable @next/next/no-img-element */
import logo from '@/public/images/logo.svg'
import { auth } from '@/src/lib/auth'
import Image from 'next/image'
import Link from 'next/link'
import LangChange from '../ui/LangChange'

import { unstable_cache } from 'next/cache'
import cart_model from '@/src/models/cart_model'
import wishList_model from '@/src/models/wishList_model'

const getCachedGuides = unstable_cache(
  (id) => cart_model.findOne({ user: id }).populate('products.product', '_id'),
  undefined,
  { tags: ['usercart'] }
)

const getCachedWishList = unstable_cache(
  (uId) => wishList_model.findOne({ user: uId }),
  undefined,
  { tags: ['userwishlist'] }
)

const Header = async () => {
  const { user } = ((await auth()) as any) || {}
  let carts = user?.id && (await getCachedGuides(user.id))
  let { products } = (user?.id && (await getCachedWishList(user.id))) || {
    products: [],
  }

  const cartCount = carts?.products?.length || 0

  return (
    <header className="py-4 shadow-sm bg-white">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Image src={logo} alt="Logo" className="w-32" />
        </Link>
        <div className="w-full max-w-xl relative flex">
          <span className="absolute left-4 top-3 text-lg text-gray-400">
            <i className="fa-solid fa-magnifying-glass" />
          </span>
          <input
            type="text"
            name="search"
            id="search"
            className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none hidden md:flex"
            placeholder="search"
          />
          <button className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition hidden md:flex md:justify-center md:items-center">
            Search
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <LangChange />
          <Link
            href={user ? '/wishlist' : '/login'}
            className="text-center text-gray-700 hover:text-primary transition relative"
          >
            <div className="text-2xl">
              <i className="fa-regular fa-heart" />
            </div>
            <div className="text-xs leading-3">Wishlist</div>
            <div className="absolute -right-1 -top-1 size-4 rounded-full flex items-center justify-center bg-primary text-white text-xs">
              {products?.length || 0}
            </div>
          </Link>
          <Link
            href={user ? '/checkout' : '/login'}
            className="text-center text-gray-700 hover:text-primary transition relative"
          >
            <div className="text-2xl">
              <i className="fa-solid fa-bag-shopping" />
            </div>
            <div className="text-xs leading-3">Cart</div>
            <div className="absolute -right-2 -top-1 size-4 rounded-full flex items-center justify-center bg-primary text-white text-xs">
              {cartCount}
            </div>
          </Link>
          <Link
            href={user ? '/account' : '/login'}
            className="text-center text-gray-700 hover:text-primary transition relative flex items-center justify-center flex-col"
          >
            {user ? (
              <>
                {user?.image ? (
                  <>
                    <img
                      src={user.image}
                      alt="User"
                      className="w-8 h-8 rounded-full border border-gray-300"
                    />
                    <div className="text-xs leading-3">
                      {user.name.split(' ')[0]}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-2xl">
                      <i className="fa-regular fa-user" />
                    </div>
                    <div className="text-xs leading-3">
                      {user.name.split(' ')[0]}
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <div className="text-2xl">
                  <i className="fa-regular fa-user" />
                </div>
                <div className="text-xs leading-3">Account</div>
              </>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
