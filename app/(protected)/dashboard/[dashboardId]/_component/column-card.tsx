import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Calendar } from 'lucide-react'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { CardModalContent } from './card-modal-content'
import { getCardById } from '@/app/data/card'
import { getComments } from '@/app/data/comment'
import { formatDate } from '@/lib/utils'
import { CategoryTag } from '@/components/category-tag'

type Props = {
  cardId: number
  title: string
  tags: string[]
  dueDate: string
  profileImageUrl: string
  firstName: string
  dashboardId: number
  columnId: number
}

export const ColumnCard = async ({
  cardId,
  title,
  tags,
  dueDate,
  profileImageUrl,
  firstName,
  dashboardId,
  columnId,
}: Props) => {
  const card = await getCardById({ cardId })
  const comment = await getComments({ cardId })
  if (!card) return

  return (
    <Dialog>
      <DialogTrigger>
        <div className='cursor-pointer space-y-4 rounded-lg border bg-white p-6 text-start transition hover:bg-slate-50'>
          <h2 className='truncate text-xl font-semibold'>{title}</h2>
          <div className='flex flex-wrap gap-x-2 gap-y-2'>
            {tags.map((tag) => (
              <CategoryTag key={tag} text={tag} />
            ))}
          </div>
          <div className='flex justify-between'>
            <div className='flex items-center gap-x-2 text-sm'>
              <Calendar className='h-5 w-5 text-gray-500' />
              <span>{formatDate(dueDate)}</span>
            </div>
            <Avatar>
              <AvatarImage src={profileImageUrl} />
              <AvatarFallback>{firstName}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </DialogTrigger>
      <CardModalContent
        tags={card.tags}
        cardId={card.id}
        columnId={columnId}
        dashboardId={dashboardId}
        title={card.title}
        description={card.description}
        firstName={card.assignee.nickname[0]}
        nickname={card.assignee.nickname}
        dueDate={card.dueDate}
        comments={comment?.comments}
      />
    </Dialog>
  )
}
