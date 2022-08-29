import classNames from 'classnames'
import { FC, PropsWithChildren } from 'react'

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
      className={classNames(
        'flex items-center justify-center bg-primary text-white py-1 px-4 rounded-lg hover:opacity-90',
        classes?.button,
        disabled && 'opacity-50',
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
    className={classNames(
      'flex items-center justify-center text-tertiary my-1 mx-3',
      classes?.button,
      disabled ? 'opacity-50' : 'hover:text-primary',
    )}
    onClick={disabled ? null : onClick}
  >
    <span id={id}>{text}</span>
  </button>
)
