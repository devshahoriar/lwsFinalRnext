import InvoiceDownlodeButton from '@/src/components/ui/InvoiceDownlodeButton'
import order_model from '@/src/models/order_model'

const page = async ({ params: { id } }: any) => {
  const data = await order_model
    .findOne({ _id: id })
    .populate('products.product', '_id title price thumbnail')
    .populate('user', '_id name email')
    .lean()

  return (
    <div className="container h-[400px] flex justify-center items-center">
      <InvoiceDownlodeButton data={JSON.parse(JSON.stringify(data))} />
    </div>
  )
}

export default page
