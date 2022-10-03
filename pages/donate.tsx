import { trpc } from '@utils/trpc'
import Image from 'next/image'
import { FC, useEffect, useState } from 'react'

const Product: FC<{
  id: string
  name: string
  price?: number
  imageUrl: string
  userId?: number
}> = ({ id, name, price, imageUrl, userId }) => {
  return (
    <div className='flex-1 rounded mr-2'>
      <div className='flex items-center p-3 border border border-solid border-b-0 rounded-t'>
        <Image src={imageUrl} alt={`Image for ${name}`} width='60px' height='80px' />
        <div className='description'>
          <h3>{name}</h3>
          <h5>${price?.toFixed(2)}</h5>
        </div>
      </div>
      <div className='bg-gray-100 p-3 rounded-b border border-solid border-b border-t-0'>
        <form action='/api/stripe/checkout' method='POST'>
          <input name='productId' value={id} hidden={true} />
          <input name='userId' value={userId} type='number' hidden={true} />
          <button type='submit'>Checkout</button>
        </form>
      </div>
    </div>
  )
}

export default () => {
  const [message, setMessage] = useState('')
  const { data } = trpc.useQuery([
    'stripe.products.list',
    {
      limit: 10,
    },
  ])
  const { data: userData } = trpc.useQuery(['user.current'])

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search)

    if (query.get('success')) {
      setMessage('Order placed! You will receive an email confirmation.')
    }

    if (query.get('canceled')) {
      setMessage("Order canceled -- continue to shop around and checkout when you're ready.")
    }
  }, [])

  return message ? (
    <section>
      <p>{message}</p>
    </section>
  ) : (
    <section className='flex'>
      {data?.products.map((p) => (
        <Product
          id={p.id}
          name={p.name}
          price={p.dollarPrice}
          imageUrl={p.imageUrl}
          userId={userData?.id}
        />
      ))}
    </section>
  )
}
