import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

export const PasswordInput = ({
  value,
  register,
}: {
  value: string
  register: UseFormRegisterReturn<'password'>
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <div className='relative flex items-center'>
      <input
        className='w-full rounded border border-solid border-slate-300 px-2 text-slate-300'
        placeholder='Password'
        value={value}
        {...register}
        {...(isPasswordVisible ? { type: 'text' } : { type: 'password' })}
      />
      {isPasswordVisible ? (
        <EyeOffIcon
          className='absolute right-0 h-5 w-5 w-1/5 cursor-pointer text-slate-300'
          onClick={() => setIsPasswordVisible(false)}
        />
      ) : (
        <EyeIcon
          className='absolute right-0 h-5 w-5 w-1/5 cursor-pointer text-slate-300'
          onClick={() => setIsPasswordVisible(true)}
        />
      )}
    </div>
  )
}
