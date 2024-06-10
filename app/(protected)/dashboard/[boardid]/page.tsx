'use client'
import { CardList } from './_components/card-list'
import AddColumn from './_components/add-column-button'
import CreateColumn from './_components/create-column'
import useDragCardEnd from './_hook/useDragEnd'
import { createColumnState } from './_components/modal/modal-atom'
import { columnState, dashboardIdState } from './_recoil/todo'
import { api } from '@/lib/utils'
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState, WheelEvent } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

export default function DashboardId({
  params,
}: {
  params: { boardid: string }
}) {
  const [columns, setColumns] = useRecoilState(columnState)
  const setDashBoardId = useSetRecoilState(dashboardIdState)
  const [isOpenCreateColumn, setIsOpenCreateColumn] =
    useRecoilState(createColumnState)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  const getData = async () => {
    setLoading(true)
    try {
      const { data } = await api.get(`columns?dashboardId=${params.boardid}`)
      setColumns(data.data)
      setDashBoardId(params.boardid)
    } catch (error) {
      console.error('Failed to fetch columns:', error)
    } finally {
      setLoading(false)
    }
  }

  const openCreateColumn = () => {
    setIsOpenCreateColumn(true)
  }

  const handleOnDragEnd = useDragCardEnd()

  const handleScroll = (e: WheelEvent): void => {
    const el = scrollRef.current
    const { deltaY } = e
    if (el) {
      if (deltaY === 0) return
      e.preventDefault()
      el.scrollTo({
        left: el.scrollLeft + deltaY,
        behavior: 'auto',
      })
    }
  }

  useEffect(() => {
    getData()
  }, [params.boardid, setColumns]) // Add setColumns to dependencies to re-fetch data when it changes

  return (
    <>
      <div
        className='scrollbar-hide flex w-full flex-col overflow-x-auto pt-[4.3125rem] dark:bg-black lg:h-screen lg:flex-row'
        ref={scrollRef}
        onWheel={handleScroll}
      >
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {columns.map((column) => (
            <Droppable key={column.id} droppableId={column.id.toString()}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`${
                    snapshot.isDraggingOver
                      ? 'bg-violet8'
                      : 'bg-gray10 dark:bg-black'
                  } border-gray-20 bg-gray10 dark:border-black80 flex flex-col border-b lg:h-full lg:min-w-[22.125rem] lg:flex-col lg:border-b-0 lg:border-r`}
                >
                  <CardList
                    key={column.id + 'col'}
                    id={column.id}
                    title={column.title}
                    dashboardId={params.boardid}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
        {loading ? (
          <></>
        ) : (
          <div className='border-gray-20 bg-gray10 dark:border-black80 flex w-full flex-col gap-[1.0625rem] border-b px-3 py-4 dark:bg-black md:gap-[1.5625rem] md:p-5 lg:flex-col lg:pt-[4.5rem]'>
            <div className='h-[3.75rem] md:h-[4.375rem] lg:w-[22.125rem]'>
              <AddColumn onClick={openCreateColumn} />
            </div>
          </div>
        )}
      </div>
      {isOpenCreateColumn && (
        <CreateColumn dashboardId={Number(params.boardid)} onUpdate={getData} />
      )}
    </>
  )
}
