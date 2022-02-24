import React, { FC } from 'react'

export const Card: FC<{ style?: React.CSSProperties }> = ({ style, children }) => (
  <div
    className='p-4 border-white border-opacity-5 border-2 bg-white bg-opacity-10 rounded shadow-lg'
    style={style}
  >
    {children}
  </div>
)
