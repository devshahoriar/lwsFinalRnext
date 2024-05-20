'use server'

import { revalidateTag } from 'next/cache'
import cart_model from '../models/cart_model'
import { Resend } from 'resend'
import order_model from '../models/order_model'
import { redirect } from 'next/navigation'

export const checkOut = async (prevState: any, data: FormData) => {
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
    }
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
    const dataOrder = {
      user: String(user),
      status: 'delivered',
      products,
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
    const html = `<html>
    <body
      style="
        background-color: #e2e1e0;
        font-family: Open Sans, sans-serif;
        font-size: 100%;
        font-weight: 400;
        line-height: 1.4;
        color: #000;
      "
    >
      <table
        style="
          max-width: 670px;
          margin: 50px auto 10px;
          background-color: #fff;
          padding: 50px;
          -webkit-border-radius: 3px;
          -moz-border-radius: 3px;
          border-radius: 3px;
          -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
          -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
          border-top: solid 10px green;
        "
      >
        <thead>
          <tr>
            <th style="text-align: left">
              <img
                style="width: 50px;height: 50px"
                src="https://lws-final-rnext.vercel.app/og-image.png"
                alt="bachana tours"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="height: 35px"></td>
          </tr>
          <tr>
            <td colspan="2" style="border: solid 1px #ddd; padding: 10px 20px">
              <p style="font-size: 14px; margin: 0 0 6px 0">
                <span
                  style="
                    font-weight: bold;
                    display: inline-block;
                    min-width: 150px;
                  "
                  >Order status</span
                ><b style="color: green; font-weight: normal; margin: 0"
                  >${order.status}</b
                >
              </p>
              <p style="font-size: 14px; margin: 0 0 6px 0">
                <span
                  style="
                    font-weight: bold;
                    display: inline-block;
                    min-width: 146px;
                  "
                  >Transaction ID</span
                >
                ${String(order._id)}
              </p>
              <p style="font-size: 14px; margin: 0 0 0 0">
                <span
                  style="
                    font-weight: bold;
                    display: inline-block;
                    min-width: 146px;
                  "
                  >Order amount</span
                >
                Rs. ${totalPrice}
              </p>
            </td>
          </tr>
          <tr>
            <td style="height: 35px"></td>
          </tr>
          <tr>
            <td style="width: 50%; padding: 20px; vertical-align: top">
              <p style="margin: 0 0 10px 0; padding: 0; font-size: 14px">
                <span style="display: block; font-weight: bold; font-size: 13px"
                  >Name</span
                >
                ${req?.firstName ? req.firstName : ''} ${
      req?.lastName ? req.lastName : ''
    }
              </p>
              <p style="margin: 0 0 10px 0; padding: 0; font-size: 14px">
                <span style="display: block; font-weight: bold; font-size: 13px"
                  >Email</span
                >
                ${req?.email ? req.email : 'Not provided'}
              </p>
              <p style="margin: 0 0 10px 0; padding: 0; font-size: 14px">
                <span style="display: block; font-weight: bold; font-size: 13px"
                  >Phone</span
                >
                ${req?.phone ? req.phone : 'Not provided'}
              </p>
              
            </td>
            <td style="width: 50%; padding: 20px; vertical-align: top">
              <p style="margin: 0 0 10px 0; padding: 0; font-size: 14px">
                <span style="display: block; font-weight: bold; font-size: 13px"
                  >Address</span
                >
                ${
                  order?.orderAddress?.state ? order?.orderAddress?.state : ''
                }, ${order?.orderAddress?.city ? order?.orderAddress?.city : ''}
              </p>
              
            </td>
          </tr>
          <tr>
            <td colspan="2" style="font-size: 20px; padding: 30px 15px 0 15px">
              Items
            </td>
          </tr>
          <tr>
            <td colspan="2" style="padding: 15px">

            ${products
              .map(
                (product: any) => `
              <p
                style="
                  font-size: 14px;
                  margin: 0;
                  padding: 10px;
                  border: solid 1px #ddd;
                  font-weight: bold;
                "
              >
                <span style="display: block; font-size: 13px; font-weight: normal"
                  >${product?.product?.title}</span
                >
                Rs. ${product?.product?.price}
                <b style="font-size: 12px; font-weight: 300"> size:${product?.product?.size} | quantity ${product?.quantity}</b>
              </p>
              `
              )
              .join('')
              .toString()}            
            </td>
          </tr>
        </tbody>
        <tfooter>
          <tr>
            <td colspan="2" style="font-size: 14px; padding: 50px 15px 0 15px">
              <strong style="display: block; margin: 0 0 10px 0">LWS Shop
            </td>
          </tr>
        </tfooter>
      </table>
    </body>
  </html>
  `
    const resend = new Resend(process.env.RESEND_KEY)
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [req.email as any],
      subject: 'Order placed successfully',
      html: html,
    })

    return { success: 'Order placed successfully', id: order._id }
  } catch (error) {
    throw new Error(error as any)
  }
}
