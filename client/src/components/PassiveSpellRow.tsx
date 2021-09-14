import React from 'react'
import Tippy from '@tippyjs/react'
import classNames from 'classnames'

const ellipsisStyle = {
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical' as any,
  WebkitLineClamp: 3,
}

const PassiveSpellRow = ({
  image,
  text,
  title,
  tooltip,
}: {
  image: { src: string; h: string; w: string }
  text: string
  tooltip: string
  title: string
}) => (
  <div className='mb-3 font-montserrat'>
    <div className='flex justify-end z-10 relative top-0.5'>
      <div className='h-6 inline-flex bg-yellow-300 border-t-2 border-l-2 border-yellow-100 rounded-t px-3'>
        <p className={classNames('text-sm font-semibold')}>{title}</p>
        <img
          className={classNames(
            'shadow h-7 relative rounded-b bottom-1 left-5 rounder-tl border border-yellow-100',
          )}
          src={image.src}
        />
      </div>
    </div>

    <div
      className={classNames('h-15 rounded-b rounded-tl bg-black border-2 border-yellow-100 p-2')}
    >
      <div>
        <Tippy content={tooltip} placement='right-start'>
          <div className='overflow-hidden' style={{ ...ellipsisStyle }}>
            <p className={classNames('text-xs text-yellow-300')}>{text}</p>
          </div>
        </Tippy>
      </div>
    </div>
  </div>
)

export default PassiveSpellRow
