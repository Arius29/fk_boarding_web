import { useForm } from 'react-hook-form'
import { Modal } from '../../../components/common/modal/modal'
import { ProcessUser } from '../interfaces/process-user'
import { UserDropdownInput } from '../../../components/common/core/user-dropdown-input'
import { DropDownMenu } from '../../../components/common/core/drop-down-menu'
import { DropDownMenuItem } from '../../../components/common/core/drop-dowm-menu-item'
interface EditProcessSherpaModalProps {
  isEditing: boolean
  process: ProcessUser
  handleToggle: () => void
  handleProcessForm: (data: ProcessUser) => void
}
export const EditProcessSherpaModal = ({
  isEditing,
  process,
  handleToggle,
  handleProcessForm,
}: EditProcessSherpaModalProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ProcessUser>({
    defaultValues: process,
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
          <UserDropdownInput {...register('userId')} />
          <DropDownMenu
            label="Process"
            id="processId"
            title="Select process"
            error={errors.processId?.message}
          >
            {({ showModal, handleToggleModal }) =>
              showModal ? (
                <>
                  <input className="hidden" {...register('processId')} />
                  <ul className="absolute z-10 bg-white w-full top-full">
                    <DropDownMenuItem onClick={handleToggleModal}>
                      Testing
                    </DropDownMenuItem>
                    <DropDownMenuItem onClick={handleToggleModal} type="active">
                      Testing 2
                    </DropDownMenuItem>
                  </ul>
                </>
              ) : (
                <></>
              )
            }
          </DropDownMenu>
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
