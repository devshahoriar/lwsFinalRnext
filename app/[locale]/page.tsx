import HomeAdd from '@/src/components/ui/HomeAdd'
import HomeBanner from '@/src/components/ui/HomeBanner'
import HomeCategorys from '@/src/components/ui/HomeCategorys'
import HomeFetchers from '@/src/components/ui/HomeFetchers'
import ProductsContainer from '@/src/components/ui/ProductsContainer'
import dbConnect from '@/src/db/dbConnect'
import product_model from '@/src/models/product_model'

export default async function Home() {
  await dbConnect()
  const topProduct = await product_model
    .find()
    .limit(4)
    .sort({ createdAt: -1 })
    .select('title price rating stock thumbnail')
    .lean()
  const trendProduct = await product_model
    .find()
    .limit(4)
    .sort({ visited: -1 })
    .select('title price rating stock thumbnail')
    .lean()

  return (
    <>
      <HomeBanner />
      <HomeFetchers />
      <HomeCategorys />
      <ProductsContainer products={topProduct} title={'top new arrival'} />
      <HomeAdd />
      <ProductsContainer products={trendProduct} title={'TRENDING PRODUCTS'} />
    </>
  )
}
