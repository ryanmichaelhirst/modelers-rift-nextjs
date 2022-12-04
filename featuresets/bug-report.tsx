import { Button } from '@/components/button'
import { trpc } from '@/utils/trpc'
import { Dialog } from '@headlessui/react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

const DraftHeader = () => (
  <Dialog.Title className='rounded-t bg-primary p-6 text-white'>
    <p className='text-lg font-bold'>An error has occurred</p>
    <p className='text-sm'>"It's not a bug, it's a feature" (:</p>
  </Dialog.Title>
)

const CompleteHeader = () => (
  <Dialog.Title className='rounded-t bg-[#4BCA85] p-6 text-white'>
    <p className='text-lg font-bold'>Issue created</p>
    <p className='text-sm'>A copy of your submission is below</p>
  </Dialog.Title>
)

export const BugReport = () => {
  const router = useRouter()
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
      open: true,
      issue: 'Bug',
      title: '',
      description: '',
      stepsToReproduce: '',
      issueUrl: '',
    },
  })
  const createIssue = trpc.github.issue.useMutation()

  const onSubmit = handleSubmit(async (data) => {
    if (!data.title || !data.description || !data.stepsToReproduce) return

    try {
      const resp = await createIssue.mutateAsync({
        title: data.title,
        body: `### Description\n ${data.description}\n ### Steps to Reproduce\n ${data.stepsToReproduce}`,
        labels: ['bug'],
      })
      setValue('issueUrl', resp.issue.html_url)
    } catch (err) {
      const errMsg = err as string
      setError('issue', { message: errMsg })

      return
    }
  })

  const onClose = () => {
    setValue('open', false)
  }

  const onViewIssue = () => window.open(getValues('issueUrl'), '_blank')

  const issueIsCreated = isSubmitSuccessful && isSubmitted

  return (
    <Dialog open={getValues('open')} className='relative z-10' onClose={onClose}>
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className='fixed inset-0 bg-black/10' aria-hidden='true' />

      {/* Full-screen container to center the panel */}
      <div className='fixed inset-0 flex items-center justify-center p-4'>
        <Dialog.Panel className='mx-auto max-w-2xl rounded bg-white'>
          {isSubmitted && isSubmitSuccessful ? <CompleteHeader /> : <DraftHeader />}
          <div className='p-6'>
            <p className='mb-2'>Title</p>
            <input
              className='mb-4 w-full rounded border border-solid border-primary'
              disabled={issueIsCreated}
              value={watch('title')}
              {...register('title', { required: true })}
            />

            <p className='mb-2'>What happened?</p>
            <textarea
              className='mb-4 w-full rounded border border-solid border-primary'
              rows={5}
              disabled={issueIsCreated}
              value={watch('description')}
              {...register('description', { required: true })}
            />

            <p className='mb-2'>Specifically, what steps should we take to reproduce this error?</p>
            <textarea
              className='mb-4 w-full rounded border border-solid border-primary'
              disabled={issueIsCreated}
              rows={5}
              value={watch('stepsToReproduce')}
              {...register('stepsToReproduce', { required: true })}
            />

            {Object.keys(errors).length > 0 && <p>Uh oh, your issue wasn't created</p>}

            <Button
              onClick={issueIsCreated ? onViewIssue : onSubmit}
              text={issueIsCreated ? 'View issue' : 'Create issue'}
            />
            {issueIsCreated && <Button onClick={() => router.reload()} text={'Done'} />}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
