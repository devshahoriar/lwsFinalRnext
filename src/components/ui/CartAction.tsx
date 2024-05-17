'use client'

import { decrementCart, incrementCart, removeFromCart } from '@/src/actions/cartAction'
import { useTransition } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../shadcn/Alart'

const CartDelete = ({ title, price, uId, cartId }: any) => {
  const [isPending, transition] = useTransition()

  const hendelDelete = async () => {
    transition(async () => await removeFromCart(uId, cartId))
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-primary size-6 rounded-md text-white hover:opacity-90 active:opacity-100">
        <i className="fa-solid fa-trash" />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you want to delete?</AlertDialogTitle>
          <AlertDialogDescription>
            <p>Product name : {title}</p>
            <p>Product price : {price}taka</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            className="text-white "
            onClick={hendelDelete}
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

const CartDecrement = ({ value, uId, cIu }: any) => {
  const [isPending, transition] = useTransition()
  const hendelClick = () => {
    transition(async () => await decrementCart(uId, cIu))
  }
  return (
    <button
      onClick={hendelClick}
      className={`bg-primary size-6 rounded-md text-white hover:opacity-90 active:opacity-100 ${isPending && "pointer-events-none opacity-40"} ${
        value === 1 ? 'cursor-not-allowed pointer-events-none opacity-40' : ''
      }`}
    >
      -
    </button>
  )
}

const CartEncrement = ({ uId, cIu }:any) => {
  const [isPending, transition] = useTransition()
  const hendelClick = () => {
    transition(async () => await incrementCart(uId, cIu))
    console.log('increment')
  }
  return (
    <button
      onClick={hendelClick}
      className={`bg-primary size-6 rounded-md text-white hover:opacity-90 active:opacity-100 ${isPending && "pointer-events-none opacity-40"}`}
    >
      +
    </button>
  )
}

export { CartDelete, CartDecrement, CartEncrement }
