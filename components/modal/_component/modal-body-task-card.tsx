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
import Image from 'next/image'
import { ModalHead } from './modal-head'
import styled from './modal.module.css'

const TaskCard = () => {
  return (
    <DialogContent className='block h-screen max-w-[730px] md:max-h-[80vh]'>
      <ScrollArea className='h-full w-full'>
        <div className='px-[28px] py-8 md:pr-[244px]'>
          <ModalHead>새로운 일정 관리 Taskify</ModalHead>
          {/* 담당자 */}
          <ul className='mb-4 flex w-full flex-row rounded-lg border border-slate-300 px-4 py-3 md:absolute md:right-7 md:top-[85px] md:w-[200px] md:flex-col md:p-4'>
            <li className='flex-1 md:pb-5'>
              <h6 className='pb-[2px] text-xs font-bold leading-5 md:pb-1'>
                담당자
              </h6>
              <div className='flex items-center'>
                <Avatar className='mr-2'>
                  <AvatarImage src='https://github.com/shadcn.png' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className='text-sm'>배유철</span>
              </div>
            </li>
            <li className='flex-1'>
              <h6 className='pb-[6px] text-xs font-bold leading-[26px]'>
                마감일
              </h6>
              <div className='leading-6.5 text-xs'>2022.12.30 19:00</div>
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
              className={`${styled.separator} relative ml-3 flex items-center gap-2 pl-3 md:ml-5 md:pl-5`}
            >
              <Badge className='bg-[#F9EEE3] text-[#D58D49]'>프로젝트</Badge>
              <Badge className='bg-[#E7F7DB] text-[#86D549]'>일반</Badge>
              <Badge className='bg-[#F7DBF0] text-[#D549B6]'>백엔드</Badge>
              <Badge className='bg-[#DBE6F7] text-[#4981D5]'>상</Badge>
            </ul>
          </div>
          {/* 문구, 이미지 */}
          <div className='pb-6 pt-4 leading-6'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            finibus nibh arcu, quis consequat ante cursus eget. Cras mattis,
            nulla non laoreet porttitor, diam justo laoreet eros, vel aliquet
            diam elit at leo.
            <img src='https://github.com/shadcn.png' alt='' className='mt-4' />
          </div>
          {/* 댓글 입력 */}
          <div>
            <h3 className='pb-[10px] font-bold'>댓글</h3>
            <form>
              <div className='rounded-md border p-3'>
                <textarea
                  name=''
                  id=''
                  placeholder='댓글 작성하기'
                  className='text-6 w-full p-1 placeholder:text-sm'
                ></textarea>
                <Button
                  className='ml-auto block h-[28px] w-[78px] py-0 font-bold text-[#5534DA] md:h-8'
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
                  <span className='text=[#9FA6B2] text-xs'>
                    2022.12.27 14:00
                  </span>
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
        </div>
      </ScrollArea>
      {/* 팝오버 */}
      <Popover>
        <PopoverTrigger className='absolute right-[52px] top-3 h-6 w-6 md:right-20 md:right-[78px] md:top-9 md:h-7 md:w-7'>
          <Image
            fill
            src={`/icon-dotted.svg`}
            alt={'팝오버'}
            style={{
              objectFit: 'cover',
            }}
          />
        </PopoverTrigger>
        <PopoverContent>
          <Button variant={'popover'}>수정하기</Button>
          <Button variant={'popover'}>삭제하기</Button>
        </PopoverContent>
      </Popover>
    </DialogContent>
  )
}

export default TaskCard
