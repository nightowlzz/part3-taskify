'use client'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { api } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { ConfirmAlert } from '../confirm-alert'
import { TaskCardEdit } from '../task-edit'
import {
  columnDashboardId,
  taskDetail,
  taskDetailData,
} from '../types/modal-type'

async function getTaskList(id: number) {
  const {
    data: { cards },
  } = await api.get<taskDetailData>(`/cards?columnId=${id}`)

  return cards
}

export const TaskEditButton = ({
  columnId,
  dashboardId,
}: columnDashboardId) => {
  const router = useRouter()
  const [openCardId, setOpenCardId] = useState<number | null>(null)
  const [step, setStep] = useState(1)
  const [cards, setCards] = useState<taskDetail[]>()

  const onDelete = async (cardId: number) => {
    try {
      await api.delete(`/cards/${cardId}`)
      toast.success(`할 일이 삭제 되었습니다.`)
      router.refresh()
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.message) {
        toast.error(e.response.data.message)
      } else {
        toast.error(`삭제 되지 않았습니다.`)
      }
    } finally {
      setStep(1)
    }
  }

  // 모달의 다중 열림으로 cardid에 맞는 모달만 열리도록 수정
  const addHookAliases = (isOpen: boolean, card: number) => {
    if (isOpen) {
      setOpenCardId(card)
      setStep(1)
    } else {
      setOpenCardId(null)
      setStep(1)
    }
  }

  useEffect(() => {
    const taskList = async () => {
      const result = await getTaskList(columnId)
      setCards(result)
    }
    taskList()
  }, [])
  return (
    <div>
      {cards
        ? cards.map((card: any) => (
            <AlertDialog
              key={card.id}
              open={openCardId === card.id ? true : false}
              onOpenChange={(isOpen) => addHookAliases(isOpen, card.id)}
            >
              <AlertDialogTrigger className='bg-orange p-3'>
                {card.title}
              </AlertDialogTrigger>
              {step === 1 && (
                <TaskCardEdit
                  key={card.id + 'edit'}
                  columnId={columnId}
                  dashboardId={dashboardId}
                  setStep={setStep}
                  setOpenCardId={setOpenCardId}
                  {...card}
                />
              )}
              {step === 2 && (
                <ConfirmAlert
                  key={card.id + 'delet'}
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
