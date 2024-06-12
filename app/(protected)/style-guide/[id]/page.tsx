import { ColumnCreactButton } from '@/components/modal/components/column-create-button'
import { ColumnEditButton } from '@/components/modal/components/column-edit-button'
import { TaskCreactButton } from '@/components/modal/components/task-create-button'
import { TaskEditButton } from '@/components/modal/components/task-edit-button'
import TaskCard from '@/components/modal/task-card'
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
      <div>컴럼 생성 모달</div>
      {/* 컴럼 생성 모달 */}
      <ColumnCreactButton dashboardId={params.id} />
      <br />
      <div>카드 리스트</div>
      <ul className='flex gap-2'>
        {data
          ? data.map((data: any) => (
              <li key={data.id}>
                <div className='mt-4 border-t-4 pt-4'>[컬럼 수정 모달]</div>
                {/* 컴럼수정 모달 */}
                <ColumnEditButton
                  initialValues={data.title}
                  columnId={Number(data.id)}
                  dashboardId={Number(params.id)}
                />
                <div className='mt-4 border-t-4 pt-4'>[할 일 카드 생성]</div>
                <TaskCreactButton dashboardId={params.id} columnId={data.id} />
                <div className='mt-4 border-t-4 pt-4'>
                  [ 할일 카드 상세 모달]
                </div>
                {/*
                 [ 할일 카드 상세 모달] 
                  컬럼아이디. 컬럼의 타이틀 props로 전달

                  [client component 분리]
                  카드 수정, 삭제 기능 팝오버 => task-popoder.tsx
                  리뷰 => task-comment.tsx 
                */}
                <TaskCard columnId={data.id} columnTitle={data.title} />
              </li>
            ))
          : null}
      </ul>
    </div>
  )
}
