import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import React, { Suspense } from 'react'
import ModalBody from './_component/modal-body'
import TaskCard from './_component/modal-body-task-card'

export type modalType = {
  text: string // button text
  order: string // body order
}

const Modal = ({ text, order }: modalType) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>{text}</Button>
      </DialogTrigger>
      <ModalBody order={order} />
    </Dialog>
  )
}

export default Modal
