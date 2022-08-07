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
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  text,
  onClick,
  classes,
  disabled,
  id,
  icon: Icon,
}) => (
  <button
    id={id}
    disabled={disabled}
    className={classNames(
      'flex items-center justify-center bg-primary text-white py-1 px-4 text-xs rounded-lg hover:opacity-90',
      classes?.button,
      disabled && 'opacity-50',
    )}
    onClick={disabled ? null : onClick}
  >
    {Icon && Icon}
    <span id={id} className={classNames(Icon && 'pl-2')} onClick={disabled ? null : onClick}>
      {text}
    </span>
  </button>
)

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
      'flex items-center justify-center text-tertiary py-1 px-2 text',
      classes?.button,
      disabled ? 'opacity-50' : 'hover:text-primary',
    )}
    onClick={disabled ? null : onClick}
  >
    <span id={id} className='pl-2' onClick={disabled ? null : onClick}>
      {text}
    </span>
  </button>
)
