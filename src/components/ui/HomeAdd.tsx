import offer from '@/public/images/offer.jpg'
import Image from 'next/image'

const HomeAdd = () => {
  return (
    <div className="container pb-16">
      <a href="#">
        <Image src={offer} alt="ads" className="w-full" />
      </a>
    </div>
  )
}

export default HomeAdd
