import React from 'react'
import Tippy from '@tippyjs/react'

const ellipsisStyle = {
  display: '-webkit-box',
  '-webkit-line-clamp': '3',
  '-webkit-box-orient': 'vertical',
}

const ImageTextRow = ({
  color,
  image,
  text,
  tooltip,
}: {
  color?: string
  image: { src: string; h: string; w: string }
  text: string
  tooltip: string
}) => {
  return (
    <div className='flex mb-3 bg-blue-100 h-14 rounded'>
      <img className='mr-3 border-2 border-yellow-100 rounded shadow' src={image.src} />
      <Tippy content={tooltip}>
        <p style={{ ...ellipsisStyle }} className='text-xs overflow-hidden m-2'>
          {text}
        </p>
      </Tippy>
    </div>
  )
}

export default ImageTextRow
