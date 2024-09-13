import { Badge } from '../../../components/common/badge'
import { DeleteButton } from '../../../components/common/buttons/delete-button'
import { EditButton } from '../../../components/common/buttons/edit-button'
import { TableBody } from '../../../components/common/table/table-body'
import { TableBodyCell } from '../../../components/common/table/table-body-cell'
import { TableHeader } from '../../../components/common/table/table-header'
import { TableHeaderCell } from '../../../components/common/table/table-header-cell'
import { TableHeaderSortCell } from '../../../components/common/table/table-header-sort-cell'
import { TableRow } from '../../../components/common/table/table-row'
import { Tag } from '../interfaces/tag'
import { ColorBadge } from './color-badge'

interface TableTagsProps {
  tags: Tag[]
  handleSelectTag: (id: number) => void
  handleSortColumn: (key: keyof Tag) => void
  handleDeleteTag: (id: number) => void
}
export const TableTags = ({
  tags,
  handleSelectTag,
  handleSortColumn,
  handleDeleteTag,
}: TableTagsProps) => {
  return (
    <table className="w-full text-left">
      <TableHeader>
        <tr>
          <TableHeaderSortCell onClick={() => handleSortColumn('name')}>
            Name
          </TableHeaderSortCell>
          <TableHeaderSortCell
            colSpan={2}
            onClick={() => handleSortColumn('description')}
          >
            Description
          </TableHeaderSortCell>
          <TableHeaderCell>Color</TableHeaderCell>
          <TableHeaderCell>Preview</TableHeaderCell>
          <TableHeaderCell>Actions</TableHeaderCell>
        </tr>
      </TableHeader>
      <TableBody>
        {tags.map((tag) => (
          <TableRow key={tag.id}>
            <TableBodyCell>{tag.name}</TableBodyCell>
            <TableBodyCell colSpan={2}>{tag.description}</TableBodyCell>
            <TableBodyCell>
              <ColorBadge color={tag.hexColor} />
            </TableBodyCell>
            <TableBodyCell>
              <Badge color={tag.hexColor}>{tag.name}</Badge>
            </TableBodyCell>
            <TableBodyCell>
              <div role="group" className="flex flex-row gap-4 items-center">
                <EditButton onClick={() => handleSelectTag(tag.id)}>
                  Edit
                </EditButton>
                <DeleteButton onClick={() => handleDeleteTag(tag.id)}>
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
