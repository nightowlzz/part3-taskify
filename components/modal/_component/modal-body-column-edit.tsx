import { DialogContent } from '@/components/ui/dialog'
import { ModalFoot } from './modal-foot'
import { ModalHead } from './modal-head'

export const ColumnEdit = () => {
  return (
    <DialogContent>
      <ModalHead>칼럼 수정</ModalHead>
      <div>컬럼카드 수정</div>
      <ModalFoot />
    </DialogContent>
  )
}
