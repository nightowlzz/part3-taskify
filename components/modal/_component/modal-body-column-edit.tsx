import { ModalFoot } from './modal-foot'
import { ModalHead } from './modal-head'

export const ColumnEdit = () => {
  return (
    <div>
      <ModalHead>
        <h2>칼럼 수정</h2>
      </ModalHead>
      <div>컬럼카드 수정</div>
      <ModalFoot />
    </div>
  )
}
