import { Badge } from '../../../components/common/badge'
import { WorkItemTag } from '../../tags/interfaces/wok-item-tag'

interface WorkItemsTagsListProps extends React.HTMLAttributes<HTMLLIElement> {
  handleClick?: (workItemId: number, tagId: number) => void
  workItemTags: WorkItemTag[]
}

export const WorkItemsTagsList = ({
  workItemTags,
  handleClick,
  ...props
}: WorkItemsTagsListProps) => {
  return (
    <ul className="flex flex-nowrap overflow-x-auto gap-2 items-center">
      {workItemTags?.map((workItemTag, index) => (
        <li
          key={index}
          {...props}
          onClick={() =>
            handleClick?.(workItemTag.workItemId, workItemTag.tagId)
          }
        >
          <Badge color={workItemTag.tag?.hexColor} type="small">
            {workItemTag.tag?.name}
          </Badge>
        </li>
      ))}
    </ul>
  )
}
