import classNames from 'classnames'

export const GlassTitle: React.FC = ({ children }) => (
  <div className='flex items-center text-2xl text-white font-nunito mb-4'>{children}</div>
)

export const GlassCard: React.FC<{
  classes?: string
  hasPadding?: boolean
  rounded?: boolean
}> = ({ classes, children, hasPadding = true, rounded = true }) => (
  <div className={classNames('glass', hasPadding && 'px-4 py-5', rounded && 'rounded-lg', classes)}>
    {children}
  </div>
)
