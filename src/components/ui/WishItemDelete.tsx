'use client'

import { deleteFromWish } from '@/src/actions/wishListAction'
import { useTransition } from 'react'

const WishItemDelete = ({ uId, pId }: any) => {
  const [isPending, trensition] = useTransition()
  const handelDelete = () => {
    trensition(async () => await deleteFromWish(uId, pId))
  }
  return (
    <button
      onClick={handelDelete}
      className={`hover:text-red-600 ${
        isPending ? 'pointer-events-none opacity-50' : ''
      }`}
    >
      <i className="fa-solid fa-trash" />
    </button>
  )
}

export default WishItemDelete
