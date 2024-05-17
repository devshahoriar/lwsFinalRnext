'use server'

import { revalidateTag } from 'next/cache'
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
    revalidateTag('usercart')
  }
}

export const removeFromCart = async (uId: String, cartId: String) => {
  await dbConnect()
  const cart = await cart_model.findOne({ user: uId })
  cart.products = cart.products.filter((p: any) => p._id != cartId)
  await cart.save()
  revalidateTag('usercart')
}

export const incrementCart = async (uId: String, cartId: String) => {
  await dbConnect()
  const cart = await cart_model.findOne({ user: uId })
  const product = cart.products.find((p: any) => p._id == cartId)
  product.quantity += 1
  await cart.save()
  revalidateTag('usercart')
}

export const decrementCart = async (uId: String, cartId: String) => {
  await dbConnect()
  const cart = await cart_model.findOne({ user: uId })
  const product = cart.products.find((p: any) => p._id == cartId)
  product.quantity -= 1
  await cart.save()
  revalidateTag('usercart')
}