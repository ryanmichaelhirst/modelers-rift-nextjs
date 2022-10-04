import { Button } from '@/components/button'
import { PasswordInput } from '@/components/password-input'
import { trpc } from '@/utils/trpc'
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
    <div className='flex h-full items-center justify-center'>
      <div className='flex w-[400px] flex-col rounded-lg border border-solid border-slate-200 p-10 shadow-lg'>
        <h1 className='text-3xl text-tertiary'>Welcome back</h1>

        <div className='mt-4 mb-10 flex'>
          <span className='mr-2'>Don't have an account?</span>
          <Link href='/sign-up'>
            <a className='text-primary underline hover:opacity-80'>Sign up</a>
          </Link>
        </div>

        <div className='mb-4 flex flex-col'>
          <label className='mb-1 text-tertiary'>Email</label>
          <input
            className='rounded border border-solid border-slate-300 px-2 text-slate-300'
            placeholder='Email'
            value={watch('email')}
            {...register('email', { required: 'Email is required' })}
          />
          <span className='ml-2 mt-2 text-red-600'>
            {errors.email && <p>{errors.email.message}</p>}
          </span>
        </div>

        <div className='mb-4 flex flex-col'>
          <label className='mb-1 text-tertiary'>Password</label>
          <PasswordInput
            value={watch('password')}
            register={register('password', { required: 'Password is required' })}
          />
          <span className='ml-2 mt-2 text-red-600'>
            {errors.password && <p>{errors.password.message}</p>}
          </span>
        </div>

        <Button
          id='login'
          onClick={onSubmit}
          classes={{
            button: 'mt-4 !py-2 !px-5 text-lg',
          }}
          text={'Login'}
        />
      </div>
    </div>
  )
}

export default Login
