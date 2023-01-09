import { H1 } from '@/components/h1'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const SignUpForm = dynamic(() => import('../components/sign-up-form').then((m) => m.SignUpForm))

const SignUp: NextPage = () => {
  return (
    <div className='flex h-full items-center justify-center'>
      <div className='flex w-[400px] flex-col rounded-lg border border-solid border-slate-200 p-10 shadow-lg'>
        <H1>Create an account</H1>

        <div className='mt-4 mb-10 flex'>
          <span className='mr-2'>Already have an account?</span>
          <Link href='/login' className='text-primary underline hover:opacity-80'>
            Login
          </Link>
        </div>

        <SignUpForm />
      </div>
    </div>
  )
}

export default SignUp
