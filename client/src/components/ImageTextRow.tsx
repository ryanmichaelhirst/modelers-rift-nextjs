import React from 'react'
import Tippy from '@tippyjs/react'

const ellipsisStyle = {
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical' as any,
  WebkitLineClamp: 3,
}

const ImageTextRow = ({
  style,
  image,
  text,
  title,
  tooltip,
}: {
  style?: React.CSSProperties
  image: { src: string; h: string; w: string }
  text: string
  tooltip: string
  title?: string
}) => {
  return (
    <div className='flex mb-3 bg-blue-100 h-14 rounded font-montserrat' style={style}>
      <img className='mr-3 border-2 border-yellow-100 rounded shadow' src={image.src} />
      <Tippy content={tooltip} placement='right-start'>
        <div className='overflow-hidden' style={{ ...ellipsisStyle }}>
          {title && <p className='text-sm text-yellow-300 font-semibold'>{title}</p>}
          <p className='text-xs'>{text}</p>
        </div>
      </Tippy>
    </div>
  )
}

export default ImageTextRow
