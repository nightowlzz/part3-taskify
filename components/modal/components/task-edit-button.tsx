'use client'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { api } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { ConfirmAlert } from '../confirm-alert'
import { TaskCardEdit } from '../task-edit'
import {
  IColumnDashboardId,
  ITaskDetail,
  ITaskDetails,
} from '../types/modal-type'

async function getTaskList(id: number) {
  const {
    data: { cards },
  } = await api.get<ITaskDetails>(`/cards?columnId=${id}`)

  return cards
}

export const TaskEditButton = ({
  columnId,
  dashboardId,
}: IColumnDashboardId) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [cards, setCards] = useState<ITaskDetail[]>()

  const onDelete = async (cardId: number) => {
    try {
      await api.delete(`/cards/${cardId}`)
      toast.success(`할 일 삭제 되었습니다.`)
      router.refresh()
    } catch {
      toast.error(`삭제 되지 않았습니다.`)
    } finally {
      setStep(1)
    }
  }

  useEffect(() => {
    const aaaa = async () => {
      const result = await getTaskList(columnId)
      setCards(result)
    }
    aaaa()
  }, [])
  return (
    <div>
      {cards
        ? cards.map((card: any) => (
            <AlertDialog key={card.id} open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger className='bg-orange p-3'>
                {card.title}
              </AlertDialogTrigger>
              {step === 1 && (
                <TaskCardEdit
                  columnId={columnId}
                  dashboardId={dashboardId}
                  setOpen={setOpen}
                  setStep={setStep}
                  {...card}
                />
              )}
              {step === 2 && (
                <ConfirmAlert
                  confirmText={'삭제'}
                  onCancle={() => setStep(1)}
                  onConfirm={() => onDelete(card.id)}
                >
                  할 일이 삭제 됩니다.
                </ConfirmAlert>
              )}
            </AlertDialog>
          ))
        : null}
    </div>
  )
}
