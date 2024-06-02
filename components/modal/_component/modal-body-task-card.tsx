import React from 'react'
import { ModalFoot } from './modal-foot'
import { ModalHead } from './modal-head'
import { DialogContent } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'

const TaskCard = () => {
  return (
    <DialogContent className='min-h-96 max-w-[730px]'>
      <ModalHead>새로운 일정 관리 TAskify</ModalHead>
      {/* 담당자 */}
      <ul className='absolute right-[28px] top-[85px] w-[200px] rounded-lg border border-slate-300 p-4'>
        <li className='pb-5'>
          <h6 className='pb-[6px] text-xs font-bold leading-5'>담당자</h6>
          <div className='flex items-center'>
            <Avatar className='mr-2'>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className='text-sm'>배유철</span>
          </div>
        </li>
        <li>
          <h6 className='pb-[6px] text-xs font-bold leading-5'>마감일</h6>
          <div>2022.12.30 19:00</div>
        </li>
      </ul>
      <ScrollArea className='h-[200px] w-[350px] p-4'>
        {/* 태그 */}
        <div></div>
        {/* 문구, 이미지 */}
        <div></div>
        {/* 댓글 입력 */}
        <div></div>
        {/* 댓글 보여주시 */}
        <div></div>
      </ScrollArea>
    </DialogContent>
  )
}

export default TaskCard
