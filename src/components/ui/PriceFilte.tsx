'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const PriceFilte = () => {
  const [max, setMax] = useState<number>()
  const [min, setMin] = useState<number>()
  const timeOut = useRef<any>()

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if(params.get('max')){
      setMin(Number(params.get('max')))
    }
    if(params.get('min')){
      setMin(Number(params.get('min')))
    }
    
    
  }, [searchParams])

  const hendelChage = (e: any) => {
    timeOut.current && clearTimeout(timeOut.current)
    const params = new URLSearchParams(searchParams)
    const name = e.target.name
    const value = e.target.value
    if (name === 'min') {
      setMin(value)
      params.set('min', value)
    } else {
      setMax(value)
      params.set('max', value)
    }
    timeOut.current = setTimeout(() => {
      replace(`${pathname}?${params.toString()}`)
    }, 300)
  }

  return (
    <div className="mt-4 flex items-center">
      <input
        type="text"
        name="min"
        id="min"
        className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
        placeholder="min"
        onChange={hendelChage}
        value={min}
      />
      <span className="mx-3 text-gray-500">-</span>
      <input
        type="text"
        name="max"
        id="max"
        className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
        placeholder="max"
        onChange={hendelChage}
        value={max}
      />
    </div>
  )
}

export default PriceFilte
