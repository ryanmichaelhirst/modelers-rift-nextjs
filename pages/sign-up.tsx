import { Button } from '@/components/button'
import { H1 } from '@/components/h1'
import { PasswordInput } from '@/components/password-input'
import { trpc } from '@/utils/trpc'
import { AnnotationIcon, DocumentDownloadIcon, StarIcon } from '@heroicons/react/outline'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
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
      name: '',
      email: '',
      password: '',
    },
  })
  const signUp = trpc.useMutation('user.signup')
  const router = useRouter()

  const onSubmit = handleSubmit(async (data) => {
    const { name, email, password } = data

    if (!email.includes('@')) {
      setError('email', { message: "Email address must include '@'" }, { shouldFocus: true })

      return
    }

    if (!email.includes('.')) {
      setError('email', { message: 'Invalid email address' }, { shouldFocus: true })

      return
    }

    try {
      const resp = await signUp.mutateAsync({
        name,
        email,
        password,
      })

      if (resp.user && resp.token) router.push('/profile')
    } catch (err) {}
  })

  return (
    <div className='flex h-full items-center justify-center'>
      <div className='flex w-[400px] flex-col rounded-lg border border-solid border-slate-200 p-10 shadow-lg'>
        <H1>Create an account</H1>

        <div className='mt-4 mb-10 flex'>
          <span className='mr-2'>Already have an account?</span>
          <Link href='/login'>
            <a className='text-primary underline hover:opacity-80'>Login</a>
          </Link>
        </div>

        <div className='mb-4 flex flex-col'>
          <label className='mb-1 text-tertiary'>Name</label>
          <input
            className='rounded border border-solid border-slate-300 px-2 text-slate-300'
            placeholder='Name'
            value={watch('name')}
            {...register('name', { required: 'Name is required' })}
          />
          <span className='ml-2 mt-2 text-red-600'>
            {errors.name && <p>{errors.name.message}</p>}
          </span>
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

        <div className='mt-2 mb-6'>
          <p className='text-lg'>The following comes with your free account!</p>
          <ul className='mt-2'>
            <li className='my-2 flex items-center pl-2'>
              <DocumentDownloadIcon className='h-5 w-5 text-primary' />
              <span className='ml-2'>Download 1 free model</span>
            </li>
            <li className='my-2 flex items-center pl-2'>
              <StarIcon className='h-5 w-5 text-primary' />
              <span className='ml-2'>Create a favorites list</span>
            </li>
            <li className='my-2 flex items-center pl-2'>
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
