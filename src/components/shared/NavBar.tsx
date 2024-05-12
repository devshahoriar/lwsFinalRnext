import { auth } from '@/src/lib/auth'
import product_model from '@/src/models/product_model'
import Link from 'next/link'
import SignOut from '../ui/SignOut'
import dbConnect from '@/src/db/dbConnect'

const NavBar = async () => {
  await dbConnect()
  const { user } = ((await auth()) as any) || {}
  const allcat = await product_model.distinct('category')

  return (
    <nav className="bg-gray-800">
      <div className="container flex">
        <div className="px-8 py-4 bg-primary md:flex items-center cursor-pointer relative group hidden">
          <span className="text-white">
            <i className="fa-solid fa-bars" />
          </span>
          <span className="capitalize ml-2 text-white">All Categories</span>
          {/* dropdown */}
          <div className="absolute left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible w-[200px] max-h-[290px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
            {allcat.map((cat) => (
              <Link
                key={cat}
                href={`/shop?category=${cat}`}
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition capitalize"
              >
                <span className="ml-6 text-gray-600 text-sm">{cat}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between flex-grow md:pl-12 py-5">
          <div className="flex items-center space-x-6 capitalize">
            <Link
              href="/"
              className="text-gray-200 hover:text-white transition"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="text-gray-200 hover:text-white transition"
            >
              Shop
            </Link>
            <Link
              href="#"
              className="text-gray-200 hover:text-white transition"
            >
              About us
            </Link>
            <Link
              href="#"
              className="text-gray-200 hover:text-white transition"
            >
              Contact us
            </Link>
          </div>
          {user ? (
            <SignOut />
          ) : (
            <Link
              href="/login"
              className="text-gray-200 hover:text-white transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
