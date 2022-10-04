import { FC, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps {
  text: string
  onClick?: any
  classes?: {
    button?: string
  }
  disabled?: boolean
  id?: string
  icon?: any
  iconPosition?: 'start' | 'end'
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  text,
  onClick,
  classes,
  disabled,
  id,
  icon: Icon,
  iconPosition = 'start',
}) => {
  const spanPaddingClass = (() => {
    if (Icon && iconPosition === 'start') return 'pl-2'
    if (Icon && iconPosition === 'end') return 'pr-2'

    return ''
  })()

  return (
    <button
      id={id}
      disabled={disabled}
      className={twMerge(
        'flex items-center justify-center bg-primary text-white py-1 px-4 rounded-lg hover:opacity-90 disabled:opacity-50',
        classes?.button,
      )}
      onClick={disabled ? null : onClick}
    >
      {iconPosition === 'start' && Icon && Icon}
      <span id={id} className={spanPaddingClass}>
        {text}
      </span>
      {iconPosition === 'end' && Icon && Icon}
    </button>
  )
}

export const NavButton: FC<PropsWithChildren<ButtonProps>> = ({
  text,
  onClick,
  classes,
  disabled,
  id,
}) => (
  <button
    id={id}
    disabled={disabled}
    className={twMerge(
      'flex items-center justify-center text-tertiary my-1 mx-3 disabled:opacity-50 hover:text-primary',
      classes?.button,
    )}
    onClick={disabled ? null : onClick}
  >
    <span id={id}>{text}</span>
  </button>
)
