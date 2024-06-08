'use client'
import ColumnEdit from '@/components/modal/column-edit'
import { ConfirmAlert } from '@/components/modal/confirm-alert'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { api } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { columnEdit } from '../modal/modal-type'

// 추 후 삭제예정[파일]
export const ColumnEditButton = ({
  columnId,
  initialValues,
  dashboardId,
}: columnEdit) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)

  const onDelete = async () => {
    try {
      await api.delete(`/columns/${columnId}`)

      toast.success(`'${initialValues}'컬럼 삭제 되었습니다.`)
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
        {initialValues}
      </AlertDialogTrigger>
      {step === 1 && (
        <ColumnEdit
          columnId={Number(columnId)}
          initialValues={initialValues}
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
