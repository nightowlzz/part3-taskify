import { ModalFoot } from './modal-foot'
import { ModalHead } from './modal-head'

const TaskCardCreate = () => {
  return (
    <div>
      <ModalHead>
        <h2>할 일 생성</h2>
      </ModalHead>
      <div>할일카드생성</div>
      <ModalFoot />
    </div>
  )
}

export default TaskCardCreate
