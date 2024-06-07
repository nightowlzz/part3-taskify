export interface User {
  id: number
  email: string
  nickname: string
  profileImageUrl?: string
  createdAt: string
  updatedAt: string
}

export interface Dashboard {
  id: number
  title: string
  color: string
  createdAt: Date
  updatedAt: Date
  createdByMe: boolean
  userId: number
}

export interface DashboardResponse {
  cursorId: number
  totalCount: number
  dashboards: Dashboard[]
}

export interface DashboardId {
  id: number
  title: string
  color: string
  createdAt: Date
  updatedAt: Date
  createdByMe: boolean
  userId: number
}

export interface InvitationResponse {
  totalCount: number
  invitations: Invitation[]
}

export interface InvitationResponse2 {
  cursorId: number
  invitations: Invitation[]
}

export interface Invitation {
  id: number
  inviter: {
    nickname: string
    email: string
    id: number
  }
  teamId: string
  dashboard: {
    title: string
    id: number
  }
  invitee: {
    nickname: string
    email: string
    id: number
  }
  inviteAccepted: boolean
  createdAt: Date
  updatedAt: Date
}

export type Member = {
  id: number
  userId: number
  email: string
  nickname: string
  profileImageUrl: string
  createdAt: string
  updatedAt: string
  isOwner: boolean
}

export type MembersResponse = {
  members: Member[]
  totalCount: number
}

export type Column = {
  id: number
  title: string
  teamId: string
  createdAt: string
  updatedAt: string
}

export type ColumnResponse = {
  result: string
  data: Column[]
}

export type Card = {
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
  createdAt: string
  updatedAt: string
}

export type CardsResponse = {
  cursorId: number
  totalCount: number
  cards: Card[]
}

interface Assignee {
  profileImageUrl: string
  nickname: string
  id: number
}

export interface CardIdModel {
  id: number
  title: string
  description: string
  tags: string[]
  dueDate?: string
  assignee: Assignee
  imageUrl?: string
  teamId: string
  columnId: number
  createdAt: string
  updatedAt: string
}

interface Author {
  profileImageUrl: string
  nickname: string
  id: number
}

export interface Comment {
  id: number
  content: string
  createdAt: string
  updatedAt: string
  cardId: number
  author: Author
}

export interface CommentsByCardIdResponse {
  cursorId: number
  comments: Comment[]
}
