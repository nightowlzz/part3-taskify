import { atom, RecoilState } from 'recoil'
import { Column, CardInfo } from '@/lib/type'

export const dashboardIdState = atom<string>({
  key: 'dashboardIdState',
  default: '',
})

export const columnState = atom<Column[]>({
  key: `columnState`,
  default: [],
})

const atomCache = new Map()

export const cardListStateAboutColumn = (columnId: number) => {
  if (!atomCache.has(columnId)) {
    const cardListState = atom<CardInfo[]>({
      key: `cardState${columnId}`,
      default: [],
    })
    atomCache.set(columnId, cardListState)
  }

  return atomCache.get(columnId)
}

const atomCardCount = new Map()

export const countAboutCardList = (columnId: number) => {
  if (!atomCardCount.has(columnId)) {
    const countState = atom<number | null>({
      key: `countState${columnId}`,
      default: null,
    })
    atomCardCount.set(columnId, countState)
  }

  return atomCardCount.get(columnId)
}

const createTodoCache = new Map()
export const createTodoAboutColumnId = (
  ColumnId: number,
): RecoilState<boolean> => {
  if (!createTodoCache.has(ColumnId)) {
    const createTodo = atom<boolean>({
      key: `createTodo${ColumnId}`,
      default: false,
    })
    createTodoCache.set(ColumnId, createTodo)
  }

  return createTodoCache.get(ColumnId)
}
