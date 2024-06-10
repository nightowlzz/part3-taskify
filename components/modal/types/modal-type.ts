// 컬럼
export interface columnDashboardId {
  columnId: number
  dashboardId: number
}

export interface columnForm {
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

// 유저
export interface member {
  id: number
  email: string
  nickname: string
  profileImageUrl: string
  userId: number
  createdAt: string
  updatedAt: string
}

export interface memberData {
  members: member[]
  totalCount: number
}
// 할 일
export interface taskForm {
  assigneeUserId?: number | null
  title: string
  description: string
  tags: string[]
  dueDate?: string | null
  imageUrl?: string | null
  dashboardId: number
  columnId: number
}
export interface assignee {
  profileImageUrl: string
  nickname: string
  id: number
}

export interface taskDetail {
  id: number
  title: string
  description: string
  tags?: []
  dueDate?: string
  assignee?: assignee | null
  imageUrl?: string
  dashboardId: number
  columnId: number
}

export interface taskDetailData {
  cards: taskDetail[]
  totalCount: number
  cursorId: null
}

// 댓글
export interface commentRelatedIDs {
  columnId: number
  dashboardId: number
  cardId: number
}

export interface commnetData extends commentRelatedIDs {
  content: string
  columnId: number
  dashboardId: number
  cardId: number
}

export interface commnet {
  id: number
  content: string
  createdAt: string
  updatedAt: string
  cardId: number
  author: {
    profileImageUrl: string
    nickname: string
    id: number
  }
}

export interface commnetApi {
  cursorId: number
  comments: commnet[]
}
