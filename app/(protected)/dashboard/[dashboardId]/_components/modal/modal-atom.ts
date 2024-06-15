import { atom } from 'recoil'
import { RecoilState } from 'recoil'

export const createColumnState = atom<boolean>({
  key: `createColumnState`,
  default: false,
})

export const createTaskState = atom<boolean>({
  key: 'createTaskState',
  default: false,
})

export const updateColumnsForColumnId = (columnId: number) =>
  atom<boolean>({
    key: `updateColumnsForColumnId_${columnId}`,
    default: false,
  })

export const deleteColumnsForColumnId = (columnId: number) =>
  atom<boolean>({
    key: `deleteColumnsForColumnId_${columnId}`,
    default: false,
  })

const deleteTodoCache = new Map()

export const deleteTodoAboutCardId = (cardId: number): RecoilState<boolean> => {
  if (!deleteTodoCache.has(cardId)) {
    const deleteTodo = atom<boolean>({
      key: `deleteTodo${cardId}`,
      default: false,
    })
    deleteTodoCache.set(cardId, deleteTodo)
  }

  return deleteTodoCache.get(cardId)
}

const detailTodoCache = new Map()

export const detailTodoAboutCardId = (cardId: number): RecoilState<boolean> => {
  if (!detailTodoCache.has(cardId)) {
    const detailTodo = atom<boolean>({
      key: `detailTodo${cardId}`,
      default: false,
    })
    detailTodoCache.set(cardId, detailTodo)
  }

  return detailTodoCache.get(cardId)
}

export const openPopOverState = atom<boolean>({
  key: `openPopOverState`,
  default: false,
})

const updateTodoCache = new Map()

export const updateTodoAboutCardId = (cardId: number): RecoilState<boolean> => {
  if (!updateTodoCache.has(cardId)) {
    const updateTodo = atom<boolean>({
      key: `updateTodo${cardId}`,
      default: false,
    })
    updateTodoCache.set(cardId, updateTodo)
  }

  return updateTodoCache.get(cardId)
}
