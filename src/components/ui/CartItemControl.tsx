import CartOtem from './CartOtem'

const CartItemControl = async ({ uid, products }: any) => {
  return (
    <>
      {products.map((p: any) => (
        <CartOtem
          key={p._id}
          item={p.product}
          qun={p.quantity}
          cartId={String(p._id)}
          uId={uid}
        />
      ))}
    </>
  )
}

export default CartItemControl
