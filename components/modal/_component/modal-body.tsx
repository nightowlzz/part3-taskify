import { modalType } from '../modal-layout'
import { Alert } from './modal-body-alert'
import { ColumnAdd } from './modal-body-column-add'
import { ColumnEdit } from './modal-body-column-edit'
import TaskCard from './modal-body-task-card'
import TaskCardCreate from './modal-body-task-create'
import { TaskCardEdit } from './modal-body-task-edit'

export type modalTypeWithoutText = Omit<modalType, 'text'>

const ModalBody = ({ order, children, confirmText }: modalTypeWithoutText) => {
  let Component: React.ElementType | null = null

  switch (order) {
    case 'taskCard':
      Component = TaskCard
      break
    case 'taskCardCreate':
      Component = TaskCardCreate
      break
    case 'taskCardEdit':
      Component = TaskCardEdit
      break
    case 'columnAdd':
      Component = ColumnAdd
      break
    case 'columnEdit':
      Component = ColumnEdit
      break
    case 'baseAlert':
      Component = Alert
      break
    default:
      Component = null
  }
  return (
    <>
      {Component ? (
        Component === Alert ? (
          <Component confirmText={confirmText}>{children}</Component>
        ) : (
          <Component confirmText={confirmText} />
        )
      ) : null}
    </>
  )
}

export default ModalBody
