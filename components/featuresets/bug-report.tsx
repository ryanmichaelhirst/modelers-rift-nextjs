import { MenuItem, Modal, Select, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

const style = {
  transform: 'translate(-50%, -50%)',
}

export const BugReport = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      open: true,
      issue: 'Bug',
      title: undefined,
      description: undefined,
      stepsToReproduce: undefined,
    },
  })

  return (
    <Modal
      open={getValues('open')}
      aria-labelledby='bug-report-modal-title'
      aria-describedby='bug-report-modal-description'
    >
      <div
        className='absolute top-1/2 left-1/2 w-3/6 border border-white rounded shadow'
        style={style}
      >
        <div className='bg-[#FF7070] text-white p-6'>
          <p className='text-lg font-bold'>An error has occurred</p>
          <p className='text-sm'>"It's not a bug, it's a feature" (:</p>
        </div>
        <div className='bg-white p-6'>
          <Select value={getValues('issue')} label='Issue Type'>
            <MenuItem value='Bug'>Bug</MenuItem>
          </Select>
          <TextField label='Title' value={getValues('title')} size='small' />
          <div>
            <p>What happened?</p>
            <TextField label='Description' multiline rows={4} value={getValues('description')} />
          </div>
          <div>
            <p>Specifically, what steps should we take to reproduce this error?</p>
            <TextField
              label='Steps to Reproduce'
              multiline
              rows={4}
              value={getValues('stepsToReproduce')}
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}
