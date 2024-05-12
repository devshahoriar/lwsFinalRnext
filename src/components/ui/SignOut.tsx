'use client'

import { signOut } from 'next-auth/react'
import Link from 'next/link'

const SignOut = () => {
  return (
    <Link
      href="#"
      onClick={() => signOut()}
      className="text-gray-200 hover:text-white transition"
    >
      Logout
    </Link>
  )
}

export default SignOut
