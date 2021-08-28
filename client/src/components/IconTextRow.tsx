import React from 'react'

const ellipsisStyle = {
  display: '-webkit-box',
  '-webkit-line-clamp': '3',
  '-webkit-box-orient': 'vertical',
}

const ImageTextRow = ({
  color,
  image,
  text,
}: {
  color?: string
  image: { src: string; h: string; w: string }
  text: string
}) => {
  return (
    <div className='flex mb-3 bg-blue-100'>
      <img
        className='mr-3 border-4 border-yellow-100 rounded-lg'
        style={{ height: image.h, width: image.w }}
        src={image.src}
      />
      <p style={{ ...ellipsisStyle }} className='text-xs overflow-hidden'>
        {text}
      </p>
    </div>
  )
}

export default ImageTextRow
