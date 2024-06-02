import { DialogContent } from '@/components/ui/dialog'
import { ModalFoot } from './modal-foot'
import { ModalHead } from './modal-head'

const TaskCardCreate = () => {
  return (
    <DialogContent>
      <ModalHead>할 일 생성</ModalHead>
      <div>할일카드생성</div>
      <ModalFoot />
    </DialogContent>
  )
}

export default TaskCardCreate
