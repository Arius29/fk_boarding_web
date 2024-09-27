import { IconLink, IconTag } from '@tabler/icons-react'
import { Modal } from 'rsuite'
import { UserDropdownInput } from '../../../components/common/core/user-dropdown-input'
import { WorkItemForm } from '../interfaces/work-item-form'
import { useForm } from 'react-hook-form'

export const FormWorkItem = () => {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<WorkItemForm>({
    defaultValues: {},
  })

  return (
    <Modal>
      <section className="w-96">
        <form
          action=""
          onSubmit={handleSubmit((data) => {
            console.log(data)
          })}
        >
          <header>
            <button type="button">
              <IconLink stroke={2} />
              Attachment
            </button>
            <button type="button">
              <IconTag stroke={2} />
              Tags
            </button>
          </header>
          <input type="text" placeholder="Title" />
          <UserDropdownInput
            name="assigner"
            control={control}
            error={errors.assigner?.message}
          />
        </form>
      </section>
    </Modal>
  )
}
