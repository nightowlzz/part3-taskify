import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'

interface ModalFootProps {
  edit?: boolean
  confirmText?: string
  onConfirm?: () => void
}

export const ModalFoot = ({
  edit = false,
  confirmText = '확인',
  onConfirm,
}: ModalFootProps) => {
  return (
    <DialogFooter
      className={`flex-col items-start justify-start pt-6 md:flex-row md:items-end md:pt-7 justify-${edit ? `between` : `end`}`}
    >
      {edit ? (
        <Button
          variant='underline'
          className='mb-4 h-5 p-0 leading-none md:mb-0'
        >
          삭제하기
        </Button>
      ) : null}
      <div className={`flex w-full justify-end gap-3`}>
        <Button
          type='button'
          variant={'outline'}
          className='h-12 w-full md:max-w-[120px]'
        >
          취소
        </Button>
        <Button
          type='button'
          className='h-12 w-full bg-[#5534DA] md:max-w-[120px]'
        >
          {confirmText}
        </Button>
      </div>
    </DialogFooter>
  )
}
