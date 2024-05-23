'use server'

import { revalidateTag } from 'next/cache'
import cart_model from '../models/cart_model'
import { Resend } from 'resend'
import order_model from '../models/order_model'
import { redirect } from 'next/navigation'
import getMailString from '../utils/getMailString'

export const checkOut = async (prevState: any, data: FormData) => {
  let id
  try {
    const req = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      company: data.get('company'),
      region: data.get('region'),
      address: data.get('address'),
      city: data.get('city'),
      phone: data.get('phone'),
      email: data.get('email'),
      cart: data.get('cart'),
    } as any
    if (req.cart === '') {
      return { error: 'Please add some product' }
    }

    if (req.firstName === '' || req.lastName === '') {
      return { error: 'First name and last name are required' }
    }
    const { products, user } = (await cart_model
      .findById(req.cart)
      .populate('products.product', 'title price thumbnail size')) || {
      products: [],
    }

    if (products.length === 0) {
      return { error: 'Please add some product' }
    }
    const totalPrice = products.reduce((acc: any, curr: any) => {
      return acc + curr.product.price * curr.quantity
    }, 0)
    const orderProduct = products.map((p: any) => ({
      product: String(p.product._id),
      quantity: p.quantity,
    }))

    const dataOrder = {
      user: String(user),
      status: 'delivered',
      products: [...orderProduct],
      orderAddress: {
        fName: req.firstName,
        lName: req.lastName,
        company: req.company,
        country: req.region,
        state: req.address,
        city: req.city,
        phone: req.phone,
        email: req.email,
      },
    }

    const order = new order_model(dataOrder)
    await order.save()

    await cart_model.findByIdAndDelete(req.cart)
    revalidateTag('usercart')
    const html = getMailString({
      order: {
        status: order.status,
        _id: String(order._id),
        city: String(order.orderAddress.city),
        state: String(order.orderAddress.state),
      },
      user: {
        fName: req.firstName,
        lName: req.lastName,
        email: req.email,
        phone: req.phone,
      },
      products: products,
      totalPrice: totalPrice,
    })

    const resend = new Resend(process.env.RESEND_KEY)
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [req.email as any],
      subject: 'Order placed successfully',
      html: html,
    })
    id = String(order._id)
  } catch (error) {
    console.log(error)
    throw error
  }
  redirect('/order/' + id)
}
