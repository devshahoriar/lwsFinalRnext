import BrodCam from '@/src/components/shared/BrodCam'
import CartItemControl from '@/src/components/ui/CartItemControl'
import { auth } from '@/src/lib/auth'
import cart_model from '@/src/models/cart_model'
import Link from 'next/link'

const page = async () => {
  const { user } = ((await auth()) as any) || {}
  const { products } = (await cart_model
    .findOne({ user: user?.id })
    .populate('products.product', 'title price size _id')) || { products: [] }
  const totalPrice = products.reduce((acc: any, curr: any) => {
    return acc + curr.product.price * curr.quantity
  }, 0)

  return (
    <>
      <BrodCam title="Cart" />
      <>
        {products.length === 0 ? (
          <div className="container flex items-center justify-center h-96 flex-col">
            <h3 className="text-gray-800 text-lg font-medium">
              Your cart is empty
            </h3>
            <Link href="/shop" className="text-primary">
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6">
            <div className="col-span-7 border border-gray-200 p-4 rounded">
              <h3 className="text-lg font-medium capitalize mb-4">Checkout</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="first-name" className="text-gray-600">
                      First Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      className="input-box"
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="text-gray-600">
                      Last Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      className="input-box"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="company" className="text-gray-600">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    className="input-box"
                  />
                </div>
                <div>
                  <label htmlFor="region" className="text-gray-600">
                    Country/Region
                  </label>
                  <input
                    type="text"
                    name="region"
                    id="region"
                    className="input-box"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="text-gray-600">
                    Street address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="input-box"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="text-gray-600">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    className="input-box"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="text-gray-600">
                    Phone number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="input-box"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-gray-600">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="input-box"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="text-gray-600">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    className="input-box"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-5 border border-gray-200 p-4 rounded">
              <h4 className="text-gray-800 text-lg mb-4 font-medium uppercase">
                order summary
              </h4>
              <div className="space-y-2">
                <CartItemControl uid={user?.id} products={products} />
              </div>
              <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
                <p>subtotal</p>
                <p>${totalPrice}</p>
              </div>
              <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium py-3 uppercas">
                <p>shipping</p>
                <p>Free</p>
              </div>
              <div className="flex justify-between text-gray-800 font-medium py-3 uppercas">
                <p className="font-semibold">Total</p>
                <p>${totalPrice}</p>
              </div>
              <div className="flex items-center mb-4 mt-2">
                <input
                  type="checkbox"
                  name="aggrement"
                  id="aggrement"
                  className="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3"
                />
                <label
                  htmlFor="aggrement"
                  className="text-gray-600 ml-3 cursor-pointer text-sm"
                >
                  I agree to the{' '}
                  <a href="#" className="text-primary">
                    terms &amp; conditions
                  </a>
                </label>
              </div>
              <a
                href="#"
                className="block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium"
              >
                Place order
              </a>
            </div>
          </div>
        )}
      </>
    </>
  )
}

export default page
