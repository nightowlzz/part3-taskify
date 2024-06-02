import { DialogFooter } from '@/components/ui/dialog'
import { DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export const ModalFoot = () => {
  return (
    <DialogFooter className='flex-end gap-3 pt-7'>
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
        확인
      </Button>
    </DialogFooter>
  )
}
