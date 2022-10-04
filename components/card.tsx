import { FC, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export const Card: FC<PropsWithChildren<{ classes?: string }>> = ({ classes, children }) => (
  <div
    className={twMerge(
      'p-4 border-white border-opacity-5 border-2 bg-white bg-opacity-10 rounded shadow-lg',
      classes,
    )}
  >
    {children}
  </div>
)
