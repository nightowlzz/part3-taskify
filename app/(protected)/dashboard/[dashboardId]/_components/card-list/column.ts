import { atom, RecoilState } from 'recoil'

const updateColumnCache = new Map()
export const updateColumnsForColumnId = (
  columnId: number,
): RecoilState<boolean> => {
  if (!updateColumnCache.has(columnId)) {
    const updateColumns = atom<boolean>({
      key: `updateColumns${columnId}`,
      default: false,
    })
    updateColumnCache.set(columnId, updateColumns)
  }

  return updateColumnCache.get(columnId)
}

const deleteColumnCache = new Map()
export const deleteColumnsForColumnId = (
  columnId: number,
): RecoilState<boolean> => {
  if (!deleteColumnCache.has(columnId)) {
    const deleteColumns = atom<boolean>({
      key: `deleteColumns${columnId}`,
      default: false,
    })
    deleteColumnCache.set(columnId, deleteColumns)
  }

  return deleteColumnCache.get(columnId)
}
