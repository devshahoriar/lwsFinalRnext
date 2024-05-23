'use client'
import getMailString from '@/src/utils/getMailString'
import jsPDF from 'jspdf'



const InvoiceDownlodeButton = ({ data }: any) => {
  const dataPrint = {
    order: {
      status: data.status,
      _id: String(data._id),
      city: String(data.orderAddress.city),
      state: String(data.orderAddress.state),
    },
    user: {
      fName: data.user.name.split(' ')[0],
      lName: data.user.name.split(' ')[1],
      email: data.user.email,
      phone: data.orderAddress.phone,
    },
    products: data.products,
    totalPrice: data.products.reduce((acc: any, curr: any) => {
      return acc + curr.product.price * curr.quantity
    }, 0),
  }
  const handelClick = () => {
    const stringPdf = getMailString(dataPrint)
    const pdf = new jsPDF({unit:"pt"})
    pdf.html(stringPdf, {
      callback: function (pdf) {
        pdf.save('invoice.pdf')
      },
      x: 10,
      y: 10,
      autoPaging:"slice",
      html2canvas:{
        scale: 1.8
      }
    })
  }
  return (
    <button
      onClick={handelClick}
      className="bg-primary border border-primary text-white px-8 py-3 font-medium 
              rounded-md hover:bg-transparent hover:text-primary"
    >
      Downlode Invoice
    </button>
  )
}

export default InvoiceDownlodeButton
