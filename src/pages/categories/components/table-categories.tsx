import { DeleteButton } from '../../../components/common/buttons/delete-button'
import { EditButton } from '../../../components/common/buttons/edit-button'
import { TableBody } from '../../../components/common/table/table-body'
import { TableBodyCell } from '../../../components/common/table/table-body-cell'
import { TableHeader } from '../../../components/common/table/table-header'
import { TableHeaderCell } from '../../../components/common/table/table-header-cell'
import { TableHeaderSortCell } from '../../../components/common/table/table-header-sort-cell'
import { TableRow } from '../../../components/common/table/table-row'
import { WorkItemCategory } from '../interfaces/work-item-category'

interface TableCategoriesProps {
  categories: WorkItemCategory[]
  handleSortColumn: (key: keyof WorkItemCategory) => void
  handleSelectCategory: (id: number) => void
  handleDeleteCategory: (id: number) => void
}
export const TableCategories = ({
  categories,
  handleSortColumn,
  handleSelectCategory,
  handleDeleteCategory,
}: TableCategoriesProps) => {
  return (
    <table className="w-full text-left">
      <TableHeader>
        <tr>
          <TableHeaderSortCell
            colSpan={2}
            onClick={() => handleSortColumn('name')}
          >
            Name
          </TableHeaderSortCell>
          <TableHeaderSortCell
            colSpan={2}
            onClick={() => handleSortColumn('processId')}
          >
            Process
          </TableHeaderSortCell>
          <TableHeaderCell>Actions</TableHeaderCell>
        </tr>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableBodyCell colSpan={2}>{category.name}</TableBodyCell>
            <TableBodyCell colSpan={2}>{category.process?.name}</TableBodyCell>
            <TableBodyCell>
              <div role="group" className="flex flex-row gap-4 items-center">
                <EditButton onClick={() => handleSelectCategory(category.id)}>
                  Edit
                </EditButton>
                <DeleteButton onClick={() => handleDeleteCategory(category.id)}>
                  Delete
                </DeleteButton>
              </div>
            </TableBodyCell>
          </TableRow>
        ))}
      </TableBody>
    </table>
  )
}
