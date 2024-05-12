'use client'
import { useFormStatus } from 'react-dom'

const SubmitButton = ({ title }: { title: string }) => {
  const { pending } = useFormStatus()
  return (
    <button
      disabled={pending}
      type="submit"
      className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {title}
    </button>
  )
}

export default SubmitButton
