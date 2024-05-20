import BrodCam from '@/src/components/shared/BrodCam'
import CartItemControl from '@/src/components/ui/CartItemControl'
import CheckOutButton from '@/src/components/ui/CheckOutButton'
import CheckOutForm from '@/src/components/ui/CheckOutForm'
import dbConnect from '@/src/db/dbConnect'
import { auth } from '@/src/lib/auth'
import accountDetails_model from '@/src/models/accountDetails_model'
import cart_model from '@/src/models/cart_model'
import user_model from '@/src/models/user_model'
import Link from 'next/link'

const page = async () => {
  const { user } = ((await auth()) as any) || {}
  await dbConnect()
  const { products, _id } = (await cart_model
    .findOne({ user: user?.id })
    .populate('products.product', 'title price size _id')) || { products: [] }
  const totalPrice = products.reduce((acc: any, curr: any) => {
    return acc + curr.product.price * curr.quantity
  }, 0)
  const { shippingAddress } = await accountDetails_model.findOne({
    user: user.id,
  }).select('shippingAddress')  || { shippingAddress: {} }
  const { phone } = (await user_model
    .findById(user.id)
    .select('phone')
    .lean()) as any
  const data = {
    fName: user?.name?.split(' ')[0],
    lName: user?.name?.split(' ')[1],
    email: user?.email,
    phone: phone,
    Street: shippingAddress?.state,
    city: shippingAddress?.area,
  }

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

              <CheckOutForm data={data} id={String(_id)} />
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
              <CheckOutButton />
            </div>
          </div>
        )}
      </>
    </>
  )
}

export default page
