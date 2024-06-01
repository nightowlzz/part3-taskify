import React from 'react'
import { ModalFoot } from './modal-foot'
import { ModalHead } from './modal-head'

const TaskCard = () => {
  return (
    <div>
      <ModalHead>
        <h2>Title</h2>
      </ModalHead>
      <div>할 일 카드</div>
      <ModalFoot />
    </div>
  )
}

export default TaskCard
