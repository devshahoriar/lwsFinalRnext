import BrodCam from '@/src/components/shared/BrodCam'
import AddToCartButton from '@/src/components/ui/AddToCartButton'
import AddToWishList from '@/src/components/ui/AddToWishList'
import ProductImageS from '@/src/components/ui/ProductImageS'
import Reating from '@/src/components/ui/Reating'
import RelatedProductItem from '@/src/components/ui/RelatedProductItem'
import dbConnect from '@/src/db/dbConnect'
import { auth } from '@/src/lib/auth'
import product_model from '@/src/models/product_model'
import { PUBLIC_URL } from '@/src/utils/conts'
import { redirect } from 'next/navigation'

export const dynamic = 'force-static'

const page = async ({ params: { id } }: any) => {
  const { user } = ((await auth()) as any) || {}
  await dbConnect()
  const product = await product_model.findById(id)
  if (product === null) {
    redirect('/404')
  }
  product.visited = 1 + product.visited || 0
  await product.save()

  const relatedProduct = await product_model
    .find({
      $and: [{ category: product.category }, { _id: { $ne: product._id } }],
    })
    .limit(4)
    .select('title price rating stock thumbnail')
    .lean()

  return (
    <>
      <BrodCam title="Product" />
      <>
        {/* product-detail */}
        <div className="container grid grid-cols-2 gap-6">
          <ProductImageS images={product.images} />
          <div>
            <h2 className="text-3xl font-medium uppercase mb-2">
              {product.title}
            </h2>
            <div className="flex items-center mb-4">
              <Reating p={product.rating} />
              <div className="text-xs text-gray-500 ml-3">(150 Reviews)</div>
            </div>
            <div className="space-y-2">
              <p className="text-gray-800 font-semibold space-x-2">
                <span>Availability: </span>
                <span className="text-green-600">In Stock</span>
              </p>
              <p className="space-x-2">
                <span className="text-gray-800 font-semibold">Brand: </span>
                <span className="text-gray-600">{product.brand}</span>
              </p>
              <p className="space-x-2">
                <span className="text-gray-800 font-semibold">Category: </span>
                <span className="text-gray-600">{product.category}</span>
              </p>
              <p className="space-x-2">
                <span className="text-gray-800 font-semibold">SKU: </span>
                <span className="text-gray-600">BE45VGRT</span>
              </p>
            </div>
            <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
              <p className="text-xl text-primary font-semibold">
                ${product.price}
              </p>
              <p className="text-base text-gray-400 line-through">
                ${product.price + 10}
              </p>
            </div>
            <p className="mt-4 text-gray-600">{product.description}</p>
            <div className="mt-4">
              <h3 className="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
              <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
                <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
                  -
                </div>
                <div className="h-8 w-8 text-base flex items-center justify-center">
                  4
                </div>
                <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
                  +
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
              <AddToCartButton
                icon={<i className="fa-solid fa-bag-shopping" />}
                pId={String(product._id)}
                uId={user?.id}
                className="!rounded-md  flex gap-3 items-center w-fit px-3"
              />
              <AddToWishList
                pId={String(product._id)}
                uId={user?.id}
                className="!rounded-md  flex gap-3 items-center w-fit px-3"
              />
            </div>
            <div className="flex gap-3 mt-4">
              <a
                href={`https://www.facebook.com/sharer.php?u=${PUBLIC_URL}/product/${product?._id}`}
                target="_blank"
                className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
              >
                <i className="fa-brands fa-facebook-f" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${PUBLIC_URL}/product/${product?._id}`}
                target="_blank"
                className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
              >
                <i className="fa-brands fa-twitter" />
              </a>
              <a
                href={`https://www.instagram.com/sharer.php?u=${PUBLIC_URL}/product/${product?._id}`}
                target="_blank"
                className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
              >
                <i className="fa-brands fa-instagram" />
              </a>
            </div>
          </div>
        </div>
        {/* ./product-detail */}
        {/* description */}
        <div className="container pb-16">
          <h3 className="border-b border-gray-200 font-roboto text-gray-800 pb-3 font-medium">
            Product details
          </h3>
          <div className="w-3/5 pt-6">
            <div className="text-gray-600">
              <p>{product.longDescription}</p>
            </div>
          </div>
        </div>
        {/* ./description */}
        {/* related product */}
        <div className="container pb-16">
          <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
            Related products
          </h2>
          <div className="grid grid-cols-4 gap-6">
            {relatedProduct.map((p: any) => (
              <RelatedProductItem key={p._id} product={p} />
            ))}
          </div>
        </div>
        {/* ./related product */}
      </>
    </>
  )
}

export const generateStaticParams = async () => {
  await dbConnect()
  const products = await product_model.find().select('_id').lean()
  return products.map((product) => ({
    params: { id: String(product._id) },
  }))
}

export async function generateMetadata({ params: { id } }: any) {
  const product = (await product_model
    .findById(id)
    .select('title description price brand thumbnail')
    .lean()) as any

  if (product === null) {
    return
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      images: [product?.thumbnail],
    },
  }
}

export default page
