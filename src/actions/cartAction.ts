'use server'

import dbConnect from '../db/dbConnect'
import cart_model from '../models/cart_model'

export const addToCart = async (uId: String, pId: String) => {
  await dbConnect()
  const prevCart = await cart_model
    .findOne({ user: uId })
    .populate('products.product', '_id')
  if (!prevCart) {
    const newCart = new cart_model({
      user: uId,
      products: [{ product: pId }],
    })
    await newCart.save()
  } else {
    const product = prevCart.products.find((p: any) => p.product._id == pId)
    if (product) {
      product.quantity += 1
    } else {
      prevCart.products.push({ product: pId })
    }
    await prevCart.save()
  }
}
