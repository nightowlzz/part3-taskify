import { api } from '@/lib/utils'

export async function deleteMember(memberId: number) {
  const url = `/members${memberId}`
  try {
    await api.delete(url)
  } catch (error) {
    throw new Error(`Failed to delete invitation: ${error}`)
  }
}
