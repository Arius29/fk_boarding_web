import { TableBody } from '../../../components/common/table/table-body'
import { TableBodyCell } from '../../../components/common/table/table-body-cell'
import { TableHeader } from '../../../components/common/table/table-header'
import { TableHeaderSortCell } from '../../../components/common/table/table-header-sort-cell'
import { TableRow } from '../../../components/common/table/table-row'
import { WorkItem } from '../interfaces/work-item'
import { WorkItemRecipient } from '../interfaces/work-item-recipient'
import { getWorkItemStatus } from '../interfaces/work-item-status'

interface TableWorkItemRecipientsProps {
  workItems: WorkItem[]
  handleSortColumn: (key: keyof WorkItemRecipient) => void
}

export const TableWorkItemRecipients = ({
  workItems,
  handleSortColumn,
}: TableWorkItemRecipientsProps) => {
  return (
    <table className="w-full text-left">
      <TableHeader>
        <tr>
          <TableHeaderSortCell onClick={() => handleSortColumn('workItemId')}>
            Id
          </TableHeaderSortCell>
          <TableHeaderSortCell
            colSpan={2}
            onClick={() => handleSortColumn('workItemId')}
          >
            Name
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
          <TableHeaderSortCell onClick={() => handleSortColumn('userId')}>
            Recipient
          </TableHeaderSortCell>
        </tr>
      </TableHeader>
      <TableBody>
        {workItems.map((workItem) =>
          workItem.recipients?.map((recipient, index) => (
            <TableRow key={index}>
              <TableBodyCell>{recipient.workItemId}</TableBodyCell>
              <TableBodyCell colSpan={2}>{workItem.name}</TableBodyCell>
              <TableBodyCell>
                {getWorkItemStatus(recipient.status ?? 0)}
              </TableBodyCell>
              <TableBodyCell>
                {recipient.startedOn &&
                  new Date(recipient.startedOn).toLocaleDateString()}
              </TableBodyCell>
              <TableBodyCell>{recipient.starter?.name ?? 'N/D'}</TableBodyCell>
              <TableBodyCell>
                {recipient.finishedOn &&
                  new Date(recipient.finishedOn).toLocaleDateString()}
              </TableBodyCell>
              <TableBodyCell>{recipient.finisher?.name ?? 'N/D'}</TableBodyCell>
              <TableBodyCell>{recipient.user?.name ?? 'N/D'}</TableBodyCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </table>
  )
}
