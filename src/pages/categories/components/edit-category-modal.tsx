import { useForm } from 'react-hook-form'
import { InputFormLabel } from '../../../components/common/form/input-form-label'
import { Modal } from '../../../components/common/modal/modal'
import { WorkItemCategory } from '../interfaces/work-item-category'
import { Process } from '../../process/interfaces/process'
import { ProcessDropdownInput } from '../../../components/common/core/process-dropdown-input'

interface EditCategoryModalProps {
  isEditing: boolean
  category: WorkItemCategory
  processes: Process[]
  handleToggle: () => void
  handleProcessForm: (category: WorkItemCategory) => void
}

const validations = {
  name: {
    required: { value: true, message: 'The name is required.' },
    maxLength: {
      value: 250,
      message: 'The name cannot exceed 250 characters.',
    },
  },
  processId: {
    required: { value: true, message: 'The process is required.' },
    min: {
      value: 1,
      message: 'The process is required.',
    },
  },
}

export const EditCategoryModal = ({
  isEditing,
  category,
  processes,
  handleToggle,
  handleProcessForm,
}: EditCategoryModalProps) => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<WorkItemCategory>({
    defaultValues: category,
  })

  return (
    <Modal onClickOverlay={handleToggle}>
      <section className="w-96">
        <h3 className="text-2xl mb-1">
          {isEditing ? 'Edit category' : 'New category'}
        </h3>
        <h4 className="text-xs mb-4 text-gray-400">
          {isEditing ? 'Change category information' : 'Create new category'}
        </h4>
        <form
          onSubmit={handleSubmit((data) => handleProcessForm(data))}
          className="flex flex-col gap-3"
        >
          {isEditing && <input type="hidden" {...register('id')} />}

          <InputFormLabel
            id="name"
            label="Name"
            autoComplete="off"
            InputContainerClassType={errors.name ? 'error' : 'success'}
            error={errors.name?.message}
            {...register('name', validations.name)}
          />

          <ProcessDropdownInput
            inputName="processId"
            processes={processes}
            control={control}
            error={errors.processId?.message}
            value={category.process?.name}
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
