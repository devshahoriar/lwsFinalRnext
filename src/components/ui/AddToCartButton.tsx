'use client'
import { addToCart } from '@/src/actions/cartAction'
import {  useRouter } from 'next/navigation'
import { ReactElement, useTransition } from 'react'

const AddToCartButton = ({
  uId,
  pId,
  icon,
  className,
}: {
  uId: String
  pId: String
  icon?: ReactElement
  className?: String
}) => {
  const { push } = useRouter()
  const [isPending, startTrensition] = useTransition()
  const hendelClick = () => {
    if (!uId) {
      push('/login?redirect=/product/'+pId)
      return
    }
    startTrensition(async () => await addToCart(uId, pId))
  }
  return (
    <button
      className={`block  py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition disabled:opacity-20 ${className}`}
      onClick={hendelClick}
      disabled={isPending}
    >
      {icon}
      Add to cart
    </button>
  )
}

export default AddToCartButton
