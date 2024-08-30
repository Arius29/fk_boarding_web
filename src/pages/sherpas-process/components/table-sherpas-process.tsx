import { TableBodyCell } from '../../../components/common/table/table-body-cell'
import { TableRow } from '../../../components/common/table/table-row'
import { TableHeaderSortCell } from '../../../components/common/table/table-header-sort-cell'
import { TableBody } from '../../../components/common/table/table-body'
import { TableHeader } from '../../../components/common/table/table-header'
import { TableHeaderCell } from '../../../components/common/table/table-header-cell'
import { EditButton } from '../../../components/common/buttons/edit-button'
import { DeleteButton } from '../../../components/common/buttons/delete-button'
import { ProcessUser } from '../interfaces/process-user'
import {
  getProcessStateColor,
  getProcessUserStatus,
} from '../interfaces/process-user-status'
import { Avatar } from '../../../components/common/layout/avatar'
import { IconCircleFilled } from '@tabler/icons-react'

interface TableSherpasProcessProps {
  processes: ProcessUser[]
  handleSortColumn: (key: keyof ProcessUser) => void
  handleSelectProcessUser: (processId: number, userId: string) => void
  handleDeleteProcessUser: (processId: number, userId: string) => void
}
export const TableSherpasProcess = ({
  processes,
  handleSortColumn,
  handleSelectProcessUser,
  handleDeleteProcessUser,
}: TableSherpasProcessProps) => {
  return (
    <table className="w-full text-left">
      <TableHeader>
        <tr>
          <TableHeaderSortCell onClick={() => handleSortColumn('userId')}>
            Employee
          </TableHeaderSortCell>
          <TableHeaderSortCell onClick={() => handleSortColumn('processId')}>
            Process
          </TableHeaderSortCell>
          <TableHeaderSortCell onClick={() => handleSortColumn('status')}>
            Status
          </TableHeaderSortCell>
          <TableHeaderSortCell onClick={() => handleSortColumn('startedOn')}>
            Started On
          </TableHeaderSortCell>
          <TableHeaderSortCell onClick={() => handleSortColumn('startedBy')}>
            Started By
          </TableHeaderSortCell>
          <TableHeaderSortCell onClick={() => handleSortColumn('finishedOn')}>
            Finished On
          </TableHeaderSortCell>
          <TableHeaderSortCell onClick={() => handleSortColumn('finishedBy')}>
            Finished By
          </TableHeaderSortCell>
          <TableHeaderCell>Actions</TableHeaderCell>
        </tr>
      </TableHeader>
      <TableBody>
        {processes.map((process, index) => (
          <TableRow key={index}>
            <TableBodyCell>
              <div className="grid grid-cols-8">
                {process.user?.avatar ? (
                  <img
                    src={process.user?.avatar}
                    alt={`Profile picture of ${process.user?.name}`}
                    className="w-9 h-9 rounded-full object-center row-span-2"
                  />
                ) : (
                  <Avatar
                    name={process.user?.name ?? ''}
                    size="sm"
                    style={{ gridRow: 'span 2 / span 2' }}
                  />
                )}

                <h2 className="ml-3 font-medium col-span-6">
                  {process.user?.name}
                </h2>
                <p className="ml-3 text-xs col-span-6 text-gray-500">
                  {process.user?.email}
                </p>
              </div>
            </TableBodyCell>
            <TableBodyCell>{process.process?.name}</TableBodyCell>
            <TableBodyCell>
              <span
                className="flex flex-row items-center gap-2"
                style={{ color: getProcessStateColor(process.status) }}
              >
                <IconCircleFilled className="w-5 h-5" />
                {getProcessUserStatus(process.status)}
              </span>
            </TableBodyCell>
            <TableBodyCell>
              {process.startedOn?.toLocaleDateString()}
            </TableBodyCell>
            <TableBodyCell>{process.starter?.name}</TableBodyCell>
            <TableBodyCell>
              {process.finishedOn?.toLocaleDateString()}
            </TableBodyCell>
            <TableBodyCell>{process.finisher?.name}</TableBodyCell>
            <TableBodyCell>
              <div role="group" className="flex flex-row gap-4 items-center">
                <EditButton
                  onClick={() =>
                    handleSelectProcessUser(process.processId, process.userId)
                  }
                >
                  Edit
                </EditButton>
                <DeleteButton
                  onClick={() =>
                    handleDeleteProcessUser(process.processId, process.userId)
                  }
                >
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
