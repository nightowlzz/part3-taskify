import { atom } from 'recoil'

export const createColumnState = atom<boolean>({
  key: `createColumnState`,
  default: false,
})
