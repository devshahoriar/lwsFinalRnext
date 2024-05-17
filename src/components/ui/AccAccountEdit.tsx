/* eslint-disable react/no-unescaped-entities */
'use client'
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
import { editUser } from '@/src/actions/accountAction'

const AccAccountEdit = ({
  emailEdit,
  pevName,
  pevEmail,
  pevPhone,
  uId,
}: any) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState({
    name: pevName,
    email: pevEmail,
    phone: pevPhone,
  })

  const hendelUpdate = async () => {
    setLoading(true)
    await editUser({ ...input, id: uId })
    setLoading(false)
    setOpen(false)
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
          <DialogTitle>Edit belling address</DialogTitle>
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
              value={input.name}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
              type="text"
              name="name"
              id="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:border-primary sm:text-sm"
              placeholder="John Doe"
              disabled={!emailEdit}
            />
            {!emailEdit && (
              <p className="text-xs text-gray-500">
                Social login cannot be change name
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              disabled={!emailEdit}
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
              type="text"
              name="name"
              id="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md  focus:border-primary sm:text-sm"
              placeholder="user@email.com"
            />
            {!emailEdit && (
              <p className="text-xs text-gray-500">
                Social login cannot be change email
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              value={input.phone}
              onChange={(e) => setInput({ ...input, phone: e.target.value })}
              type="text"
              name="name"
              id="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md  focus:border-primary  sm:text-sm"
              placeholder="01******"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={hendelUpdate}
            className="text-white disabled:opacity-50"
            disabled={loading}
            type="submit"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AccAccountEdit
