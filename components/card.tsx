import classNames from 'classnames'
import React, { FC, PropsWithChildren } from 'react'

export const Card: FC<PropsWithChildren<{ classes?: string; style?: React.CSSProperties }>> = ({
  classes,
  style,
  children,
}) => (
  <div
    className={classNames(
      'p-4 border-white border-opacity-5 border-2 bg-white bg-opacity-10 rounded shadow-lg',
      classes,
    )}
    style={style}
  >
    {children}
  </div>
)
