'use server'

import { revalidatePath } from 'next/cache'
import dbConnect from '../db/dbConnect'
import user_model from '../models/user_model'
import accountDetails_model from '../models/accountDetails_model'

export const editUser = async (data: any) => {
  await dbConnect()
  try {
    const { name, email, phone, id } = data
    const user = await user_model.findById(id)
    const emailEdit = Boolean(user?.password)
    if (emailEdit) {
      user.name = name
      user.email = email
    }
    user.phone = phone
    await user.save()
    revalidatePath('/account')
  } catch (error) {
    throw new Error(error as any)
  }
}

export const editAddress = async (data: any) => {
  await dbConnect()
  try {
    const { shippingAddress, billingAddress, id } = data
    await accountDetails_model.findOneAndUpdate(
      { user: id },
      { shippingAddress, billingAddress, user: id },
      { new: true, upsert: true }
    )
    revalidatePath('/account')
  } catch (error) {
    throw new Error(error as any)
  }
}
