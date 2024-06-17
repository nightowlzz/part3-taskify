'use client'
import { cardListStateAboutColumn } from '@/app/(protected)/dashboard/[dashboardId]/_recoil/todo'
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CardInfo } from '@/lib/type'
import { api } from '@/lib/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { toast } from 'sonner'
import { ConfirmAlert } from '../confirm-alert'
import { TaskCardEdit } from '../task-edit'
import { taskDetail } from '../types/modal-type'

const styled = {
  popoverButton:
    'bg-transparent hover:bg-violet-100 h-7 md:h-8 hover:text-violet-500 leading-5 text w-full text-sm',
}

export const TaskPopoder = (task: taskDetail) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const setColumnCardList = useSetRecoilState<CardInfo[] | []>(
    cardListStateAboutColumn(task.columnId),
  )

  // 할일 팝오버메뉴의 삭제하기
  const onSubmitDelete = async (cardId: number) => {
    try {
      await api.delete(`/cards/${cardId}`)
      toast.success(`할 일이 삭제 되었습니다.`)
      setColumnCardList((prev) => {
        return prev.filter((card: CardInfo) => card.id !== cardId)
      })
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.message) {
        toast.error(e.response.data.message)
      } else {
        toast.error(`삭제 되지 않았습니다.`)
      }
    }
  }

  return (
    <Popover>
      <PopoverTrigger className='relative h-6 w-6 rounded bg-white md:h-8 md:w-8'>
        <Image
          fill
          src={`/icon-dotted.svg`}
          alt={'팝오버'}
          style={{
            objectFit: 'cover',
          }}
        />
      </PopoverTrigger>
      <PopoverContent>
        {/* 수정하기 모달 */}
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger className={styled.popoverButton}>
            수정하기
          </AlertDialogTrigger>

          <TaskCardEdit setOpen={setOpen} {...task} />
        </AlertDialog>

        {/* 삭제하기 모달 */}
        <AlertDialog>
          <AlertDialogTrigger className={styled.popoverButton}>
            삭제하기
          </AlertDialogTrigger>
          <ConfirmAlert
            confirmText={'삭제'}
            onConfirm={() => onSubmitDelete(task.id)}
          >
            할 일이 삭제 됩니다.
          </ConfirmAlert>
        </AlertDialog>
      </PopoverContent>
    </Popover>
  )
}
