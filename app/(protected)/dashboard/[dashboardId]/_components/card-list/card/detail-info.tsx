import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { api } from '@/lib/utils'
import Image from 'next/image'
import { Comment } from '@/components/modal/components/comment'
import { ModalHead } from '@/components/modal/components/modal-head'
import { TaskPopoder } from '@/components/modal/components/task-popoder'
import styled from '@/components/modal/modal.module.css'
import { taskDetailData } from '@/components/modal/types/modal-type'
import { taskDetail } from '@/components/modal/types/modal-type'
import { assignee } from '@/components/modal/types/modal-type'

export const getColumnTasks = async (columnId: number) => {
  const {
    data: { cards },
  } = await api.get<taskDetailData>(`/cards?columnId=${columnId}`)
  return cards
}

export const DetailInfo = ({
  columnId,
  columnTitle,
  id,
  title,
  tags,
  dueDate,
  imageUrl,
  nickname,
  profileImageUrl,
  description,
  dashboardId,
  assignee,
  closeInfo,
}: {
  columnId: number
  columnTitle: string
  id: number
  title: string
  tags: string[]
  dueDate: string
  imageUrl: string
  nickname: string
  profileImageUrl: string
  description: string
  dashboardId: number
  assignee: assignee
  closeInfo: (e: React.MouseEvent<HTMLElement>) => void
}) => {
  const task: taskDetail = {
    id,
    title,
    description,
    tags,
    dueDate,
    assignee,
    imageUrl,
    dashboardId,
    columnId,
  }

  return (
    <div className='fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'>
      <div
        className={`block h-[90vh] max-w-[730px] ${styled.dialogWrap} fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]`}
      >
        <ScrollArea className='h-full w-full'>
          <div className='px-5 pb-5 pt-10 md:px-7 md:py-8 md:pr-[244px]'>
            <div className='pb-6 sm:text-2xl md:pb-8'>{title}</div>
            {/* 담당자 */}
            <ul className='mb-4 flex w-full flex-row gap-2 rounded-lg border border-slate-300 px-4 py-3 md:absolute md:right-7 md:top-[85px] md:w-[200px] md:flex-col md:gap-0 md:p-4'>
              <li className='flex-1 md:pb-5'>
                <h6 className='text-xs font-bold leading-5 leading-[26px] md:pb-1'>
                  담당자
                </h6>
                <div className='flex items-center'>
                  {task.assignee ? (
                    <>
                      <Avatar className='mr-2'>
                        <AvatarImage src={profileImageUrl} />
                        <AvatarFallback>{nickname[0]}</AvatarFallback>
                      </Avatar>
                      <span className='text-sm'>{nickname}</span>
                    </>
                  ) : (
                    <span className='text-xs leading-[26px]'>
                      담당자가 없습니다.
                    </span>
                  )}
                </div>
              </li>
              {dueDate ? (
                <li className='flex-1'>
                  <h6 className='text-xs font-bold leading-[26px]'>마감일</h6>
                  <div className='text-xs leading-[26px]'>{dueDate}</div>
                </li>
              ) : null}
            </ul>
            {/* 태그 */}
            <div className='flex items-start'>
              {/* 현재 컬럼 보여줌 */}
              <Badge
                variant='dotted'
                className={`${styled.badge} shrink-0 text-wrap bg-violet-100 text-violet-500`}
              >
                {columnTitle}
              </Badge>
              <ul
                className={`${styled.separator} relative ml-3 flex flex-wrap items-center gap-2 pl-3 md:ml-5 md:pl-5`}
              >
                {/* 태그 리스트 */}
                {tags
                  ? tags.map((tag: string) => {
                      const [tagName, tagColor] = tag.split('-#')
                      return (
                        <li
                          key={tag}
                          className={`flex h-auto min-h-6 items-center text-wrap rounded p-1.5 text-left text-xs font-medium`}
                          style={{
                            backgroundColor: `rgba(${tagColor},0.2)`,
                            color: `rgba(${tagColor}`,
                          }}
                        >
                          {tagName}
                        </li>
                      )
                    })
                  : null}
              </ul>
            </div>
            {/* 문구, 이미지 */}
            <div className='pb-6 pt-4 leading-6'>
              {description}
              {imageUrl && (
                <div className='relative mt-6 w-full'>
                  <Image
                    src={imageUrl}
                    sizes='100vw'
                    width={0}
                    height={0}
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '400px',
                    }}
                    alt={title}
                    priority
                  />
                </div>
              )}
            </div>
            <Comment
              cardId={id}
              dashboardId={dashboardId}
              columnId={columnId}
            />
          </div>
        </ScrollArea>
        {/* 팝오버 */}
        <div className='absolute right-3 top-3 flex w-[60px] items-center justify-between md:right-7 md:top-8 md:w-[84px]'>
          <TaskPopoder {...task} />
          <button
            onClick={closeInfo}
            className='relative m-0 h-6 w-6 border-0 p-0 md:h-8 md:w-8'
          >
            <Image
              fill
              src='/icon-close.svg'
              alt='닫기'
              style={{
                objectFit: 'cover',
              }}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default DetailInfo
