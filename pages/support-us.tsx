import PatreonButton from '@/assets/patreon-button.webp'
import { Button } from '@/components/button'
import { Card } from '@/components/card'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default () => {
  const router = useRouter()

  return (
    <section>
      <div>
        <div className='flex flex-col items-center'>
          <div
            className='h-80 w-full bg-no-repeat bg-cover -mx-16'
            style={{
              backgroundImage:
                'url(https://cdn.mos.cms.futurecdn.net/2NQGX7WGDekmLQwhtzLRQP-1920-80.jpg.webp)',
            }}
          />
          <Card classes='relative -top-20 px-10 bg-white'>
            <p className='text-3xl mb-6'>Support Us</p>
            <Button
              classes={{
                button: 'shadow-lg px-6 py-2 text-xl rounded',
              }}
              onClick={() => router.push('/donate')}
              text='Donate now'
            />
          </Card>
        </div>

        <Card classes='p-8'>
          <p className='mb-4'>
            Our models and champion assets will always be free to view. We strive to provide the
            best modeling experience for the league community.
          </p>
          <p className='mb-4'>
            In order to maintain the site we offer unlimited downloads after a one time donation.
            Hosting and downloading 3d assets is expensive. You can check out all operating costs
            here.
          </p>
          <hr className='mb-4' />
          <p className='mb-4'>
            If you would like to support the creator of this site and other works consider becoming
            a patron!
          </p>
          <div className='flex justify-center'>
            <div className='w-[100px] h-[30px] relative mx-4 hover:opacity-50 cursor-pointer'>
              <Image
                layout='fill'
                src={PatreonButton}
                objectFit='contain'
                onClick={() => window.open('https://www.patreon.com/ryanmichaelhirst', '_blank')}
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
