'use client'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { api } from '@/lib/utils'
import settingIcon from '@/public/settings_icon.svg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import ColumnEdit from '../column-edit'
import { ConfirmAlert } from '../confirm-alert'

interface editColumnBtn {
  columnId: number
  dashboardId: number
  initialValues: string
  onSubmit: (title: string) => void
}

export const ColumnEditButton = ({
  columnId,
  initialValues,
  dashboardId,
  onSubmit,
}: editColumnBtn) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)

  const onDelete = async () => {
    try {
      await api.delete(`/columns/${columnId}`)

      toast.success(`'${initialValues}' 컬럼이 삭제 되었습니다.`)
    } catch {
      toast.error(`삭제 되지 않았습니다.`)
    } finally {
      router.refresh()
      setStep(1)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className='relative ml-auto h-[1.375rem] w-[1.375rem] md:h-[1.5rem] md:w-[1.5rem]'>
        <Image src={settingIcon.src} fill alt='설정 아이콘' />
      </AlertDialogTrigger>
      {step === 1 && (
        <ColumnEdit
          initialValues={initialValues}
          columnId={Number(columnId)}
          dashboardId={dashboardId}
          setOpen={setOpen}
          setStep={setStep}
          onSubmit={onSubmit}
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
