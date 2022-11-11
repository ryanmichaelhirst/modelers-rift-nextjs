import { H1 } from '@/components/h1'
import { trpc } from '@/utils/trpc'
import Image from 'next/image'
import type { NextRequest, NextResponse } from 'next/server'
import { FC, useEffect, useState } from 'react'

const Product: FC<{
  id: string
  name: string
  dollarAmount?: string
  imageUrl: string
  userId?: number
}> = ({ id, name, dollarAmount, imageUrl, userId }) => {
  return (
    <div className='mr-2 flex-1 cursor-pointer rounded'>
      <div className='flex items-center rounded-t border border-b-0 border-solid p-3'>
        <Image src={imageUrl} alt={`Image for ${name}`} width='60px' height='80px' />
        <div className='description'>
          <h3>{name}</h3>
          <h5>{dollarAmount}</h5>
        </div>
      </div>
      <div className='rounded-b border border-b border-t-0 border-solid bg-gray-100 p-3'>
        <form action='/api/stripe/checkout' method='POST'>
          <input name='productId' value={id} hidden={true} />
          <input name='userId' value={userId} type='number' hidden={true} />
          <button type='submit'>Checkout</button>
        </form>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ req, res }: { req: NextRequest; res: NextResponse }) => {
  // TODO: why is it set as 'undefined' and not undefined?
  // @ts-ignore
  if (!req.cookies.token || req.cookies.token === 'undefined') {
    return {
      redirect: {
        destination: '/login',
        permanent: false, // make this true if you want the redirect to be cached by the search engines and clients forever
      },
    }
  }

  return {
    props: {},
  }
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
    <section className='rounded border p-6 shadow'>
      <div className='mb-10 flex flex-col items-center'>
        <H1 className='mb-6'>Make a Donation</H1>
        <p>Select an option below to make a donation through stripe.</p>
        <p>We appreciate any contribution you are able to make to Modeler's Rift!</p>
      </div>
      <div className='flex'>
        {data?.products.map((p) => (
          <Product
            id={p.id}
            name={p.name}
            dollarAmount={p.dollarAmount}
            imageUrl={p.imageUrl}
            userId={userData?.id}
          />
        ))}
      </div>
    </section>
  )
}
