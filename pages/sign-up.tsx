import { Button } from '@components/button'
import { AnnotationIcon, DocumentDownloadIcon, StarIcon } from '@heroicons/react/outline'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

const SignUp: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitted, isSubmitSuccessful },
    setValue,
    getValues,
    setError,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    if (!data.email.includes('@')) {
      setError('email', { message: "Email address must include '@'" }, { shouldFocus: true })

      return
    }

    if (!data.email.includes('.')) {
      setError('email', { message: 'Invalid email address' }, { shouldFocus: true })

      return
    }

    setValue('email', '')
    setValue('password', '')
  })

  return (
    <div className='flex items-center justify-center h-full'>
      <div className='flex flex-col w-[400px] p-10 border border-solid border-slate-200 rounded-lg shadow-lg'>
        <h1 className='text-tertiary text-3xl'>Create an account</h1>

        <div className='flex mt-4 mb-10'>
          <span className='mr-2'>Already have an account?</span>
          <Link href='/login'>
            <a className='text-primary underline hover:opacity-80'>Login</a>
          </Link>
        </div>

        <div className='flex flex-col mb-4'>
          <label className='mb-1 text-tertiary'>Email</label>
          <input
            className='border border-solid border-slate-300 rounded text-slate-300 px-2'
            placeholder='Email'
            value={watch('email')}
            {...register('email', { required: 'Email is required' })}
          />
          <span className='ml-2 text-red-600 mt-2'>
            {errors.email && <p>{errors.email.message}</p>}
          </span>
        </div>

        <div className='flex flex-col mb-4'>
          <label className='mb-1 text-tertiary'>Password</label>
          <input
            className='border border-solid border-slate-300 rounded text-slate-300 px-2'
            placeholder='Password'
            value={watch('password')}
            {...register('password', { required: 'Password is required' })}
          />
          <span className='ml-2 text-red-600 mt-2'>
            {errors.password && <p>{errors.password.message}</p>}
          </span>
        </div>

        <div className='mt-2 mb-6'>
          <p className='text-lg'>The following comes with your free account!</p>
          <ul className='mt-2'>
            <li className='flex items-center pl-2 my-2'>
              <DocumentDownloadIcon className='h-5 w-5 text-primary' />
              <span className='ml-2'>Download 1 free model</span>
            </li>
            <li className='flex items-center pl-2 my-2'>
              <StarIcon className='h-5 w-5 text-primary' />
              <span className='ml-2'>Create a favorites list</span>
            </li>
            <li className='flex items-center pl-2 my-2'>
              <AnnotationIcon className='h-5 w-5 text-primary' />
              <span className='ml-2'>Access to community</span>
            </li>
          </ul>
        </div>

        <Button
          id='create-account'
          onClick={onSubmit}
          classes={{
            button: 'mt-4 !py-2 !px-5 text-primary text-lg',
          }}
          text={'Create an account'}
        />
      </div>
    </div>
  )
}

export default SignUp
