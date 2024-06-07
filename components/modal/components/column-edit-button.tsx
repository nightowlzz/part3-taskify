'use client'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { api } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { ColumnEdit } from '../column-edit'
import { ConfirmAlert } from '../confirm-alert'
import { IColumnEditButton } from '../types/modal-type'

// 추 후 삭제예정[파일]
export const ColumnEditButton = ({
  columnId,
  title,
  dashboardId,
}: IColumnEditButton) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)

  const onDelete = async () => {
    try {
      await api.delete(`/columns/${columnId}`)

      toast.success(`'${title}'컬럼 삭제 되었습니다.`)
    } catch {
      toast.success(`삭제 되지 않았습니다.`)
    } finally {
      router.refresh()
      setStep(1)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className='bg-violet_light p-3'>
        {title}
      </AlertDialogTrigger>
      {step === 1 && (
        <ColumnEdit
          columnId={Number(columnId)}
          title={title}
          dashboardId={dashboardId}
          setOpen={setOpen}
          setStep={setStep}
        />
      )}
      {step === 2 && (
        <ConfirmAlert
          confirmText={'삭제'}
          onCancle={() => setStep(1)}
          onConfirm={() => onDelete()}
        >
          컬럼의 모든 카드가 삭제됩니다.
        </ConfirmAlert>
      )}
    </AlertDialog>
  )
}
