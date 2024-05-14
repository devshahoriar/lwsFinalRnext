'use server'
import bcrypt from 'bcrypt'
import dbConnect from '../db/dbConnect'
import User from '../models/user_model'
import {  redirect } from 'next/navigation'
import { signIn } from '../lib/auth'

export const registerAct = async (pvaction: any, data: FormData) => {
  const { name, email, password, confirm, aggrement } = Object.fromEntries(
    data.entries()
  )
  if (name === '' || email === '' || password === '' || confirm === '') {
    return { error: 'Please fill all the fields' }
  }
  if (password !== confirm) {
    return { error: 'Password do not match' }
  }
  if (aggrement === undefined) {
    return { error: 'Please agree to the terms and conditions' }
  }
  const hashPass = bcrypt.hashSync(String(password), 10)
  await dbConnect()
  const newUser = new User({ name, email, password: hashPass })
  try {
    await newUser.save()
  } catch (error: any) {
    if (error.code === 11000) {
      return { error: 'Email already exists' }
    }
    return { error: 'Something went wrong' }
  }
  redirect('/login')
}

export const loginAct = async (pvaction: any, data: FormData) => {
  const { email, password, remember } = Object.fromEntries(data.entries())
  if (email === '' || password === '') {
    return { error: 'Please fill email and password.' }
  }
  try {
    await signIn('credentials', { email, password, remember, redirect: false })
  } catch (error) {
    console.log(error)
    return { error: 'Invalid credentials' }
  }
  redirect('/')
}
