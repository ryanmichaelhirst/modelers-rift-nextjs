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
    <div className='flex relative items-center'>
      <input
        className='border border-solid border-slate-300 rounded text-slate-300 px-2 w-full'
        placeholder='Password'
        value={value}
        {...register}
        {...(isPasswordVisible ? { type: 'text' } : { type: 'password' })}
      />
      {isPasswordVisible ? (
        <EyeOffIcon
          className='text-slate-300 h-5 w-5 cursor-pointer w-1/5 absolute right-0'
          onClick={() => setIsPasswordVisible(false)}
        />
      ) : (
        <EyeIcon
          className='text-slate-300 h-5 w-5 cursor-pointer w-1/5 absolute right-0'
          onClick={() => setIsPasswordVisible(true)}
        />
      )}
    </div>
  )
}
