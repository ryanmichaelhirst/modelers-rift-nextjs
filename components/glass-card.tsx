import classNames from 'classnames'
import { FC, PropsWithChildren } from 'react'

export const GlassTitle: FC<PropsWithChildren> = ({ children }) => (
  <div className='flex items-center text-2xl text-white font-nunito mb-4'>{children}</div>
)

export const GlassCard: FC<
  PropsWithChildren<{
    classes?: string
    hasPadding?: boolean
    rounded?: boolean
  }>
> = ({ classes, children, hasPadding = true, rounded = true }) => (
  <div className={classNames('glass', hasPadding && 'px-4 py-5', rounded && 'rounded-lg', classes)}>
    {children}
  </div>
)
