import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { DropDownMenu } from '../../../components/common/core/drop-down-menu'
import { WorkItemPriority } from '../interfaces/work-item-priority'
import { WorkItemPriorityItem } from './work-item-priority-item'

interface WorkItemPriorityDropDownProps<T extends FieldValues> {
  inputName: Path<T>
  control: Control<T>
  error?: string
  value?: WorkItemPriority
}

const validations = {
  priority: {
    required: { value: true, message: 'The priority is required.' },
    min: {
      value: 1,
      message: 'The priority is required.',
    },
  },
}

export const WorkItemPriorityDropDown = <T extends FieldValues>({
  inputName,
  value = 0,
  control,
  error,
}: WorkItemPriorityDropDownProps<T>) => {
  return (
    <Controller
      control={control}
      name={inputName}
      rules={validations.priority}
      render={({ field }) => (
        <DropDownMenu
          label="Priority"
          id="priority"
          value={WorkItemPriority[value]}
          error={error}
        >
          {({ showModal, handleSelectValue }) =>
            showModal ? (
              <>
                <ul className="absolute z-10 bg-white w-full top-full">
                  {Object.keys(WorkItemPriority)
                    .filter((key) => isNaN(Number(key)))
                    .map((status) => (
                      <WorkItemPriorityItem
                        onClick={() => {
                          field.onChange(
                            WorkItemPriority[
                              status as keyof typeof WorkItemPriority
                            ]
                          )
                          handleSelectValue(status)
                        }}
                        key={status}
                        type={
                          field.value ===
                          WorkItemPriority[
                            status as keyof typeof WorkItemPriority
                          ]
                            ? 'not-filled-active'
                            : 'not-filled'
                        }
                        status={status as keyof typeof WorkItemPriority}
                      >
                        {status}
                      </WorkItemPriorityItem>
                    ))}
                </ul>
              </>
            ) : (
              <></>
            )
          }
        </DropDownMenu>
      )}
    />
  )
}
