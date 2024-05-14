'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const ResetFilter = () => {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const pathname = usePathname()
  const { replace, refresh } = useRouter()
  return (
    <button
      onClick={() => {
        params.delete('category')
        params.delete('size')
        params.delete('min')
        params.delete('max')
        replace(`${pathname}?${params.toString()}`)
      }}
      className="block w-full py-1 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition"
    >
      Reset Filter
    </button>
  )
}

export default ResetFilter
