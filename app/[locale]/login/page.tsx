import Login from '@/src/components/ui/Login'
import React from 'react'

const page = ({ searchParams: { redirect } }: any) => {
  return <Login red={redirect} />
}

export default page
