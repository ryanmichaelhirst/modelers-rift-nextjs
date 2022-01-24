export const GlassCard: React.FC<{ classNames?: string }> = ({ classNames, children }) => (
  <div
    className='shadow-lg backdrop-opacity-40 rounded p-4'
    style={{
      background: 'linear-gradient(120deg, #fff -120%, rgba(255, 255, 255, 0) 113.04%)',
    }}
  >
    {children}
  </div>
)
