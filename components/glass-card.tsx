import classNames from 'classnames'

export const GlassTitle: React.FC = ({ children }) => (
  <div className='flex items-center text-2xl text-white font-nunito mb-4'>{children}</div>
)

export const GlassCard: React.FC<{ classes?: string }> = ({ classes, children }) => (
  <div className={classNames('glass', classes)}>{children}</div>
)
