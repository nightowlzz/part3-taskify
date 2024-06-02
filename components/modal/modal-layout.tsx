import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'
import ModalBody from './_component/modal-body'

export type modalType = {
  text: string // button text
  order: string // body order
  children?: React.ReactNode // alert text 내용
  confirmText?: string // 확인 버튼 문구 수정
}

const Modal = ({ text, order, children, confirmText }: modalType) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>{text}</Button>
      </DialogTrigger>
      <ModalBody order={order} confirmText={confirmText}>
        {children}
      </ModalBody>
    </Dialog>
  )
}

export default Modal
