import { IconDots, IconX, IconLink, IconTag } from '@tabler/icons-react'
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
import { TagDropdownInput } from '../../../components/common/core/tag-dropdown-input'
import { WorkItemAvatarStackGroup } from './work-item-avatar-stack-group'
import { WorkItemStatusDropdownInput } from './work-item-status-dropdown-input'
import { useWorkItemApiQuery } from '../../../hooks/use-work-item-api-query'

interface FormWorkItemProps {
  handleToggle: () => void
  workItem: WorkItem
  isEditing?: boolean
}

export const FormWorkItem = ({
  workItem,
  handleToggle,
  isEditing = false,
}: FormWorkItemProps) => {
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

  const { mutationAddWorkItem, mutationEditWorkItem } = useWorkItemApiQuery({
    enabled: false,
  })

  const recipients = useWatch({
    control,
    name: 'recipients',
    defaultValue: [],
  })
  const tags = useWatch({
    control,
    name: 'tags',
    defaultValue: [],
  })
  const reporters = useWatch({
    control,
    name: 'reporters',
    defaultValue: [],
  })
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
      currentRecipients.filter((r) => r.user?.id !== userId)
    )
  }

  const handleAddTag = (tag: Tag) => {
    const currentTags = getValues('tags') ?? []

    const tagExists = currentTags.find((t) => t.tagId === tag.id)
    if (tagExists) handleDeleteTag(tagExists.tagId)
    else
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

  const handleFormSubmit = (data: WorkItem) => {
    if (isEditing) mutationEditWorkItem.mutate(data)
    else mutationAddWorkItem.mutate(data)

    handleToggle()
  }

  return (
    <Modal onClickOverlay={handleToggle}>
      <section className="w-[750px]">
        <form
          onSubmit={handleSubmit((data) => handleFormSubmit(data))}
          className="flex flex-col gap-3"
        >
          <header className="flex flex-row gap-x-8 items-center">
            <button
              type="button"
              className="py-2 px-4 rounded bg-blue-550 bg-opacity-30 text-sm flex flex-row flex-nowrap gap-3 items-center w-38 transition-colors duration-200 ease-in-out delay-0 hover:bg-opacity-80 active:bg-opacity-80 focus:bg-opacity-80"
            >
              <IconLink stroke={2} className="text-gray-950" />
              Attachment
            </button>
            <TagDropdownInput
              addTag={handleAddTag}
              selectedTags={tags ?? []}
              error={errors.tags?.message}
            />
            <WorkItemStatusDropdownInput
              control={control}
              value={workItem.status}
              error={errors.status?.message}
            />
            <div className="flex flex-row gap-3 self-start items-center">
              <button
                type="button"
                className="self-start transition-transform duration-200 ease-in-out delay-0 hover:scale-110 focus:scale-110 active:scale-110"
              >
                <IconDots stroke={2} className="text-gray-950 " />
              </button>
              <button
                type="button"
                className="self-start transition-transform duration-200 ease-in-out delay-0 hover:scale-110 focus:scale-110 active:scale-110"
                onClick={handleToggle}
              >
                <IconX stroke={2} className="text-gray-950 " />
              </button>
            </div>
          </header>
          <section className="grid grid-cols-2 gap-3">
            <fieldset className="col-span-2">
              <input
                type="text"
                placeholder="Title"
                autoComplete="off"
                className="w-full p-2 text-xl outline-none ring-0"
                {...register('name', { required: 'Title is required' })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm w-full">
                  {errors.name.message}
                </p>
              )}
            </fieldset>
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
            <div className="grid grid-cols-8">
              <span className="text-gray-950 font-bold inline-block w-full col-span-full">
                Reporters
              </span>
              <UserListDropdownInput
                error={errors.reporters?.message}
                addUser={handleAddReporter}
                containerStyles={{ gridColumn: 'span 5' }}
              />
              <WorkItemAvatarStackGroup
                users={reporters ?? []}
                className="col-span-3 flex row-span-2 h-full flex-row items-start justify-end w-full"
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
            <InputFormLabel
              id="order"
              label="Order"
              type="number"
              InputContainerClassType={errors.order ? 'error' : 'success'}
              error={errors.order?.message}
              {...register('order')}
            />
            <TextAreaForm
              id="notes"
              label="Notes"
              textAreaClassType={errors.notes ? 'error' : 'success'}
              error={errors.notes?.message}
              placeholder="Write a description or notes here"
              stylesFieldset={{ gridColumn: 'span 2' }}
              {...register('notes')}
            />
          </section>
          <section>
            <h3 className="text-gray-950 font-bold inline-block w-full">
              Recipients
            </h3>
            <ul className="flex flex-col gap-2 max-h-60 overflow-y-auto">
              {recipients?.map((recipient, index) => (
                <li
                  key={index}
                  className="grid grid-cols-6 gap-2 border-b border-gray-300 p-2"
                >
                  <Avatar
                    name={recipient.user?.name || 'Sherpa User'}
                    size="xs"
                  />
                  <span className="col-span-3">
                    {recipient.user?.name || 'Sherpa User'}
                  </span>
                  <WorkItemStatusBadge status={recipient.status || 0} />
                  <button
                    type="button"
                    className="justify-self-end"
                    onClick={() =>
                      handleDeleteRecipient(
                        recipient.user?.id || recipient.userId || ''
                      )
                    }
                  >
                    <IconDots stroke={2} className="text-gray-950" />
                  </button>
                </li>
              ))}
            </ul>
            <UserListDropdownInput
              error={errors.recipients?.message}
              addUser={handleAddRecipient}
            />
          </section>
          <section className="flex flex-row flex-wrap gap-x-4">
            <h3 className="text-gray-950 font-bold inline-block w-full mb-2">
              Tags
            </h3>
            <IconTag stroke={2} className="text-orange-600" />
            <WorkItemsTagsList workItemTags={tags || []} />
          </section>
          <section>
            <h3 className="text-gray-950 font-bold inline-block w-full">
              Attachment files
            </h3>
          </section>
          <button
            className="w-full text-white bg-blue-550 rounded inline-block p-2 ring-0 outline-none hover:bg-blue-650 delay-0 duration-150 transition-colors ease-in-out focus:bg-blue-650 active:bg-blue-650"
            type="submit"
          >
            {isEditing ? 'Save' : 'Create'}
          </button>
        </form>
      </section>
    </Modal>
  )
}
