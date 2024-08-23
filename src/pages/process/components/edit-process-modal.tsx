import { useForm } from 'react-hook-form'
import { Modal } from '../../../components/common/modal/modal'
import { InputFormLabel } from '../../../components/common/form/input-form-label'
import { Process } from '../interfaces/process'
interface EditProcessModalProps {
  isEditing: boolean
  process: Process
  handleToggle: () => void
  handleProcessForm: (process: Process) => void
}

const validations = {
  name: {
    required: { value: true, message: 'The name is required.' },
    maxLength: {
      value: 250,
      message: 'The name cannot exceed 250 characters.',
    },
  },
  description: {
    maxLength: {
      value: 250,
      message: 'The description cannot exceed 250 characters.',
    },
  },
}

export const EditProcessModal = ({
  isEditing,
  process,
  handleToggle,
  handleProcessForm,
}: EditProcessModalProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Process>({
    defaultValues: process,
  })

  return (
    <Modal onClickOverlay={handleToggle}>
      <section className="w-96">
        <h3 className="text-2xl mb-1">
          {isEditing ? 'Edit process' : 'New process'}
        </h3>
        <h4 className="text-xs mb-4 text-gray-400">
          {isEditing ? 'Change process information' : 'Create new process'}
        </h4>
        <form
          onSubmit={handleSubmit((data) => handleProcessForm(data))}
          className="flex flex-col gap-3"
        >
          {isEditing && <input type="hidden" {...register('id')} />}

          <input type="hidden" {...register('createdBy')} />
          <input type="hidden" {...register('createdOn')} />

          <InputFormLabel
            id="name"
            label="Name"
            autoComplete="off"
            InputContainerClassType={errors.name ? 'error' : 'success'}
            error={errors.name?.message}
            {...register('name', validations.name)}
          />
          <InputFormLabel
            id="description"
            label="Description"
            autoComplete="off"
            InputContainerClassType={errors.description ? 'error' : 'success'}
            error={errors.description?.message}
            {...register('description', validations.description)}
          />

          <div className="grid grid-cols-2 gap-5">
            <button
              className="w-full text-white bg-blue-550 rounded inline-block p-2 ring-0 outline-none hover:bg-blue-650 delay-0 duration-150 transition-colors ease-in-out focus:bg-blue-650 active:bg-blue-650"
              type="submit"
            >
              {isEditing ? 'Save' : 'Create'}
            </button>
            <button
              type="button"
              className="w-full text-white bg-gray-400 rounded inline-block p-2 ring-0 outline-none hover:bg-gray-600 delay-0 duration-150 transition-colors ease-in-out focus:bg-gray-600 active:bg-gray-600"
              onClick={handleToggle}
            >
              Cancel
            </button>
          </div>
        </form>
      </section>
    </Modal>
  )
}
