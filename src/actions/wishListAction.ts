'use server'
import { revalidateTag } from 'next/cache'
import dbConnect from '../db/dbConnect'
import wishList_model from '../models/wishList_model'

export const addWishList = async (uId: String, pId: String) => {
  await dbConnect()
  const prevWishList = await wishList_model.findOne({ user: uId })
  if (!prevWishList) {
    const newWishList = new wishList_model({
      user: uId,
      products: [{ product: pId }],
    })
    await newWishList.save()
  } else {
    const product = prevWishList.products.find((p: any) => p.product._id == pId)
    if (!product) {
      prevWishList.products.push({ product: pId })
    }
    await prevWishList.save()
  }
  revalidateTag('userwishlist')
}

export const deleteFromWish = async (uId: String, pId: String) => {
  await dbConnect()
  const prevWishList = await wishList_model.findOne({ user: uId })
  if (!prevWishList) return
  prevWishList.products = prevWishList.products.filter((p: any) => {
    return String(p._id) !== pId
  })
  await prevWishList.save()

  revalidateTag('userwishlist')
}
