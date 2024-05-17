'use client'
/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react'
import { Button } from '../shadcn/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../shadcn/Dilog'
import { editAddress } from '@/src/actions/accountAction'

const AccBillingAddress = ({ pVale, uId }: any) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState(pVale)
  const hendelClick = async () => {
    setLoading(true)
    await editAddress({ billingAddress: input, id: uId })
    setOpen(false)
    setLoading(false)
  }
  return (
    <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
      <DialogTrigger asChild>
        <Button variant="link" className="hover:no-underline">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit shipping address</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              onChange={(e) => setInput({ ...input, name: e.target.value })}
              value={input?.name}
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Area
            </label>
            <input
              onChange={(e) => setInput({ ...input, area: e.target.value })}
              value={input?.area}
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md  focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              State
            </label>
            <input
              onChange={(e) => setInput({ ...input, state: e.target.value })}
              value={input?.state}
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md  focus:border-primary  sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              House No
            </label>
            <input
              onChange={(e) => setInput({ ...input, houseNo: e.target.value })}
              value={input?.houseNo}
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md  focus:border-primary  sm:text-sm"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={hendelClick}
            className="text-white disabled:opacity-50"
            disabled={loading}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AccBillingAddress
