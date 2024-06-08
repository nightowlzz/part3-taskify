'user client'
import { api } from '@/lib/utils'
import { AlertDialogContent } from '../ui/alert-dialog'
import { ColumnForm } from './components/column-form'
import { ModalHead } from './components/modal-head'
import { columnEditProps, columnForm } from './types/modal-type'

const ColumnEdit = ({
  columnId,
  dashboardId,
  initialValues,
  setOpen,
  setStep,
}: columnEditProps) => {
  // 컬럼 추가 API 호출 함수
  const handleEditColumn = async (data: columnForm) => {
    await api.put(`/columns/${columnId}`, {
      title: data.title.trim(),
      columnId: Number(columnId),
    })
  }
  return (
    <AlertDialogContent>
      <div className='px-5 py-7 md:py-8'>
        <ModalHead>컬럼 관리</ModalHead>
        <ColumnForm
          initialValues={{ title: initialValues }}
          dashboardId={dashboardId}
          columnId={columnId}
          setOpen={setOpen}
          onSubmit={handleEditColumn}
          setStep={setStep}
        />
      </div>
    </AlertDialogContent>
  )
}
export default ColumnEdit
