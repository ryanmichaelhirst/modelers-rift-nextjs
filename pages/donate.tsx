import { H1 } from '@/components/h1'
import { defaultModelHref } from '@/pages/model/[name]'
import { trpc } from '@/utils/trpc'
import Image from 'next/image'
import Link from 'next/link'
import type { NextRequest, NextResponse } from 'next/server'
import { FC } from 'react'
import { checkUserIsLoggedIn } from './profile'

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
        <Image src={imageUrl} alt={`Image for ${name}`} width='60' height='80' />
        <div className='description'>
          <h3>{name}</h3>
          <h5>{dollarAmount}</h5>
        </div>
      </div>
      <div className='rounded-b border border-b border-t-0 border-solid bg-gray-100 p-3'>
        <form action='/api/stripe/checkout' method='POST'>
          <input name='productId' defaultValue={id} hidden={true} />
          <input name='userId' defaultValue={userId} type='number' hidden={true} />
          <button type='submit'>Checkout</button>
        </form>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ req, res }: { req: NextRequest; res: NextResponse }) => {
  return checkUserIsLoggedIn(req)
}

export default () => {
  const { data } = trpc.stripe['products.list'].useQuery({ limit: 10 })
  const { data: user } = trpc.user.current.useQuery()
  const query = (() => {
    if (typeof window === 'undefined') return

    return new URLSearchParams(window.location.search)
  })()

  if (query?.get('success')) {
    return (
      <section>
        <p>
          Donation made! Thank you for supporting the site we greatly appreciate your contribution.
        </p>
        <p>
          Click{' '}
          <Link className='text-primary' href={defaultModelHref}>
            here
          </Link>{' '}
          to start exploring models
        </p>
      </section>
    )
  }

  if (query?.get('failed')) {
    return (
      <section>
        <p>
          Donation canceled. If you would like to try and donate again head over{' '}
          <Link className='text-primary' href='/donate'>
            here
          </Link>
          .
        </p>
        <p>
          Otherwise you can return to the model explorer{' '}
          <Link className='text-primary' href={defaultModelHref}>
            here
          </Link>
          .
        </p>
      </section>
    )
  }

  return (
    <section className='rounded border p-6 shadow'>
      <div className='mb-10 flex flex-col items-center'>
        <H1 className='mb-6'>Make a Donation</H1>
        <p>Select an option below to make a donation through stripe.</p>
        <p>We appreciate any contribution you are able to make to Modeler's Rift!</p>
      </div>
      <div className='flex'>
        {data?.products.map((p) => (
          <Product
            key={p.id}
            id={p.id}
            name={p.name}
            dollarAmount={p.dollarAmount}
            imageUrl={p.imageUrl}
            userId={user?.id}
          />
        ))}
      </div>
    </section>
  )
}
