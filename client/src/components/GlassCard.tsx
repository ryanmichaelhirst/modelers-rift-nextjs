import classNames from 'classnames'

export const GlassCard: React.FC<{ classes?: string }> = ({ classes, children }) => (
  <div
    className={classNames('shadow-lg backdrop-opacity-40 rounded-lg px-4 py-5 w-72', classes)}
    style={{
      background: 'linear-gradient(120deg, #fff -120%, rgba(255, 255, 255, 0) 113.04%)',
    }}
  >
    {children}
  </div>
)
