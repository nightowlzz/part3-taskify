import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DialogContent } from '@/components/ui/dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ModalHead } from './modal-head'
import styled from './modal.module.css'
import Image from 'next/image'

const TaskCard = () => {
  return (
    <DialogContent className='block min-h-96 max-w-[730px] pr-[256px]'>
      <ModalHead>새로운 일정 관리 TAskify</ModalHead>
      {/* 팝오버 */}
      <Popover>
        <PopoverTrigger className='absolute right-[78px] top-[34px]'>
          <Image
            src={'/icon_dotted.svg'}
            alt={'팝오버'}
            width={28}
            height={28}
          />
        </PopoverTrigger>
        <PopoverContent>
          <Button variant={'popover'}>수정하기</Button>
          <Button variant={'popover'}>삭제하기</Button>
        </PopoverContent>
      </Popover>
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
      {/* 태그 */}
      <div className='flex items-center'>
        <Badge
          variant='dotted'
          className={`${styled.badge} bg-[#F1EFFD] text-[#5534DA]`}
        >
          Badge
        </Badge>
        <ul
          className={`${styled.separator} relative ml-5 flex items-center gap-2 pl-5`}
        >
          <Badge className='bg-[#F9EEE3] text-[#D58D49]'>프로젝트</Badge>
          <Badge className='bg-[#E7F7DB] text-[#86D549]'>일반</Badge>
          <Badge className='bg-[#F7DBF0] text-[#D549B6]'>백엔드</Badge>
          <Badge className='bg-[#DBE6F7] text-[#4981D5]'>상</Badge>
        </ul>
      </div>
      {/* 문구, 이미지 */}
      <ScrollArea className='mb-6 mt-4 h-[450px] w-full'>
        <div className='leading-6'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          finibus nibh arcu, quis consequat ante cursus eget. Cras mattis, nulla
          non laoreet porttitor, diam justo laoreet eros, vel aliquet diam elit
          at leo.
          <img src='https://github.com/shadcn.png' alt='' className='mt-4' />
        </div>
      </ScrollArea>
      {/* 댓글 입력 */}
      <div>
        <h3 className='pb-[10px] font-bold'>댓글</h3>
        <form>
          <div className='rounded-md border p-3'>
            <textarea
              name=''
              id=''
              placeholder='댓글 작성하기'
              className='text-6 w-full p-1'
            ></textarea>
            <Button
              className='ml-auto block w-[78px] font-bold text-[#5534DA]'
              variant={'outline'}
            >
              입력
            </Button>
          </div>
        </form>
      </div>
      {/* 댓글 보기 */}
      <div className='flex gap-2.5 pt-5'>
        <Avatar>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <ul>
          <li>
            <div className='flex gap-2 pb-1 pt-2'>
              <strong className='text-sm font-bold'>장만철</strong>
              <span className='text=[#9FA6B2] text-xs'>2022.12.27 14:00</span>
            </div>
            <div className='pb-2.5 text-sm'>
              오늘안에 CCC 까지 만들 수 있을까요?
            </div>
            <div className='flex gap-2.5'>
              <Button variant={'underline'} className='h-auto p-0'>
                수정
              </Button>
              <Button variant={'underline'} className='h-auto p-0'>
                삭제
              </Button>
            </div>
          </li>
        </ul>
      </div>
    </DialogContent>
  )
}

export default TaskCard
