import classNames from 'classnames'
import { FC, PropsWithChildren } from 'react'

export const GlassTitle: FC<PropsWithChildren> = ({ children }) => (
  <div className='flex items-center text-2xl text-white font-nunito mb-4'>{children}</div>
)

export const GlassCard: FC<
  PropsWithChildren<{
    classes?: string
    className?: string
    hasPadding?: boolean
    rounded?: boolean
  }>
> = ({ className, children, hasPadding = true, rounded = true }) => (
  <div
    className={classNames('glass', hasPadding && 'px-4 py-5', rounded && 'rounded-lg', className)}
  >
    {children}
  </div>
)
