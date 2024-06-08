export interface columnDashboardId {
  columnId: number
  dashboardId: number
}

export interface columnData {
  title: string
}

export interface columnEdit extends columnDashboardId {
  initialValues: string
}

export interface columnEditProps extends columnDashboardId {
  initialValues: string
  setOpen: (open: boolean) => void
  setStep: (step: number) => void
}
