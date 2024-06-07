import { api } from '@/lib/utils'

async function getTaskList(id: number) {
  const { data } = await api.get(`/cards?columnId=${id}`)
  return data
}
// 추 후 삭제예정[파일]
export const TaskList = async ({ columnId }: { columnId: number }) => {
  const data = await getTaskList(columnId)
  return (
    <div>
      {data
        ? data.cards.map((value: any) => (
            <div key={value.id} className='my-2 bg-orange p-1'>
              {value.title}
            </div>
          ))
        : null}
    </div>
  )
}
