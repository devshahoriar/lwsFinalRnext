import BrodCam from '@/src/components/shared/BrodCam'
import Category from '@/src/components/ui/Category'
import PriceFilte from '@/src/components/ui/PriceFilte'
import RelatedProductItem from '@/src/components/ui/RelatedProductItem'
import dbConnect from '@/src/db/dbConnect'
import product_model from '@/src/models/product_model'

const page = async ({ searchParams: { category, max, min } }: any) => {
  const categoryArr = category?.split(',')
  const minNum = Number(min || 0)
  const maxNum = Number(max || 1000000)

  await dbConnect()
  const allcat = await product_model.distinct('category')
  const product = await product_model
    .find({
      $and: [
        { category: { $in: categoryArr } },
        { price: { $gte: minNum, $lte: maxNum } },
      ],
    })
    .select('title price rating stock thumbnail')
    .lean()

  return (
    <>
      <BrodCam title="Shop" />
      <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
        {/* ./sidebar */}
        <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hiddenb hidden md:block">
          <div className="divide-y divide-gray-200 space-y-5">
            <div>
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Categories
              </h3>
              <Category catgorys={allcat as any} />
            </div>
            <div className="pt-4">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Price
              </h3>
              <PriceFilte />
            </div>
            <div className="pt-4">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                size
              </h3>
              <div className="flex items-center gap-2">
                <div className="size-selector">
                  <input
                    type="radio"
                    name="size"
                    id="size-xs"
                    className="hidden"
                  />
                  <label
                    htmlFor="size-xs"
                    className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                  >
                    XS
                  </label>
                </div>
                <div className="size-selector">
                  <input
                    type="radio"
                    name="size"
                    id="size-sm"
                    className="hidden"
                  />
                  <label
                    htmlFor="size-sm"
                    className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                  >
                    S
                  </label>
                </div>
                <div className="size-selector">
                  <input
                    type="radio"
                    name="size"
                    id="size-m"
                    className="hidden"
                  />
                  <label
                    htmlFor="size-m"
                    className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                  >
                    M
                  </label>
                </div>
                <div className="size-selector">
                  <input
                    type="radio"
                    name="size"
                    id="size-l"
                    className="hidden"
                  />
                  <label
                    htmlFor="size-l"
                    className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                  >
                    L
                  </label>
                </div>
                <div className="size-selector">
                  <input
                    type="radio"
                    name="size"
                    id="size-xl"
                    className="hidden"
                  />
                  <label
                    htmlFor="size-xl"
                    className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                  >
                    XL
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* products */}
        <div className="col-span-3">
          <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
            {product.map((item: any) => (
              <RelatedProductItem key={item._id} product={item} />
            ))}
          </div>
        </div>
        {/* ./products */}
      </div>
    </>
  )
}

export default page
