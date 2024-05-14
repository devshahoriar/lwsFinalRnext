'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

const PriceFilte = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const params = new URLSearchParams(searchParams)
  const { replace } = useRouter()

  const prevMax = Number(params.get('max'))
  const prevMin = Number(params.get('min'))

  const [max, setMax] = useState<string>()
  const [min, setMin] = useState<string>()
  const [dMax] = useDebounce(max, 500) as any
  const [dMin] = useDebounce(min, 500) as any

  useEffect(() => {
    prevMax === 0 && setMax('')
    prevMin === 0 && setMin('')
  }, [prevMax, prevMin])

  useEffect(() => {
    dMin && params.set('min', dMin)
    dMax && params.set('max', dMax)
    replace(`${pathname}?${params.toString()}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dMax, dMin])

  const hendelChage = (e: any) => {
    const name = e.target.name
    const value = Number(e.target.value) as any
    if (name === 'min') {
      setMin(value)
    } else {
      setMax(value)
    }
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
