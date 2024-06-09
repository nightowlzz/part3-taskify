import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { api } from '@/lib/utils'
import Image from 'next/image'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { ModalHead } from './components/modal-head'
import { TaskPopoder } from './components/task-popoder'
import styled from './modal.module.css'
import { taskDetailData } from './types/modal-type'

export const getColumnTasks = async (columnId: number) => {
  const {
    data: { cards },
  } = await api.get<taskDetailData>(`/cards?columnId=${columnId}`)
  return cards
}

export const TaskCard = async ({
  columnId,
  columnTitle,
}: {
  columnId: number
  columnTitle: string
}) => {
  const tasks = await getColumnTasks(columnId)

  if (!tasks) return

  return (
    <>
      {tasks &&
        tasks.map((task) => (
          <AlertDialog key={task.id}>
            <AlertDialogTrigger className='flex gap-2 bg-orange p-3'>
              {task.title}
            </AlertDialogTrigger>
            <AlertDialogContent className='block h-[90vh] max-w-[730px] md:max-h-[80vh]'>
              <ScrollArea className='h-full w-full'>
                <div className='px-5 pb-7 pt-10 md:px-7 md:py-8 md:pr-[244px]'>
                  <ModalHead>{task.title}</ModalHead>
                  {/* 담당자 */}
                  <ul className='mb-4 flex w-full flex-row rounded-lg border border-slate-300 px-4 py-3 md:absolute md:right-7 md:top-[85px] md:w-[200px] md:flex-col md:p-4'>
                    <li className='flex-1 md:pb-5'>
                      <h6 className='pb-[2px] text-xs font-bold leading-5 md:pb-1'>
                        담당자
                      </h6>
                      <div className='flex items-center'>
                        {task.assignee ? (
                          <>
                            <Avatar className='mr-2'>
                              <AvatarImage
                                src={task.assignee.profileImageUrl}
                              />
                              <AvatarFallback>
                                {task.assignee.nickname[0]}
                              </AvatarFallback>
                            </Avatar>
                            <span className='text-sm'>
                              {task.assignee.nickname}
                            </span>
                          </>
                        ) : (
                          <span>담당자가 없습니다.</span>
                        )}
                      </div>
                    </li>
                    {task.dueDate ? (
                      <li className='flex-1'>
                        <h6 className='pb-[6px] text-xs font-bold leading-[26px]'>
                          마감일
                        </h6>
                        <div className='leading-6.5 text-xs'>
                          {task.dueDate}
                        </div>
                      </li>
                    ) : null}
                  </ul>
                  {/* 태그 */}
                  <div className='flex items-start'>
                    {/* 현재 컬럼 보여줌 */}
                    <Badge
                      variant='dotted'
                      className={`${styled.badge} shrink-0 text-wrap bg-violet_light text-violet`}
                    >
                      {columnTitle}
                    </Badge>
                    <ul
                      className={`${styled.separator} relative ml-3 flex flex-wrap items-center gap-2 pl-3 md:ml-5 md:pl-5`}
                    >
                      {/* 태그 리스트 */}
                      {task.tags
                        ? task.tags.map((tag: string) => {
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
                    {task.description}
                    {task.imageUrl && (
                      <div className='relative max-h-[260px] w-full'>
                        <Image
                          className='mt-4'
                          src={task.imageUrl}
                          alt='할일 추가이미지'
                          fill
                        />
                      </div>
                    )}
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
                          className='ml-auto block h-[28px] w-[78px] py-0 font-bold text-violet md:h-8'
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
                            삭제
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
              <div className='absolute right-3 top-3 flex w-[60px] items-center justify-between md:right-7 md:top-8 md:w-[84px]'>
                <TaskPopoder {...task} />
                <AlertDialogCancel className='relative m-0 h-6 w-6 border-0 p-0 md:h-8 md:w-8'>
                  <Image
                    fill
                    src='/icon-close.svg'
                    alt='닫기'
                    style={{
                      objectFit: 'cover',
                    }}
                  />
                </AlertDialogCancel>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        ))}
    </>
  )
}

export default TaskCard
