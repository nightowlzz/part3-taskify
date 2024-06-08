'use client'
import { api } from '@/lib/utils'
import { AlertDialogContent } from '../ui/alert-dialog'
import { ColumnForm } from './components/column-form'
import { ModalHead } from './components/modal-head'
import { Column } from '@/lib/type'
import { columnEditProps } from '@/app/(protected)/dashboard/[boardid]/_components/modal/modal-type'

type ColumnEditPick = Pick<columnEditProps, 'dashboardId' | 'setOpen'>

const ColumnCreate = ({ dashboardId, setOpen }: ColumnEditPick) => {
  // 컬럼 추가 API 호출 함수
  const handleAddColumn = async ({ title }: { title: string }) => {
    await api.post('/columns', {
      title: title,
      dashboardId: Number(dashboardId),
    })
  }
  return (
    <AlertDialogContent>
      <div className='px-5 py-7 md:py-8'>
        <ModalHead>컬럼 추가</ModalHead>
        <ColumnForm
          initialValues={{ title: '' }}
          dashboardId={dashboardId}
          setOpen={setOpen}
          onSubmit={handleAddColumn}
        />
      </div>
    </AlertDialogContent>
  )
}
export default ColumnCreate
