import dbConnect from '@/src/db/dbConnect'
import product_model from '@/src/models/product_model'
import React from 'react'
import RelatedProductItem from './RelatedProductItem'

const ShopPageItems = async ({ category, max, min, size }: any) => {
  const categoryArr = category?.split(',')
  const minNum = Number(min || 0)
  const maxNum = Number(max || 1000000)

  await dbConnect()
  const product = await product_model
    .find({
      $and: [
        ...(category ? [{ category: { $in: categoryArr } }] : []),
        { $and: [{ price: { $gte: minNum } }, { price: { $lte: maxNum } }] },
        ...(size ? [{ size: size }] : []),
      ],
    })
    .select('title price rating stock thumbnail')
  return (
    <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
      {product.map((item: any) => (
        <RelatedProductItem key={item._id} product={item} />
      ))}
    </div>
  )
}

export default ShopPageItems
