export interface EditProcessUser {
  processId: number
  userId: string
  status: number
  startedOn?: Date
  finishedOn?: Date
  startedBy?: string
  finishedBy?: string
}
