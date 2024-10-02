import { IconLink, IconTag } from '@tabler/icons-react'
import { UserDropdownInput } from '../../../components/common/core/user-dropdown-input'
import { WorkItemForm } from '../interfaces/work-item-form'
import { useForm, useWatch } from 'react-hook-form'
import { WorkItemPriorityDropDown } from './work-item-priority-drop-down'
import { InputFormLabel } from '../../../components/common/form/input-form-label'
import { TextAreaForm } from '../../../components/common/form/text-area-form'
import { UserListDropdownInput } from '../../../components/common/core/user-list-dropdown-input'
import { User } from '../../sherpas/interfaces/user'
import { WorkItem } from '../interfaces/work-item'
import { WorkItemsTagsList } from './work-items-tags-list'
import { Avatar } from '../../../components/common/layout/avatar'
import { WorkItemStatusBadge } from './work-item-status-badge'
import { Modal } from '../../../components/common/modal/modal'
import { Tag } from '../../tags/interfaces/tag'
import { CategoryDropDownInput } from '../../../components/common/core/category-drop-dowm-input'

interface FormWorkItemProps {
  handleToggle: () => void
  workItem: WorkItem
}

export const FormWorkItem = ({ workItem, handleToggle }: FormWorkItemProps) => {
  const {
    register,
    formState: { errors },
    control,
    setValue,
    getValues,
    handleSubmit,
  } = useForm<WorkItemForm>({
    defaultValues: workItem,
  })

  const recipients = useWatch({
    control,
    name: 'recipients',
    defaultValue: [],
  })
  const tags = getValues('tags') ?? []
  const reporters = getValues('reporters') ?? []
  const handleAddRecipient = (user: User) => {
    const currentRecipients = getValues('recipients') ?? []
    setValue('recipients', [
      ...currentRecipients,
      { workItemId: 0, status: 0, userId: user.id, user: user },
    ])
  }

  const handleDeleteRecipient = (userId: string) => {
    const currentRecipients = getValues('recipients') ?? []
    setValue(
      'recipients',
      currentRecipients.filter(
        (recipient) => recipient.user?.id || recipient.userId !== userId
      )
    )
  }

  const handleAddTag = (tag: Tag) => {
    const currentTags = getValues('tags') ?? []
    setValue('tags', [
      ...currentTags,
      { workItemId: 0, tagId: tag.id, tag: tag },
    ])
  }

  const handleDeleteTag = (id: number) => {
    const currentTags = getValues('tags') ?? []
    setValue(
      'tags',
      currentTags.filter((tag) => tag.tagId !== id)
    )
  }

  const handleAddReporter = (user: User) => {
    const currentReporters = getValues('reporters') ?? []
    setValue('reporters', [
      ...currentReporters,
      { workItemId: 0, userId: user.id, user: user },
    ])
  }

  const handleDeleteReporter = (userId: string) => {
    const currentReporters = getValues('reporters') ?? []
    setValue(
      'reporters',
      currentReporters.filter((r) => r.userId !== userId)
    )
  }

  console.log(recipients)

  return (
    <Modal onClickOverlay={handleToggle}>
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
          <div>
            <span className="text-gray-950 font-bold inline-block w-full">
              Assigner
            </span>
            <UserDropdownInput
              name="assigner"
              control={control}
              error={errors.assigner?.message}
            />
          </div>
          <CategoryDropDownInput
            control={control}
            inputName="categoryId"
            value={workItem?.category?.name}
            error={errors.categoryId?.message}
          />
          <WorkItemPriorityDropDown control={control} inputName="priority" />
          <InputFormLabel
            id="dueDate"
            label="Due Date"
            type="date"
            InputContainerClassType={errors.dueDate ? 'error' : 'success'}
            error={errors.dueDate?.message}
            {...register('dueDate')}
          />
          <TextAreaForm
            id="notes"
            label="Notes"
            textAreaClassType={errors.notes ? 'error' : 'success'}
            error={errors.notes?.message}
            placeholder="Write a description or notes here"
            {...register('notes')}
          />
          <section>
            <h3>Recipients</h3>
            {recipients?.map((recipient, index) => (
              <li
                key={index}
                onClick={() =>
                  handleDeleteRecipient(
                    recipient.user?.id || recipient.userId || ''
                  )
                }
              >
                <Avatar
                  name={recipient.user?.name || 'Sherpa User'}
                  size="xs"
                />
                <span>{recipient.user?.name || 'Sherpa User'}</span>
                <WorkItemStatusBadge status={recipient.status || 0} />
              </li>
            ))}
            <UserListDropdownInput
              error={errors.recipients?.message}
              addUser={handleAddRecipient}
            />
          </section>
          <section>
            <h3>Tags</h3>
            <IconTag stroke={2} />
            <WorkItemsTagsList workItemTags={tags || []} />
          </section>
          <section>
            <h3>Attachment files</h3>
          </section>
          <section>
            <h3>Secondary tasks</h3>
          </section>
        </form>
      </section>
    </Modal>
  )
}
