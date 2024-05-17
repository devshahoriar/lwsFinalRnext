'use client'
import Image from 'next/image'
import { useState } from 'react'

const ProductImageS = ({ images }: { images: any }) => {
  const [activeImage, setActiveImage] = useState(images[0])
  return (
    <div>
      <Image
        src={activeImage}
        height={1000}
        width={1000}
        alt="product"
        className="w-full aspect-square object-center object-cover rounded-md"
      />
      <div className="grid grid-cols-5 gap-4 mt-4">
        {images.map((img: any, i: number) => (
          <Image
            onClick={() => setActiveImage(img)}
            key={i}
            src={img}
            alt="product"
            height={1000}
            width={1000}
            className={`w-full cursor-pointer border aspect-square object-cover rounded-md ${activeImage === img ? 'border-primary' : 'border-gray-200'}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductImageS
