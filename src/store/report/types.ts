export interface IReport {
  _id: string
  startTime: string
  endTime: string
  tests: any[]
}
export interface IReportState {
  reports?: IReport[]
  selectedReport?: IReport
}
