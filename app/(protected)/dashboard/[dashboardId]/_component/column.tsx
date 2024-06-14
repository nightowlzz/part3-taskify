import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Settings } from 'lucide-react'
import { AddCardButton } from './add-card-button'
import { Member } from '@/type'
import { ColumnCard } from './column-card'
import { getCards } from '@/app/data/card'

type Props = {
  dashboardId: number
  members: Member[]
  columnId: number
  isFirst: boolean
  title: string
}

export const Column = async ({
  dashboardId,
  columnId,
  members,
  isFirst,
  title,
}: Props) => {
  const cardRes = await getCards(columnId)
  if (!cardRes) return <div>카드 패치 실패</div>

  return (
    <div
      className={cn(
        'flex flex-col gap-y-4 px-3 pt-5 md:w-[350px]',
        !isFirst && 'border-l',
      )}
    >
      <div className='flex items-center justify-between'>
        <h2>{title}</h2>
        <Button variant={'ghost'} size={'sm'}>
          <Settings className='text-gray-400' />
        </Button>
      </div>
      <AddCardButton
        members={members}
        dashboardId={dashboardId}
        columnId={columnId}
      />
      {cardRes.cards.map((card) => (
        <ColumnCard
          key={card.id}
          cardId={card.id}
          columnId={columnId}
          dashboardId={dashboardId}
          title={card.title}
          tags={card.tags}
          dueDate={card.dueDate}
          profileImageUrl={card.assignee.profileImageUrl}
          firstName={card.assignee.nickname[0]}
        />
      ))}
    </div>
  )
}
