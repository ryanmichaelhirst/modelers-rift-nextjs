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
  type?: 'filled' | 'text'
}

// TODO: change to className so tailwind-prettier organizes classes
export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  text,
  onClick,
  classes,
  disabled,
  id,
  icon: Icon,
  iconPosition = 'start',
  type = 'filled',
}) => {
  const spanPaddingClass = (() => {
    if (Icon && iconPosition === 'start') return 'pl-2'
    if (Icon && iconPosition === 'end') return 'pr-2'

    return ''
  })()

  const btnClassname = (() => {
    if (type === 'filled')
      return 'flex items-center justify-center rounded-lg bg-primary py-1 px-4 text-white hover:opacity-90 disabled:opacity-50'

    // type === 'text'
    return 'flex items-center rounded-lg text-primary hover:opacity-90 disabled:opacity-50'
  })()

  return (
    <button
      id={id}
      disabled={disabled}
      className={twMerge(btnClassname, classes?.button)}
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
      'my-1 mx-3 flex items-center justify-center text-sm text-tertiary hover:text-primary disabled:opacity-50 md:text-base',
      classes?.button,
    )}
    onClick={disabled ? null : onClick}
  >
    <span id={id}>{text}</span>
  </button>
)
