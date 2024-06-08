import { ColumnCreactButton } from '@/components/modal/components/column-create-button'
import { ColumnEditButton } from '@/components/modal/components/column-edit-button'
import { TaskCreactButton } from '@/components/modal/components/task-create-button'
import { TaskEditButton } from '@/components/modal/components/task-edit-button'
import { api } from '@/lib/utils'

export const getDashboardId = async (id: number) => {
  const res = await api.get(`/columns?dashboardId=${id}`)
  const { data } = await res.data
  return data
}
// 추 후 삭제예정[파일]
export default async function Page({ params }: { params: { id: number } }) {
  const data = await getDashboardId(params.id)

  return (
    <div className='mx-auto flex max-w-[1000px] flex-col p-[30px]'>
      <h1 className='py-[30px]'>test 페이지</h1>
      <hr />
      <br />
      <h2 className='text-xl'>컬럼</h2>
      <br />
      <div>생성</div>
      <ColumnCreactButton dashboardId={params.id} />
      <br />
      <div>수정</div>
      <ul className='flex gap-2'>
        {data
          ? data.map((data: any) => (
              <li key={data.id}>
                <ColumnEditButton
                  initialValues={data.title}
                  columnId={Number(data.id)}
                  dashboardId={Number(params.id)}
                />
                <TaskCreactButton dashboardId={params.id} columnId={data.id} />
                <TaskEditButton dashboardId={params.id} columnId={data.id} />
              </li>
            ))
          : null}
      </ul>
    </div>
  )
}
