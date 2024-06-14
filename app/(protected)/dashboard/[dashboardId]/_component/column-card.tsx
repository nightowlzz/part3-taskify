import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Calendar } from 'lucide-react'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { CardModalContent } from './card-modal-content'
import { getCardById } from '@/app/data/card'
import { getComments } from '@/app/data/comment'
import { formatDate } from '@/lib/utils'
import { CategoryTag } from '@/components/category-tag'
import Image from 'next/image'
import { getDashboardMembers } from '@/app/data/dashboard'

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
  const members = await getDashboardMembers(dashboardId)
  if (!card) return
  if (!members) return
  if (!comment) return

  return (
    <Dialog>
      <DialogTrigger>
        <div className='cursor-pointer space-y-4 rounded-lg border bg-white p-6 text-start transition hover:bg-slate-50'>
          {card.imageUrl && (
            <div className='relative aspect-video h-40 rounded-md'>
              <Image
                src={card.imageUrl}
                alt={'card'}
                fill
                className='rounded-md object-cover'
              />
            </div>
          )}
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
        card={card}
        columnId={columnId}
        dashboardId={dashboardId}
        comments={comment.comments}
        members={members.members}
      />
    </Dialog>
  )
}
