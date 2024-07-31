'user client'
import { AlertDialogContent } from '../ui/alert-dialog'
import { ColumnForm } from './components/column-form'
import { ModalHead } from './components/modal-head'

interface editColumn {
  columnId: number
  dashboardId: number
  initialValues: string
  setOpen: (open: boolean) => void
  setStep: (open: number) => void
  onSubmit: (title: string) => void
}

const ColumnEdit = ({
  columnId,
  dashboardId,
  initialValues,
  setOpen,
  setStep,
  onSubmit,
}: editColumn) => {
  return (
    <AlertDialogContent>
      <div className='py-3 md:py-4'>
        <ModalHead>컬럼 관리</ModalHead>
        <ColumnForm
          initialValues={{ title: initialValues }}
          dashboardId={dashboardId}
          columnId={columnId}
          setOpen={setOpen}
          setStep={setStep}
          onSubmit={onSubmit}
        />
      </div>
    </AlertDialogContent>
  )
}
export default ColumnEdit
