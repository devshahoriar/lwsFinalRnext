'use client'

import { addWishList } from '@/src/actions/wishListAction'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

const AddToWishList = ({
  uId,
  pId,
  className,
}: {
  uId: String
  pId: String
  className?: String
}) => {
  const { push } = useRouter()
  const [isPending, startTrensition] = useTransition()
  const hendelClick = () => {
    if (!uId) {
      push('/login?redirect=/product/'+pId)
      return
    }
    startTrensition(async () => await addWishList(uId, pId))
  }
  return (
    <button
      className={`border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition ${className}`}
      onClick={hendelClick}
      disabled={isPending}
    >
      <i className="fa-solid fa-heart" /> Wishlist
    </button>
  )
}

export const HoverAddToWishButton = ({ uId, pId }: { uId: String; pId: String }) => {
  const { push } = useRouter()
  const [isPending, startTrensition] = useTransition()
  const hendelClick = () => {
    if (!uId) {
      push('/login')
      return
    }
    startTrensition(async () => await addWishList(uId, pId))
  }
  return (
    <button
      className={`text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition ${isPending ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
      onClick={hendelClick}
      disabled={isPending}
    >
      <i className="fa-solid fa-heart" />
    </button>
  )
}

export default AddToWishList
