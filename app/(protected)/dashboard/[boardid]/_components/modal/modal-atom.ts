import { atom } from 'recoil'

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
