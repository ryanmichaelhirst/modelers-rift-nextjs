import { Button } from '@components/button'
import { trpc } from '@utils/trpc'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

const Login: NextPage = () => {
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
  const login = trpc.useMutation('user.login')
  const router = useRouter()

  const onSubmit = handleSubmit(async (data) => {
    if (!data.email.includes('@')) {
      setError('email', { message: "Email address must include '@'" }, { shouldFocus: true })

      return
    }

    if (!data.email.includes('.')) {
      setError('email', { message: 'Invalid email address' }, { shouldFocus: true })

      return
    }

    const resp = await login.mutateAsync({
      email: data.email,
      password: data.password,
    })

    if (resp?.user && resp?.token) router.push('/profile')

    setValue('email', '')
    setValue('password', '')
  })

  return (
    <div className='flex items-center justify-center h-full'>
      <div className='flex flex-col w-[400px] p-10 border border-solid border-slate-200 rounded-lg shadow-lg'>
        <h1 className='text-tertiary text-3xl'>Welcome back</h1>

        <div className='flex mt-4 mb-10'>
          <span className='mr-2'>Don't have an account?</span>
          <Link href='/sign-up'>
            <a className='text-primary underline hover:opacity-80'>Sign up</a>
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

        <Button
          id='login'
          onClick={onSubmit}
          classes={{
            button: 'mt-4 !py-2 !px-5 text-primary text-lg',
          }}
          text={'Login'}
        />
      </div>
    </div>
  )
}

export default Login
