export type TypeNumber = {
  [key: number]: string
}

export type TypeString = {
  [key: string]: string
}
export interface memberType {
  id: number
  userId: number
  email: string
  nickname: string
  profileImageUrl: string
  createdAt: Date
  updatedAt: Date
  isOwner: boolean
}

export interface Invitations {
  id: number
  inviter: {
    id: number
    email: string
    nickname: string
  }
  teamId: string
  dashboard: {
    id: number
    title: string
  }
  invitee: {
    id: number
    email: string
    nickname: string
  }
  inviteAccepted: boolean
  createdAt: Date
  updatedAt: Date
}
export interface Column {
  id: number
  title: string
  teamId: string
  dashboardId: number
  createdAt: Date
  updatedAt: Date
}

export type CardType = {
  cursorId: 0
  totalCount: 0
  cards: {
    id: number
    title: string
    description: string
    tags: string[]
    dueDate: string
    assignee: {
      profileImageUrl: string
      nickname: string
      id: number
    }
    imageUrl: string
    teamId: string
    columnId: number
    createdAt: Date
    updatedAt: Date
  }[]
}

export type CardInfo = {
  id: number
  title: string
  description: string
  tags: string[]
  dueDate: string
  assignee: {
    profileImageUrl: string
    nickname: string
    id: number
  }
  imageUrl: string
  teamId: string
  columnId: number
  createdAt: Date
  updatedAt: Date
}

export interface FolderName {
  id: number
  title: string
  color: string
  createdAt: Date
  updatedAt: Date
  userId: number
  createdByMe: boolean
}
