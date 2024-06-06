'use client'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { ColumnEdit } from '../column-edit'
import { useState } from 'react'
import { ConfirmAlert } from '../confirm-alert'
import { api } from '@/lib/utils'
import { toast } from 'sonner'

type aaaa = {
  columnId: number
  title: string
  dashboardId: number
}

export const ColumnEditButton = ({ columnId, title, dashboardId }: aaaa) => {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)

  const onDelete = async () => {
    try {
      await api.delete(`/columns/${columnId}`)
      toast.success(`'${title}'컬럼 삭제 되었습니다.`)
    } catch {
      toast.success(`삭제 되지 않았습니다.`)
    } finally {
      setStep(1)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        className='bg-violet_light p-3'
        onClick={() => console.log(columnId)}
      >
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
