'use client'
/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import React from 'react'
import SubmitButton from './SubmitButton'
import { signIn } from 'next-auth/react'
import { useFormState } from 'react-dom'
import { loginAct } from '@/src/actions/authAction'

const Login = () => {
  const [state, action] = useFormState(loginAct, null)

  return (
    <div className="contain py-16">
      <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
        <h2 className="text-2xl uppercase font-medium mb-1">Login</h2>
        <p className="text-gray-600 mb-6 text-sm">welcome back customer</p>
        <form action={action} autoComplete="off">
          <div className="space-y-2">
            <div>
              <label htmlFor="email" className="text-gray-600 mb-2 block">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                placeholder="youremail.@domain.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-gray-600 mb-2 block">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                placeholder="*******"
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                className="text-primary focus:ring-0 rounded-sm cursor-pointer"
              />
              <label
                htmlFor="remember"
                className="text-gray-600 ml-3 cursor-pointer"
              >
                Remember me
              </label>
            </div>
            <a href="#" className="text-primary">
              Forgot password
            </a>
          </div>
          <div className="mt-4">
            <SubmitButton title="Login" />
            {state?.error && <p className="text-red-600 my-4">{state.error}</p>}
          </div>
        </form>
        {/* login with */}
        <div className="mt-6 flex justify-center relative">
          <div className="text-gray-600 uppercase px-3 bg-white z-10 relative">
            Or login with
          </div>
          <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200" />
        </div>
        <div className="mt-4 flex gap-4">
          <a
            onClick={() => signIn('facebook', { callbackUrl: '/' })}
            className="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700"
          >
            facebook
          </a>
          <a
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm hover:bg-red-500 cursor-pointer"
          >
            google
          </a>
        </div>
        {/* ./login with */}
        <p className="mt-4 text-center text-gray-600">
          Don't have account?
          <Link href="/register" className="text-primary">
            Register now
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
