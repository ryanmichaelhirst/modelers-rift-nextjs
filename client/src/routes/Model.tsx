import { GlassCard } from '@components/GlassCard'

export const Model = () => {
  return (
    <div className='h-full bg-cover'>
      <div className='w-1/3 mx-auto pt-20'>
        <p className='mb-10'>Model page</p>
        <div className='w-80 text-white'>
          <p className='mb-4 text-xl'>Animations</p>
          <GlassCard>
            <div>I'm a glass card</div>
            <div>Player track 1</div>
            <div>Player track 2</div>
            <div>Player track 3</div>
            <div>Player track 4</div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}
