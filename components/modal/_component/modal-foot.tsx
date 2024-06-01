import { DialogFooter } from '@/components/ui/dialog'
import { DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export const ModalFoot = () => {
  return (
    <DialogFooter className='flex-end pt-7'>
      <DialogClose asChild>
        <Button
          type='button'
          variant={'outline'}
          className='h-12 w-full max-w-[120px]'
        >
          취소
        </Button>
      </DialogClose>
      <DialogClose asChild>
        <Button type='button' className='h-12 w-full max-w-[120px]'>
          확인
        </Button>
      </DialogClose>
    </DialogFooter>
  )
}
