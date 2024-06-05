import { ColumnAdd } from '@/components/modal/column-add'
import { ColumnEdit } from '@/components/modal/column-edit'
import { ConfirmAlert } from '@/components/modal/confirm-alert'
import TaskCard from '@/components/modal/task-card'
import TaskCardCreate from '@/components/modal/task-create'
import { TaskCardEdit } from '@/components/modal/task-edit'
import TestFile from '@/components/modal/test-file'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

const StyleGuide = () => {
  return (
    <div className='mx-auto flex max-w-[600px] flex-col p-[30px]'>
      <h2 className='py-[30px]' style={{ display: 'none' }}>
        모달
      </h2>
      <div className='flex flex-wrap gap-5' style={{ display: 'block' }}>
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

        {/* 컬럼 추가 */}
        <AlertDialog>
          <AlertDialogTrigger className='bg-violet_light p-3'>
            컬럼 추가
          </AlertDialogTrigger>
          <ColumnAdd />
        </AlertDialog>

        {/* 컬럼 수정 */}
        <AlertDialog>
          <AlertDialogTrigger className='bg-violet_light p-3'>
            컬럼 수정
          </AlertDialogTrigger>
          <ColumnEdit />
        </AlertDialog>

        {/* 확인 팝업 */}
        <AlertDialog>
          <AlertDialogTrigger className='bg-violet_light p-3'>
            확인 팝업
          </AlertDialogTrigger>
          <ConfirmAlert>컬럼의 모든 카드가 삭제됩니다.</ConfirmAlert>
        </AlertDialog>
      </div>
      <TestFile />
    </div>
  )
}

export default StyleGuide
