import calendarIcon from '@/public/icon-calendar.svg'
import Tag from './tag'
// import DeleteTodo from '@/src/app/_component/modal/todo/delete';
// import DetailToDo from '@/src/app/_component/modal/todo/detail';
// import UpdateTodo from '@/src/app/_component/modal/todo/update';
import {
  deleteTodoAboutCardId,
  detailTodoAboutCardId,
  openPopOverState,
  updateTodoAboutCardId,
} from '../../modal/modal-atom'
import Image from 'next/image'
import React from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
interface CardProps {
  title: string
  tags: string[]
  dueDate: string
  bgColor: string
  imageUrl: string
  nickname: string
  profileImageUrl: string
  id: number
  columnId: number
}

export default function Card({
  title,
  tags,
  dueDate,
  bgColor,
  imageUrl,
  nickname,
  profileImageUrl,
  id,
  columnId,
}: CardProps) {
  const setIsOpenPopOver = useSetRecoilState(openPopOverState)
  const [isOpenDetailTodoModal, setIsOpenDetailTodoModal] = useRecoilState(
    detailTodoAboutCardId(id),
  )
  const isOpenUpdateTodoModal = useRecoilValue(updateTodoAboutCardId(id))
  const isOpenDeleteTodoModal = useRecoilValue(deleteTodoAboutCardId(id))
  const openDetailTodoModal = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setIsOpenDetailTodoModal(true)
    setIsOpenPopOver(false)
  }

  return (
    <>
      <div
        onClick={openDetailTodoModal}
        className='border-gray30 flex flex-grow-0 flex-col gap-[0.625rem] 
		rounded-[0.375rem] border bg-white px-3 py-3 
		md:flex-row lg:flex-col lg:items-stretch lg:p-5'
      >
        {imageUrl && (
          <div className='flex h-full w-full items-center overflow-hidden rounded 
		  md:h-[3.3125rem] md:w-[5.6725rem] lg:h-full lg:w-full'>
            <Image
              src={imageUrl}
              sizes='100vw'
              width={0}
              height={0}
              style={{ width: '100%', height: 'auto' }}
              alt={title}
              priority
            />
          </div>
        )}
        <div className='flex flex-1 flex-col gap-[0.625rem]'>
          <div
            className={`text-black80 text-[0.875rem] md:text-[1rem]`}
          >
            {title}
          </div>
          <div className='flex justify-between gap-4'>
            <div className='flex flex-1 flex-col flex-wrap gap-[0.375rem] md:flex-row md:flex-wrap md:items-center md:gap-4 lg:flex-col lg:items-stretch lg:gap-[0.625rem]'>
              {tags.length > 0 && (
                <div className='flex flex-wrap gap-[0.375rem]'>
                  {tags.map((tag, index) => (
                    <Tag content={tag} key={tag + index} />
                  ))}
                </div>
              )}

              <div className='flex shrink-0 grow justify-between gap-[0.375rem]'>
                <div className='flex items-center gap-[0.375rem]'>
                  <div className='relative h-[0.875rem] w-[0.875rem] md:h-[1.125rem] md:w-[1.125rem]'>
                    <Image src={calendarIcon} fill alt='달력 아이콘' />
                  </div>
                  <span className='text-gray50 flex text-[0.625rem] md:translate-y-[0.0625rem] md:text-[0.75rem]'>
                    {dueDate}
                  </span>
                </div>
                {
                  <span
                    className={`relative flex h-[1.375rem] w-[1.375rem] items-center justify-center rounded-full md:h-[1.5rem] md:w-[1.5rem] ${bgColor} overflow-hidden text-[0.625rem] font-semibold text-white md:text-[0.75rem]`}
                  >
                    {profileImageUrl ? (
                      <Image
                        src={profileImageUrl}
                        sizes='100vw'
                        width={0}
                        height={0}
                        style={{ width: '100%', height: '100%' }}
                        alt={nickname}
                      />
                    ) : (
                      nickname?.[0]
                    )}
                  </span>
                }
              </div>
            </div>
          </div>
        </div>
        {/* {isOpenDetailTodoModal && <DetailToDo cardId={id} columnId={columnId} />}
        {isOpenUpdateTodoModal && <UpdateTodo cardId={id} columnId={columnId} />}
        {isOpenDeleteTodoModal && <DeleteTodo cardId={id} columnId={columnId} />} */}
      </div>
    </>
  )
}
