export enum ProcessUserStatus {
  NotStarted = 0,
  InProgress = 1,
  Completed = 2,
  Abandoned = 3,
}

export const getProcessUserStatus = (status: ProcessUserStatus) => {
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
      return 'Not started'
  }
}

export const getProcessUserStatusString = (status: ProcessUserStatus) => {
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

export const getProcessStateColor = (status: ProcessUserStatus) => {
  switch (status) {
    case 0:
      return '#C3BE42'
    case 1:
      return '#0487FA'
    case 2:
      return '#22B770'
    case 3:
      return '#7A7E8D'
    default:
      return '#C3BE42'
  }
}

export const getProcessStateColorString = (
  status: 'NotStarted' | 'InProgress' | 'Completed' | 'Abandoned'
) => {
  switch (status) {
    case 'NotStarted':
      return '#C3BE42'
    case 'InProgress':
      return '#0487FA'
    case 'Completed':
      return '#22B770'
    case 'Abandoned':
      return '#7A7E8D'
    default:
      return '#C3BE42'
  }
}
