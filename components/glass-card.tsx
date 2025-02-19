import { FC, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export const GlassTitle: FC<PropsWithChildren> = ({ children }) => (
  <div className='mb-4 flex items-center font-nunito text-2xl text-white'>{children}</div>
)

export const GlassCard: FC<
  PropsWithChildren<{
    classes?: string
    className?: string
    hasPadding?: boolean
    rounded?: boolean
  }>
> = ({ className, children, hasPadding = true, rounded = true }) => (
  <div className={twMerge('glass', hasPadding && 'px-4 py-5', rounded && 'rounded-lg', className)}>
    {children}
  </div>
)
