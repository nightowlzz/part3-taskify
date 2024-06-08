export interface IColumnDashboardId {
  columnId: number
  dashboardId: number
}

export interface IColumnList {
  id: number
  title: string
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

export interface ITaskCreateOpen extends IColumnDashboardId {
  setOpen: (open: boolean) => void
}

// 추 후 삭제예정[타입]
export interface IColumnEditButton extends IColumnDashboardId {
  title: string
}

// user
export interface IAssignDetail {
  id: number | null
  nickname: string | null
  profileImageUrl: string | null
}

// 할 일 type
export interface ITaskDetail {
  id: number
  title: string
  description: string
  tags?: []
  dueDate?: string
  assignee?: IAssignDetail | null
  imageUrl?: string
  dashboardId: number
  columnId: number
}

export interface ITaskDetails {
  cards: ITaskDetail[]
  totalCount: number
  cursorId: null
}

// 수정중
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
