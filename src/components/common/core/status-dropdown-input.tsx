import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import {
  getProcessUserStatus,
  ProcessUserStatus,
} from '../../../pages/sherpas-process/interfaces/process-user-status'
import { DropDownMenu } from './drop-down-menu'
import { DropDownStatusItem } from './drop-down-status-item'

const validations = {
  status: {
    required: { value: true, message: 'The status is required.' },
    min: {
      value: 1,
      message: 'The status is required.',
    },
  },
}

interface StatusDropdownInputProps<T extends FieldValues> {
  inputName: Path<T>
  control: Control<T>
  error?: string
  value?: ProcessUserStatus
}

export const StatusDropdownInput = <T extends FieldValues>({
  inputName,
  value,
  control,
  error,
}: StatusDropdownInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={inputName}
      rules={validations.status}
      render={({ field }) => (
        <DropDownMenu
          label="Status"
          id="status"
          value={getProcessUserStatus(value ?? ProcessUserStatus.NotStarted)}
          error={error}
        >
          {({ showModal, handleSelectValue }) =>
            showModal ? (
              <>
                <ul className="absolute z-10 bg-white w-full top-full">
                  {Object.keys(ProcessUserStatus)
                    .filter((key) => isNaN(Number(key)))
                    .map((status) => (
                      <DropDownStatusItem
                        onClick={() => {
                          field.onChange(
                            ProcessUserStatus[
                              status as keyof typeof ProcessUserStatus
                            ]
                          )
                          handleSelectValue(
                            getProcessUserStatus(
                              ProcessUserStatus[
                                status as keyof typeof ProcessUserStatus
                              ]
                            )
                          )
                        }}
                        key={status}
                        type={
                          field.value ===
                          ProcessUserStatus[
                            status as keyof typeof ProcessUserStatus
                          ]
                            ? 'not-filled-active'
                            : 'not-filled'
                        }
                        status={status as keyof typeof ProcessUserStatus}
                      >
                        {getProcessUserStatus(
                          ProcessUserStatus[
                            status as keyof typeof ProcessUserStatus
                          ]
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
