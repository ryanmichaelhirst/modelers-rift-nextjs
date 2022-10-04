import { FC, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export const Card: FC<PropsWithChildren<{ classes?: string }>> = ({ classes, children }) => (
  <div
    className={twMerge(
      'rounded border-2 border-white border-opacity-5 bg-white bg-opacity-10 p-4 shadow-lg',
      classes,
    )}
  >
    {children}
  </div>
)
