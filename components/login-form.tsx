import { Button } from '@/components/button'
import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { PasswordInput } from '../components/password-input'

export const LoginForm = () => {
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
  const login = trpc.user.login.useMutation()
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
    <>
      <div className='mb-4 flex flex-col'>
        <label className='mb-1 text-tertiary'>Email</label>
        <input
          className='rounded border border-solid border-slate-300 px-2 text-slate-500'
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
    </>
  )
}
