'use client'

import Colors from './color'
import { CardInfo } from '@/lib/type'
import Number from './number'
// import UpdateColumn from '../update-column'
import { deleteColumnsForColumnId, updateColumnsForColumnId } from './column'
import {
  cardListStateAboutColumn,
  countAboutCardList,
} from '../../_recoil/todo'
import { api } from '@/lib/utils'
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from '@hello-pangea/dnd'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
// import UpdateColumn from '../update-column'
import Card from './card'
import { TaskCreactButton } from '@/components/modal/components/task-create-button'
import { ColumnEditButton } from '@/components/modal/components/column-edit-button'
import useInfiniteScroll from '@/app/_hook/useInfiniteScroll'
import { columnForm } from '@/components/modal/types/modal-type'
import { useRouter } from 'next/navigation'
import { detailTodoAboutCardId } from '../modal/modal-atom'

interface CardListProps {
  id: number
  title: string
  dashboardId: string
}

export function CardList({ id, title, dashboardId }: CardListProps) {
  const router = useRouter()
  const [columnTitle, setColumnTitle] = useState<string>(title)
  const [dragDisabled, setDragDisabled] = useState<boolean>(false)

  const [cardList, setCardList] = useRecoilState<CardInfo[] | []>(
    cardListStateAboutColumn(id),
  )

  const [cardNumCount, setCardNumCount] = useRecoilState<number>(
    countAboutCardList(id),
  )
  const [cursorId, setCursorId] = useState('')
  const [isOpenUpdateColumn, setIsOpenUpdateColumn] = useRecoilState(
    updateColumnsForColumnId(id),
  )
  const isOpenDeleteColumnState = useRecoilValue(deleteColumnsForColumnId(id))
  const target = useRef<HTMLDivElement>(null)

  const getCard = useCallback(async () => {
    const query = cursorId ? `cursorId=${cursorId}&` : ''
    const { data } = await api.get(`cards?${query}columnId=${id}`)
    setCardList((prev) => [
      ...prev,
      ...(data.cards as CardInfo[]).sort(
        (a, b) =>
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
      ),
    ])
    setCardNumCount(data.totalCount)
    setCursorId(data.cursorId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursorId])

  const openUpdateColumnModal = () => setIsOpenUpdateColumn(true)
  const onIntersect: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        getCard()
      }
    })
  }

  useInfiniteScroll({ target, onIntersect: onIntersect, size: cursorId })

  const getStyle = (
    style: DraggableProvided['draggableProps']['style'],
    snapshot: DraggableStateSnapshot,
  ) => {
    if (!snapshot.isDragging) return {}
    if (!snapshot.isDropAnimating) {
      return style
    }

    return {
      ...style,
      transitionDuration: `0.001s`,
    }
  }

  // 컬럼 제목 수정
  const onSubmit = async (title: string) => {
    try {
      await api.put(`/columns/${id}`, {
        title: title.trim(),
        columnId: id,
      })
      setColumnTitle(title)
    } catch (e: any) {
      console.error(e.message)
    } finally {
      router.refresh()
    }
  }

  const handleDragDisabled = () => {}

  useEffect(() => {
    return () => setCardList([])
  }, [setCardList])

  return (
    <div className='md:min-w-none scrollbar-hide bg-gray10 relative flex flex-1 flex-col gap-[1.0625rem] px-3 py-4 text-black dark:bg-black md:w-full md:gap-[1.5625rem] md:p-5 lg:h-full lg:flex-col lg:gap-0 lg:overflow-scroll lg:pt-0'>
      <div className='flex flex-col gap-4 bg-[#fff] dark:bg-black md:gap-6 lg:sticky lg:top-0 lg:z-10 lg:pb-4 lg:pt-5'>
        <div className='flex items-center gap-2 '>
          <span
            className={`flex h-2 w-2 items-center justify-center rounded-3xl bg-violet-500 text-[0.75rem] text-white`}
          ></span>
          <div className='dark:text-white8 flex items-center gap-3 text-[1rem] font-bold md:text-[1.125rem]'>
            <h3>{columnTitle}</h3>
            <Number num={cardNumCount} />
          </div>

          <ColumnEditButton
            initialValues={columnTitle}
            columnId={id}
            dashboardId={parseInt(dashboardId, 10)}
            onSubmit={onSubmit}
          />
        </div>
        <div className='h-[2rem] md:h-[2.5rem]'>
          <TaskCreactButton
            dashboardId={parseInt(dashboardId, 10)}
            columnId={id}
          />
        </div>
      </div>
      <div className='flex flex-col justify-center gap-[0.625rem] md:gap-4'>
        {cardList.map((card, index) => (
          <Draggable
            draggableId={card.id.toString()}
            index={index}
            key={card.id}
            isDragDisabled={dragDisabled}
          >
            {({ innerRef, draggableProps, dragHandleProps }, snapshot) => (
              <div
                ref={innerRef}
                {...draggableProps}
                style={getStyle(draggableProps.style, snapshot)}
              >
                <div {...dragHandleProps}>
                  <Card
                    id={card.id}
                    title={card.title}
                    columnId={id}
                    tags={card.tags}
                    dueDate={card.dueDate}
                    imageUrl={card.imageUrl}
                    bgColor={Colors[card.id % 5]}
                    nickname={card.assignee?.nickname}
                    profileImageUrl={card.assignee?.profileImageUrl}
                    columnTitle={title}
                    description={card.description}
                    dashboardId={parseInt(dashboardId, 10)}
                    assignee={card.assignee}
                    setDragDisabled={setDragDisabled}
                  />
                </div>
              </div>
            )}
          </Draggable>
        ))}
      </div>
      {cursorId !== null && <div className='h-4 flex-shrink-0' ref={target} />}
      {/* {isOpenUpdateColumn && <UpdateColumn columnId={id} />} */}
    </div>
  )
}
