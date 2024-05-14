/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const Category = ({ catgorys }: { catgorys: [String] }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const [catLo, setCat] = useState<string[]>([])
  const params = new URLSearchParams(searchParams)
  const curentCat = params.get('category')
  
  useEffect(() => {
    let cat = curentCat?.split(',')
    cat = cat?.filter((cat) => cat)
    if (cat?.length === 0) {
      params.delete('category')
      replace(`${pathname}?${params.toString()}`)
    }
    setCat(cat ? cat : [])
  }, [curentCat])

  const hendeleChange = (e: any) => {
    let prev = curentCat?.split(',')
    prev = prev?.filter((cat) => cat)
    const newCat = e.target.value

    if (e.target.checked) {
      if (prev) {
        params.set('category', [...prev, newCat].join(','))
      } else {
        params.set('category', newCat)
      }
    } else {
      const newCat = prev?.filter((cat) => cat !== e.target.value)
      if (newCat) {
        params.set('category', newCat.join(','))
      } else {
        params.delete('category')
      }
    }

    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="space-y-2 max-h-56 overflow-y-auto overflow-x-hidden scrollbar-thin">
      {catgorys.map((cat: any, i: number) => (
        <div key={i} className="flex items-center">
          <input
            onChange={hendeleChange}
            type="checkbox"
            className="text-primary focus:ring-0 rounded-sm cursor-pointer"
            value={cat}
            name={cat}
            id={cat}
            checked={catLo?.includes(cat)}
          />
          <label
            htmlFor={cat}
            className="text-gray-600 ml-3 cusror-pointer capitalize"
          >
            {cat}
          </label>
        </div>
      ))}
    </div>
  )
}

export default Category
