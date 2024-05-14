const CartOtem = () => {
  return (
    <div className="flex justify-between">
      <div>
        <h5 className="text-gray-800 font-medium">Italian shape sofa</h5>
        <p className="text-sm text-gray-600">Size: M</p>
      </div>
      <div className="flex items-center gap-5">
        <button className="bg-primary size-6 rounded-md text-white hover:opacity-90 active:opacity-100">-</button>
        <p className="text-gray-600">x3</p>
        <button className="bg-primary size-6 rounded-md text-white hover:opacity-90 active:opacity-100">+</button>
      </div>
      <p className="text-gray-800 font-medium">$320</p>
    </div>
  )
}

export default CartOtem
