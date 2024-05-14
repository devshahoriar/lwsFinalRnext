'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const SizeFilter = () => {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const [currentSize, setCurrentSize] = useState<string>('')
  const pathname = usePathname()
  const { replace } = useRouter()
  const current = params.get('size')
  useEffect(() => {
    setCurrentSize(params.get('size') || '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current])

  const hendelChange = (e: any) => {
    const size = e.target.value
    setCurrentSize(size)
    params.set('size', size)
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      <div className="size-selector">
        <input
          onChange={hendelChange}
          type="radio"
          name="size"
          id="size-xs"
          className="hidden"
          value="xs"
          checked={currentSize === 'xs'}
        />
        <label
          htmlFor="size-xs"
          className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
        >
          XS
        </label>
      </div>
      <div className="size-selector">
        <input
          onChange={hendelChange}
          type="radio"
          name="size"
          id="size-sm"
          className="hidden"
          value="s"
          checked={currentSize === 's'}
        />
        <label
          htmlFor="size-sm"
          className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
        >
          S
        </label>
      </div>
      <div className="size-selector">
        <input
          onChange={hendelChange}
          type="radio"
          name="size"
          id="size-m"
          className="hidden"
          value="m"
          checked={currentSize === 'm'}
        />
        <label
          htmlFor="size-m"
          className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
        >
          M
        </label>
      </div>
      <div className="size-selector">
        <input
          onChange={hendelChange}
          type="radio"
          name="size"
          id="size-l"
          className="hidden"
          value="l"
          checked={currentSize === 'l'}
        />
        <label
          htmlFor="size-l"
          className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
        >
          L
        </label>
      </div>
      <div className="size-selector">
        <input
          onChange={hendelChange}
          type="radio"
          name="size"
          id="size-xl"
          className="hidden"
          value="xl"
          checked={currentSize === 'xl'}
        />
        <label
          htmlFor="size-xl"
          className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
        >
          XL
        </label>
      </div>
    </div>
  )
}

export default SizeFilter
