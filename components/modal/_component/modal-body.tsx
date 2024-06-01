import { modalType } from '../modal-layout'
import { ColumnAdd } from './modal-body-column-add'
import { ColumnEdit } from './modal-body-column-edit'
import TaskCard from './modal-body-task-card'
import TaskCardCreate from './modal-body-task-create'
import { TaskCardEdit } from './modal-body-task-edit'

const ModalBody = ({ order }: { order: modalType['order'] }) => {
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
    default:
      Component = null
  }
  return <>{Component ? <Component /> : null}</>
}

export default ModalBody
