import HomeAdd from '@/src/components/ui/HomeAdd'
import HomeBanner from '@/src/components/ui/HomeBanner'
import HomeCategorys from '@/src/components/ui/HomeCategorys'
import HomeFetchers from '@/src/components/ui/HomeFetchers'
import ProductsContainer from '@/src/components/ui/ProductsContainer'
import { auth } from '@/src/lib/auth'

export default async function Home() {
  const s =await auth()
  console.log(s);
  
  return (
    <>
      <HomeBanner />
      <HomeFetchers />
      <HomeCategorys />
      <ProductsContainer title={'top new arrival'} />
      <HomeAdd />
      <ProductsContainer title={'TRENDING PRODUCTS'} />
    </>
  )
}
