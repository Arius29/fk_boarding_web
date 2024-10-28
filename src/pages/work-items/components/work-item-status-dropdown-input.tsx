import { Control, Controller } from 'react-hook-form'
import {
  getWorkItemStatus,
  getWorkItemStatusString,
  WorkItemStatus,
} from '../interfaces/work-item-status'
import { DropDownMenu } from '../../../components/common/core/drop-down-menu'
import { DropDownStatusItem } from '../../../components/common/core/drop-down-status-item'
import { WorkItem } from '../interfaces/work-item'

const validations = {
  status: {
    required: { value: true, message: 'The status is required.' },
    min: {
      value: 0,
      message: 'The status is required.',
    },
  },
}

interface WorkItemStatusDropdownInputProps {
  control: Control<WorkItem>
  label?: string
  error?: string
  value?: WorkItemStatus
}

const getClassName = (status: WorkItemStatus) => {
  const colorClass = {
    'NotStarted-bg':
      'bg-not-started text-white hover:bg-opacity-90 active:bg-opacity-90 focus:bg-opacity-90',
    'InProgress-bg':
      'bg-in-progress text-white hover:bg-opacity-90 active:bg-opacity-90 focus:bg-opacity-90',
    'Completed-bg':
      'bg-completed text-white hover:bg-opacity-90 active:bg-opacity-90 focus:bg-opacity-90',
    'Abandoned-bg':
      'bg-abandoned text-white hover:bg-opacity-90 active:bg-opacity-90 focus:bg-opacity-90',
  }

  return colorClass[`${getWorkItemStatusString(status)}-bg`]
}

export const WorkItemStatusDropdownInput = ({
  control,
  label,
  error,
  value,
}: WorkItemStatusDropdownInputProps) => {
  return (
    <Controller
      control={control}
      name="status"
      rules={validations.status}
      render={({ field }) => (
        <DropDownMenu
          label={label}
          id="status"
          value={getWorkItemStatus(value ?? WorkItemStatus.NotStarted)}
          className={`flex flex-row items-center w-32 gap-3 relative outline-none ring-0 p-2 rounded ${getClassName(
            field.value ?? WorkItemStatus.NotStarted
          )}`}
          error={error}
          includeIcon={false}
        >
          {({ showModal, handleSelectValue }) =>
            showModal ? (
              <>
                <ul className="absolute z-10 bg-white w-full top-full">
                  {Object.keys(WorkItemStatus)
                    .filter((key) => isNaN(Number(key)))
                    .map((status) => (
                      <DropDownStatusItem
                        onClick={() => {
                          field.onChange(
                            WorkItemStatus[
                              status as keyof typeof WorkItemStatus
                            ]
                          )
                          handleSelectValue(
                            getWorkItemStatus(
                              WorkItemStatus[
                                status as keyof typeof WorkItemStatus
                              ]
                            )
                          )
                        }}
                        key={status}
                        type={
                          field.value ===
                          WorkItemStatus[status as keyof typeof WorkItemStatus]
                            ? 'not-filled-active'
                            : 'not-filled'
                        }
                        status={status as keyof typeof WorkItemStatus}
                      >
                        {getWorkItemStatus(
                          WorkItemStatus[status as keyof typeof WorkItemStatus]
                        )}
                      </DropDownStatusItem>
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
