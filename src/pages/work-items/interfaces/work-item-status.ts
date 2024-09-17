export enum WorkItemStatus {
  NotStarted = 0,
  InProgress = 1,
  Completed = 2,
  Abandoned = 3,
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
