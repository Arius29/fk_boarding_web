import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { useWorkItemCategoriesApiQuery } from '../../../hooks/use-work-item-categories-api-query'
import { DropDownMenu } from './drop-down-menu'
import { DropDownMenuItem } from './drop-dowm-menu-item'

const validations = {
  categoryId: {
    required: { value: true, message: 'The category is required.' },
    min: {
      value: 1,
      message: 'The category is required.',
    },
  },
}

interface CategoryDropDownInputProps<T extends FieldValues> {
  processId?: number
  inputName: Path<T>
  control: Control<T>
  error?: string
  value?: string
  disabled?: boolean
}

export const CategoryDropDownInput = <T extends FieldValues>({
  processId,
  inputName,
  value,
  control,
  error,
  disabled,
}: CategoryDropDownInputProps<T>) => {
  const { categories } = useWorkItemCategoriesApiQuery({
    processes: [],
    processId: processId,
  })
  return (
    <Controller
      control={control}
      name={inputName}
      rules={validations.categoryId}
      render={({ field }) => (
        <DropDownMenu
          label="Category"
          id={inputName}
          value={value || 'Select category'}
          error={error}
          disabled={disabled}
        >
          {({ showModal, handleSelectValue }) =>
            showModal ? (
              <>
                <ul className="absolute z-10 bg-white w-full top-full rounded">
                  {categories.map((category) => (
                    <DropDownMenuItem
                      onClick={() => {
                        if (!disabled) {
                          field.onChange(category.id)
                          handleSelectValue(category.name)
                        }
                      }}
                      key={category.id}
                      type={field.value === category.id ? 'active' : 'base'}
                    >
                      {category.name}
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
