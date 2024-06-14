'use client'
import { Column as ColumnType, Member } from '@/type'
import { Column } from './column'

type Props = {
  columns: ColumnType[]
  members: Member[]
  dashboardId: number
}

export const ColumnList = ({ columns, members, dashboardId }: Props) => {
  return (
    <div className='flex h-full flex-col bg-stone-100 md:flex-row'>
      {columns.map((column, index) => (
        <Column
          key={column.id}
          members={members}
          dashboardId={dashboardId}
          columnId={column.id}
          isFirst={index === 0}
          title={column.title}
        />
      ))}
    </div>
  )
}
