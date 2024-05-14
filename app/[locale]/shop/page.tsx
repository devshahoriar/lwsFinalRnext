import BrodCam from '@/src/components/shared/BrodCam'
import Category from '@/src/components/ui/Category'
import LoadingUi from '@/src/components/ui/LoadingUi'
import PriceFilte from '@/src/components/ui/PriceFilte'
import ResetFilter from '@/src/components/ui/ResetFilter'
import ShopPageItems from '@/src/components/ui/ShopPageItems'
import SizeFilter from '@/src/components/ui/SizeFilter'
import dbConnect from '@/src/db/dbConnect'
import product_model from '@/src/models/product_model'
import { Suspense } from 'react'

const page = async ({ searchParams: { category, max, min, size } }: any) => {
  await dbConnect()
  const allcat = await product_model.distinct('category')
  return (
    <>
      <BrodCam title="Shop" />
      <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start relative">
   
        <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hiddenb hidden md:block sticky top-10">
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
              <SizeFilter />
            </div>
            <div className="pt-4">
              <ResetFilter />
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <Suspense  fallback={<LoadingUi />}>
            <ShopPageItems
              category={category}
              max={max}
              min={min}
              size={size}
            />
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default page
