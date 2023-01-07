import { awsS3Service } from '@/bin/services/aws-s3-service'
import { Button } from '@/components/button'
import { Card } from '@/components/card'
import { H1 } from '@/components/h1'
import Image from 'next/image'
import { useRouter } from 'next/router'

export const getServerSideProps = async () => {
  const resp = await awsS3Service.getSignedUrl({
    key: 'images/patreon-button.webp',
    expiresIn: 3600,
  })

  return {
    props: {
      patreonButton: resp,
    },
  }
}

export default ({ patreonButton }: { patreonButton?: string }) => {
  const router = useRouter()

  return (
    <section className='relative z-0 flex flex-col items-center'>
      <div
        className='absolute top-0 -z-[1] -mx-16 h-80 w-full bg-cover bg-no-repeat'
        style={{
          backgroundImage:
            'url(https://cdn.mos.cms.futurecdn.net/2NQGX7WGDekmLQwhtzLRQP-1920-80.jpg.webp)',
        }}
      />
      <Card className='relative mt-60 flex w-1/2 flex-col items-center justify-center bg-opacity-100'>
        <H1 className='mb-6'>Support Us</H1>
        <Button
          classes={{
            button: 'shadow-lg px-6 py-2 text-xl rounded',
          }}
          onClick={() => router.push('/donate')}
          text='Donate now'
        />
      </Card>
      <Card className='my-12 border-black bg-opacity-100 p-8 text-lg'>
        <p className='mb-4'>
          Our models and champion assets will always be free to view. We strive to provide the best
          modeling experience for the league community.
        </p>
        <p>
          In order to maintain the site we offer unlimited downloads after a one time donation.
          Hosting and downloading 3D assets can be expensive as these files are much larger (10 -
          50MBs) than standard assets like images and audio files.
        </p>
        <hr className='my-8' />
        <p className='mb-4'>
          If you would like to support this site further and other future works consider becoming a
          patron!
        </p>
        <div className='flex justify-center'>
          <div className='relative mx-4 h-[60px] w-[200px] cursor-pointer hover:opacity-50'>
            <Image
              fill
              src={patreonButton ?? ''}
              style={{ objectFit: 'contain' }}
              onClick={() => window.open('https://www.patreon.com/ryanmichaelhirst', '_blank')}
              alt='Patreon button'
            />
          </div>
        </div>
      </Card>
    </section>
  )
}
