import BrodCam from '@/src/components/shared/BrodCam'
import AccAccountEdit from '@/src/components/ui/AccAccountEdit'
import AccBillingAddress from '@/src/components/ui/AccBillingAddress'
import AccShippingAddEdit from '@/src/components/ui/AccShippingAddEdit'
import dbConnect from '@/src/db/dbConnect'
import { auth } from '@/src/lib/auth'
import accountDetails_model from '@/src/models/accountDetails_model'
import user_model from '@/src/models/user_model'
import React from 'react'

const page = async () => {
  await dbConnect()
  const { user } = ((await auth()) as any) || {}
  const accDetails = await accountDetails_model.findOne({ user: user.id })
  const fetchUser = (await user_model.findById(user.id).lean()) as any
  const emailEdit = Boolean(fetchUser?.password)

  const { shippingAddress, billingAddress } = accDetails || {}

  return (
    <>
      <BrodCam title="Account" />
      <div className="container  items-start gap-6 pt-4 pb-16">
        {/* info */}
        <div className=" grid grid-cols-3 gap-4 mx-auto max-w-5xl">
          <div className="shadow rounded bg-white px-4 pt-6 pb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-800 text-lg">
                Personal Profile
              </h3>
              <AccAccountEdit
                emailEdit={emailEdit}
                pevName={fetchUser?.name}
                pevEmail={fetchUser?.email}
                pevPhone={fetchUser?.phone}
                uId={user?.id}
              />
            </div>
            <div className="space-y-1">
              <h4 className="text-gray-700 font-medium">{user.name}</h4>
              <p className="text-gray-800">{user.email}</p>
              <p className="text-gray-800">
                {fetchUser?.phone ? fetchUser.phone : 'Add your phone number.'}
              </p>
            </div>
          </div>
          <div className="shadow rounded bg-white px-4 pt-6 pb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-800 text-lg">
                Shipping address
              </h3>
              <AccShippingAddEdit
                uId={user?.id}
                pVale={
                  shippingAddress && JSON.parse(JSON.stringify(shippingAddress))
                }
              />
            </div>
            <div className="space-y-1">
              <h4 className="text-gray-700 font-medium">
                {shippingAddress?.name ? shippingAddress.name : 'Add name'}
              </h4>
              <p className="text-gray-800">
                {shippingAddress?.area}-{shippingAddress?.state}
              </p>
              <p className="text-gray-800">{shippingAddress?.houseNo}</p>
            </div>
          </div>
          <div className="shadow rounded bg-white px-4 pt-6 pb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-800 text-lg">
                Billing address
              </h3>
              <AccBillingAddress uId={user?.id}
                pVale={
                  billingAddress && JSON.parse(JSON.stringify(billingAddress))
                } />
            </div>
            <div className="space-y-1">
              <h4 className="text-gray-700 font-medium">
                {shippingAddress?.name ? billingAddress.name : 'Add name'}
              </h4>
              <p className="text-gray-800">
                {billingAddress?.area}-{billingAddress?.state}
              </p>
              <p className="text-gray-800">{billingAddress?.houseNo}</p>
            </div>
          </div>
        </div>
        {/* ./info */}
      </div>
    </>
  )
}

export default page
