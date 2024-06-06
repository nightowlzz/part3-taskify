import TaskCard from '@/components/modal/task-card'
import TaskCardCreate from '@/components/modal/task-create'
import { TaskCardEdit } from '@/components/modal/task-edit'

import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'

const StyleGuide = () => {
  return (
    <div className='mx-auto flex max-w-[600px] flex-col p-[30px]'>
      <h2 className='py-[30px]'>모달</h2>
      <div className='flex flex-wrap gap-5' style={{ display: 'none' }}>
        {/* 할 일 카드 */}
        <AlertDialog>
          <AlertDialogTrigger className='bg-violet_light p-3'>
            할 일 카드
          </AlertDialogTrigger>
          <TaskCard />
        </AlertDialog>

        {/* 할 일 카드 생성 */}
        <AlertDialog>
          <AlertDialogTrigger className='bg-violet_light p-3'>
            할 일 카드 생성
          </AlertDialogTrigger>
          <TaskCardCreate />
        </AlertDialog>

        {/* 할 일 카드 수정 */}
        <AlertDialog>
          <AlertDialogTrigger className='bg-violet_light p-3'>
            할 일 카드 수정
          </AlertDialogTrigger>
          <TaskCardEdit />
        </AlertDialog>
      </div>
      <div></div>
    </div>
  )
}

export default StyleGuide
