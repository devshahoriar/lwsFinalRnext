import Link from 'next/link'
import { CartDecrement, CartDelete, CartEncrement } from './CartAction'

const CartOtem = ({ item, qun, cartId, uId }: any) => {
  return (
    <div className="flex justify-between items-center gap-2">
      <div>
        <Link
          href={`/product/${String(item._id)}`}
          className="hover:text-primary"
        >
          <h5 className="font-medium line-clamp-1">{item.title}</h5>
        </Link>
        <div className="flex gap-3">
          <p className="text-sm text-gray-600">
            Size: <span className="uppercase">{item.size}</span>
          </p>
          <p className="text-sm text-gray-600">
            Price: <span className="uppercase">{item.price}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 ml-auto text-sm">
        <CartDecrement value={qun} uId={uId} cIu={cartId} />
        <p className="text-gray-600">x{qun}</p>
        <CartEncrement uId={uId} cIu={cartId} />
        <CartDelete
          title={item.title}
          price={item.price}
          uId={uId}
          cartId={cartId}
        />
      </div>
      <p className="text-gray-800 font-medium w-16 text-end">
        ${item.price * qun}
      </p>
    </div>
  )
}

export default CartOtem
