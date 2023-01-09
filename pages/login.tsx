import { H1 } from '@/components/h1'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const LoginForm = dynamic(() => import('../components/login-form').then((m) => m.LoginForm))

const Login: NextPage = () => {
  return (
    <div className='flex h-full items-center justify-center'>
      <div className='flex w-[400px] flex-col rounded-lg border border-solid border-slate-200 p-10 shadow-lg'>
        <H1>Welcome back</H1>

        <div className='mt-4 mb-10 flex'>
          <span className='mr-2'>Don't have an account?</span>
          <Link href='/sign-up' className='text-primary underline hover:opacity-80'>
            Sign up
          </Link>
        </div>

        <LoginForm />
      </div>
    </div>
  )
}

export default Login
