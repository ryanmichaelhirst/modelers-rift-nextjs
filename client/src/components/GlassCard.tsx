import classNames from 'classnames'

export const GlassCard: React.FC<{ classes?: string }> = ({ classes, children }) => (
  <div className={classNames('glass', classes)}>{children}</div>
)
