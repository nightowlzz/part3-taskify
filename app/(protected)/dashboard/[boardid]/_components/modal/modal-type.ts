export interface IColumnDashboardId {
  columnId: number
  dashboardId: number
}

export interface IColumnCreate {
  title: string
  dashboardId: number
}

export interface IColumnEditOpen extends IColumnDashboardId {
  title: string
  setOpen: (open: boolean) => void
  setStep: (step: number) => void
}

export interface ITaskCreateOpen extends IColumnDashboardId {}
