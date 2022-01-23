export const GlassCard: React.FC<{ classNames?: string }> = ({ classNames, children }) => (
  <div
    className='bg-white/[.30] shadow-lg backdrop-opacity-40 rounded'
    style={{ border: '1px solid rgba( 255, 255, 255, 0.18 )' }}
  >
    {children}
  </div>
)
