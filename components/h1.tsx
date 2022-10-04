import { FC, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export const H1: FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => (
  <h1 className={twMerge('text-3xl text-tertiary', className)}>{children}</h1>
)
