import { DialogContent } from '@/components/ui/dialog'
import { ModalFoot } from './modal-foot'
import { ModalHead } from './modal-head'

export const ColumnAdd = () => {
  return (
    <DialogContent>
      <ModalHead>칼럼 추가</ModalHead>
      <div>컬럼카드 추가</div>
      <ModalFoot />
    </DialogContent>
  )
}
