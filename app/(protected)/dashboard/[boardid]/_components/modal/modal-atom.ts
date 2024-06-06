import { atom } from 'recoil'

export const createColumnState = atom<boolean>({
  key: `createColumnState`,
  default: false,
})

export const createTaskState = atom<boolean>({
  key: 'createTaskState',
  default: false,
})
