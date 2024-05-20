'use client'

import { checkOut } from '@/src/actions/checkOut_action'
import { useRouter } from 'next/navigation'
import { useFormState } from 'react-dom'

const CheckOutForm = ({ id, data }: any) => {
  const [state, action] = useFormState(checkOut, null)
  const router = useRouter()

  const { fName, lName, email, phone, Street, city } = data || {}
  if (state?.success) {
    router.push('/order/' + state.id)
  }

  return (
    <form id="checkOutFrom" action={action}>
      <input type="hidden" name="cart" defaultValue={id} />
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="first-name" className="text-gray-600">
              First Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              id="first-name"
              className="input-box"
              required
              defaultValue={fName}
            />
          </div>
          <div>
            <label htmlFor="last-name" className="text-gray-600">
              Last Name <span className="text-primary">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              id="last-name"
              className="input-box"
              required
              defaultValue={lName}
            />
          </div>
        </div>
        <div>
          <label htmlFor="company" className="text-gray-600">
            Company
          </label>
          <input
            type="text"
            name="company"
            id="company"
            className="input-box"
          />
        </div>
        <div>
          <label htmlFor="region" className="text-gray-600">
            Country/Region
          </label>
          <input type="text" name="region" id="region" className="input-box" />
        </div>
        <div>
          <label htmlFor="address" className="text-gray-600">
            Street address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            className="input-box"
            defaultValue={Street}
          />
        </div>
        <div>
          <label htmlFor="city" className="text-gray-600">
            City
          </label>
          <input
            type="text"
            name="city"
            id="city"
            className="input-box"
            defaultValue={city}
          />
        </div>
        <div>
          <label htmlFor="phone" className="text-gray-600">
            Phone number
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            className="input-box"
            defaultValue={phone}
          />
        </div>
        <div>
          <label htmlFor="email" className="text-gray-600">
            Email address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="input-box"
            defaultValue={email}
          />
        </div>
      </div>
      {state?.error && (
        <div className="text-red-500 text-sm mt-4">{state.error}</div>
      )}
    </form>
  )
}

export default CheckOutForm
