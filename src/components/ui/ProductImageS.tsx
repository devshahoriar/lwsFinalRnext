/* eslint-disable @next/next/no-img-element */
'use client'
import Image from 'next/image'
import { useState } from 'react'

const ProductImageS = ({ images }: { images: any }) => {
  const [activeImage, setActiveImage] = useState(images[0])
  return (
    <div>
      <img
        src={'https://random-image-pepebigotes.vercel.app/api/random-image'}
        height={1000}
        width={1000}
        alt="product"
        className="w-full aspect-square object-center object-cover rounded-md"
      />
      <div className="grid grid-cols-5 gap-4 mt-4">
        {images.map((img: any, i: number) => (
          <img
            onClick={() => setActiveImage('https://random-image-pepebigotes.vercel.app/api/random-image')}
            key={i}
            src={'https://random-image-pepebigotes.vercel.app/api/random-image'}
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
