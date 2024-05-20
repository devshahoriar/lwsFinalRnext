'use client'
import { useState } from 'react'

const CheckOutButton = () => {
  const [checked, setCheked] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  return (
    <>
      <div className="flex items-center mb-4 mt-2">
        <input
          checked={checked}
          onChange={(e) => setCheked(e.target.checked)}
          type="checkbox"
          name="aggrement"
          id="aggrement"
          className="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3"
        />
        <label
          htmlFor="aggrement"
          className="text-gray-600 ml-3 cursor-pointer text-sm"
        >
          I agree to the{' '}
          <a href="#" className="text-primary">
            terms &amp; conditions
          </a>
        </label>
      </div>
      {error && <p className='mb-2 text-xs text-red-600'>You mast aggree terms & conditions</p>}
      <button
        form={checked ? 'checkOutFrom' : ''}
        onClick={() => {
          if (!checked) {
            setError(true)
            return
          }
          setError(false)
          setLoading(true)
        }}
        
        className={`block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary transition font-medium ${loading ? 'cursor-not-allowed' : ''}`}
      >
        Place order
      </button>
    </>
  )
}

export default CheckOutButton
