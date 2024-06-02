import { DialogContent } from '@/components/ui/dialog'
import { ModalFoot } from './modal-foot'
import { ModalHead } from './modal-head'

export const TaskCardEdit = () => {
  return (
    <DialogContent>
      <ModalHead>할 일 수정</ModalHead>
      <div>할일카드수정</div>
      <ModalFoot />
    </DialogContent>
  )
}
