import { Button } from '@components/button'
import { createIssue } from '@lib/github'
import { FormControl, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

const DraftHeader = () => (
  <div className='bg-[#FF7070] text-white p-6 rounded-t-lg'>
    <p className='text-lg font-bold'>An error has occurred</p>
    <p className='text-sm'>"It's not a bug, it's a feature" (:</p>
  </div>
)

const CompleteHeader = () => (
  <div className='bg-[#4BCA85] text-white p-6 rounded-t-lg'>
    <p className='text-lg font-bold'>Issue created</p>
    <p className='text-sm'>A copy of your submission is below</p>
  </div>
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

  const onSubmit = handleSubmit(async (data) => {
    if (!data.title || !data.description || !data.stepsToReproduce) return

    const { data: issue, status } = await createIssue({
      title: data.title,
      body: `### Description\n ${data.description}\n ### Steps to Reproduce\n ${data.stepsToReproduce}`,
      labels: ['bug'],
    })

    if (status !== 201) {
      setError('issue', {
        message: 'An error occurred and the issue was not created.',
      })

      return
    }

    setValue('issueUrl', issue.url)
  })

  const onViewIssue = () => window.open(getValues('issueUrl'), '_blank')

  const issueIsCreated = isSubmitSuccessful && isSubmitted

  return (
    <Modal
      open={getValues('open')}
      aria-labelledby='bug-report-modal-title'
      aria-describedby='bug-report-modal-description'
    >
      <div className='absolute top-1/2 left-1/2 w-3/6 rounded-lg shadow-lg -translate-x-[50%] -translate-y-[50%]'>
        {isSubmitted && isSubmitSuccessful ? <CompleteHeader /> : <DraftHeader />}
        <div className='bg-white p-6 rounded-b-lg'>
          <FormControl fullWidth className='mb-4' disabled>
            <InputLabel id='issue-select-label'>Issue Type</InputLabel>
            <Select value={watch('issue')} label='Issue Type' labelId='issue-select-label'>
              <MenuItem value='Bug'>Bug</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label='Title'
            size='small'
            className='mb-4 w-full'
            disabled={issueIsCreated}
            value={watch('title')}
            {...register('title', { required: true })}
          />

          <p className='mb-2'>What happened?</p>
          <TextField
            label='Description'
            multiline
            rows={4}
            className='mb-4 w-full'
            disabled={issueIsCreated}
            value={watch('description')}
            {...register('description', { required: true })}
          />

          <p className='mb-2'>Specifically, what steps should we take to reproduce this error?</p>
          <TextField
            label='Steps to Reproduce'
            multiline
            rows={4}
            className='mb-4 w-full'
            disabled={issueIsCreated}
            value={watch('stepsToReproduce')}
            {...register('stepsToReproduce', { required: true })}
          />

          {Object.keys(errors).length > 0 && <p>Uh oh, your issue wasn't created</p>}

          <Button
            onClick={issueIsCreated ? onViewIssue : onSubmit}
            text={issueIsCreated ? 'View issue' : 'Create issue'}
            variant='contained'
            classes={{
              root:
                'mr-6 bg-[#4F8BFF] text-white px-4 py-2 font-nunito capitalize font-bold text-lg',
            }}
          />
          {issueIsCreated && (
            <Button
              onClick={() => router.reload()}
              text={'Done'}
              variant='contained'
              classes={{
                root:
                  'mr-6 bg-[#4F8BFF] text-white px-4 py-2 font-nunito capitalize font-bold text-lg',
              }}
            />
          )}
        </div>
      </div>
    </Modal>
  )
}
