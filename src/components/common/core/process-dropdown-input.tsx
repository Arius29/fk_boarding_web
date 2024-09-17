import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { DropDownMenu } from './drop-down-menu'
import { DropDownMenuItem } from './drop-dowm-menu-item'
import { Process } from '../../../pages/process/interfaces/process'
interface ProcessDropdownInputProps<T extends FieldValues> {
  inputName: Path<T>
  processes: Process[]
  control: Control<T>
  error?: string
  value?: string
}

const validations = {
  processId: {
    required: { value: true, message: 'The process is required.' },
    min: {
      value: 1,
      message: 'The process is required.',
    },
  },
}
export const ProcessDropdownInput = <T extends FieldValues>({
  inputName,
  processes,
  error,
  value,
  control,
}: ProcessDropdownInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={inputName}
      rules={validations.processId}
      render={({ field }) => (
        <DropDownMenu
          label="Process"
          id={inputName}
          value={value || 'Select process'}
          error={error}
        >
          {({ showModal, handleSelectValue }) =>
            showModal ? (
              <>
                <ul className="absolute z-10 bg-white w-full top-full">
                  {processes.map((process) => (
                    <DropDownMenuItem
                      onClick={() => {
                        field.onChange(process.id)
                        handleSelectValue(process.name)
                      }}
                      key={process.id}
                    >
                      {process.name}
                    </DropDownMenuItem>
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
