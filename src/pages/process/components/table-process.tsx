import { DeleteButton } from '../../../components/common/buttons/delete-button'
import { EditButton } from '../../../components/common/buttons/edit-button'
import { TableBody } from '../../../components/common/table/table-body'
import { TableBodyCell } from '../../../components/common/table/table-body-cell'
import { TableHeader } from '../../../components/common/table/table-header'
import { TableHeaderCell } from '../../../components/common/table/table-header-cell'
import { TableHeaderSortCell } from '../../../components/common/table/table-header-sort-cell'
import { TableRow } from '../../../components/common/table/table-row'
import { Process } from '../interfaces/process'

interface TableProcessProps {
  processes: Process[]
  handleSelectProcess: (id: number) => void
  handleSortColumn: (key: keyof Process) => void
  handleDeleteProcess: (id: number) => void
}
export const TableProcess = ({
  processes,
  handleSelectProcess,
  handleSortColumn,
  handleDeleteProcess,
}: TableProcessProps) => {
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
          <TableHeaderSortCell onClick={() => handleSortColumn('createdOn')}>
            Created On
          </TableHeaderSortCell>
          <TableHeaderSortCell onClick={() => handleSortColumn('createdBy')}>
            Created By
          </TableHeaderSortCell>
          <TableHeaderCell>Actions</TableHeaderCell>
        </tr>
      </TableHeader>
      <TableBody>
        {processes.map((process) => (
          <TableRow key={process.id}>
            <TableBodyCell>{process.name}</TableBodyCell>
            <TableBodyCell colSpan={2}>{process.description}</TableBodyCell>
            <TableBodyCell>{process.createdOn}</TableBodyCell>
            <TableBodyCell>{process.creator?.name ?? 'N/D'}</TableBodyCell>
            <TableBodyCell>
              <div role="group" className="flex flex-row gap-4 items-center">
                <EditButton onClick={() => handleSelectProcess(process.id)}>
                  Edit
                </EditButton>
                <DeleteButton onClick={() => handleDeleteProcess(process.id)}>
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
