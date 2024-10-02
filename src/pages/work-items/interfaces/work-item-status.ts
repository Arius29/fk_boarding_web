export enum WorkItemStatus {
  NotStarted = 0,
  InProgress = 1,
  Completed = 2,
  Abandoned = 3,
}

const color = {
  NotStarted: 'text-not-started',
  InProgress: 'text-in-progress',
  Completed: 'text-completed',
  Abandoned: 'text-abandoned',
}

export const getStatusColor = (status: WorkItemStatus) => {
  return color[getWorkItemStatusString(status)]
}

export const getWorkItemStatus = (status: WorkItemStatus) => {
  switch (status) {
    case 0:
      return 'Not started'
    case 1:
      return 'In progress'
    case 2:
      return 'Completed'
    case 3:
      return 'Abandoned'
    default:
      return 'NotStarted'
  }
}

export const getWorkItemStatusString = (status: WorkItemStatus) => {
  switch (status) {
    case 0:
      return 'NotStarted'
    case 1:
      return 'InProgress'
    case 2:
      return 'Completed'
    case 3:
      return 'Abandoned'
    default:
      return 'NotStarted'
  }
}
