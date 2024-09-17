import { useForm } from 'react-hook-form'
import { Modal } from '../../../components/common/modal/modal'
import { ProcessUser } from '../interfaces/process-user'
import { UserDropdownInput } from '../../../components/common/core/user-dropdown-input'
import { Process } from '../../process/interfaces/process'
import { ProcessDropdownInput } from '../../../components/common/core/process-dropdown-input'
import { ProcessUserForm } from '../interfaces/process-user-form'
import { StatusDropdownInput } from '../../../components/common/core/status-dropdown-input'

interface EditProcessSherpaModalProps {
  processes: Process[]
  isEditing: boolean
  processUser: ProcessUser
  handleToggle: () => void
  handleProcessForm: (data: ProcessUser) => void
}

export const EditProcessSherpaModal = ({
  isEditing,
  processUser,
  processes = [],
  handleToggle,
  handleProcessForm,
}: EditProcessSherpaModalProps) => {
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ProcessUserForm>({
    defaultValues: processUser,
  })

  return (
    <Modal onClickOverlay={handleToggle}>
      <section className="w-96">
        <h3 className="text-2xl mb-1">
          {isEditing ? 'Edit employee process' : 'New employee process'}
        </h3>
        <h4 className="text-xs mb-4 text-gray-400">
          {isEditing
            ? 'Change employee process information'
            : 'Create new employee process'}
        </h4>
        <form
          onSubmit={handleSubmit((data) => handleProcessForm(data))}
          className="flex flex-col gap-3"
        >
          <UserDropdownInput
            control={control}
            error={errors.userId?.message}
            value={processUser.user?.name}
          />
          <ProcessDropdownInput
            inputName="processId"
            processes={processes}
            error={errors.processId?.message}
            value={processUser.process?.name}
            control={control}
          />

          {!isEditing && (
            <label
              htmlFor="auto-add-work-items-user"
              className="text-sm font-medium text-gray-900 flex flex-row items-center"
            >
              <input
                type="checkbox"
                id="auto-add-work-items-user"
                {...register('autoAddWorkItemsUser')}
                className="mr-2 w-4 h-4 text-blue-600 border-gray-300 rounded ring-0"
              />
              Auto add work items
            </label>
          )}

          {isEditing && (
            <StatusDropdownInput
              control={control}
              inputName="status"
              error={errors.status?.message}
              value={processUser.status}
            />
          )}

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
