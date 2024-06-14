'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { EllipsisVerticalIcon, X } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import {
  createComment,
  deleteComment,
  updateComment,
} from '@/app/action/comment'
import { toast } from 'sonner'
import { Assignee, CardIdModel, Comment, Member } from '@/type'
import { formatDate } from '@/lib/utils'
import { useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { deleteCard } from '@/app/action/card'
import { CategoryTag } from '@/components/category-tag'
import Image from 'next/image'
import { EditColumnModalContent } from './edit-card-modal-content'
import { useRouter } from 'next/navigation'

type Props = {
  card: CardIdModel
  dashboardId: number
  columnId: number
  comments: Comment[]
  members: Member[]
}

const FormSchema = z.object({
  content: z
    .string()
    .min(1, {
      message: 'Bio must be at least 10 characters.',
    })
    .max(160, {
      message: 'Bio must not be longer than 30 characters.',
    }),
})

export const CardModalContent = ({
  card,
  dashboardId,
  columnId,
  members,
  comments,
}: Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { content: '' },
  })
  const router = useRouter()

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null)
  const [editContent, setEditContent] = useState<string>('')
  const [contentType, setContentType] = useState<'type1' | 'type2'>('type1')

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const res = await createComment({
      cardId: card.id,
      dashboardId,
      columnId,
      content: data.content,
    })
    if (!res) {
      toast.error('에러발생')
      return
    }
    form.reset()
    toast.success('성공')
  }

  const handleEdit = async (commentId: number) => {
    const res = await updateComment({ commentId, content: editContent })
    if (!res) {
      toast.error('에러발생')
      return
    }
    setEditingCommentId(null)
    toast.success('수정 성공')
  }

  const handleDelete = async (commentId: number) => {
    const res = await deleteComment({ commentId })
    if (!res) {
      // toast.error('에러발생')
      return
    }
    router.refresh()
    toast.success('삭제 성공')
  }

  const deleteCard123 = async () => {
    const res = await deleteCard({ cardId: card.id })
    router.refresh()
    if (!res) {
      // toast.error('에러발생')
      return
    }
    toast.success('삭제 성공')
  }
  if (contentType === 'type1')
    return (
      <DialogContent className='min-w-full lg:min-w-[800px]'>
        <DialogHeader>
          <DialogTitle className='flex justify-between'>
            <span className='text-2xl'>새로운 일정 관리 Taskify</span>
            <div className='flex gap-x-3'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={'ghost'} size={'icon'}>
                    <EllipsisVerticalIcon className='h-8 w-8' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setContentType('type2')}>
                    수정하기
                  </DropdownMenuItem>
                  <DialogClose asChild>
                    <DropdownMenuItem onClick={deleteCard123}>
                      삭제하기
                    </DropdownMenuItem>
                  </DialogClose>
                </DropdownMenuContent>
              </DropdownMenu>

              <DialogClose asChild>
                <Button variant={'ghost'} size={'icon'}>
                  <X className='h-8 w-8' />
                </Button>
              </DialogClose>
            </div>
          </DialogTitle>
          <div className='flex'>
            <div className='mr-4 flex-1'>
              <div className='flex'>
                <Badge variant={'secondary'} className='rounded-full'>
                  <div className='mr-1 rounded-full bg-black p-1' />{' '}
                  {card.title}
                </Badge>
                <div className='mx-5 border-r' />
                <div className='flex flex-wrap gap-x-2 gap-y-2'>
                  {card.tags.map((tag, index) => (
                    <CategoryTag key={index} text={tag} />
                  ))}
                </div>
              </div>
              <div>{card.description}</div>
              {card.imageUrl && (
                <div className='relative aspect-video w-full rounded-md'>
                  <Image
                    src={card.imageUrl}
                    alt={'card'}
                    fill
                    className='rounded-md object-cover'
                  />
                </div>
              )}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='relative w-full '
                >
                  <FormField
                    control={form.control}
                    name='content'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>댓글</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='댓글을 입력해 주세요.(최소 1글자 최대 160글자)'
                            className='min-h-40 resize-none'
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button
                    type='submit'
                    variant={'outline'}
                    className='absolute bottom-3 right-3'
                    disabled={!form.formState.isValid}
                  >
                    Submit
                  </Button>
                </form>
              </Form>
            </div>
            <div className='w-[200px] space-y-3 rounded-lg border p-4'>
              <div>담당자</div>
              <div className='flex items-center gap-x-2'>
                <Avatar>
                  <AvatarImage src={card.assignee.profileImageUrl} />
                  <AvatarFallback>{card.assignee.nickname[0]}</AvatarFallback>
                </Avatar>
                <span>{card.assignee.nickname}</span>
              </div>
              <div>마감일</div>
              <div>{card.dueDate}</div>
            </div>
          </div>
          <div className='h-[300px] space-y-3 overflow-auto'>
            {comments.map((comment) => (
              <div key={comment.id} className='flex gap-x-3'>
                <div className='flex gap-x-2'>
                  <Avatar>
                    <AvatarImage src={comment.author.profileImageUrl} />
                    <AvatarFallback>
                      {comment.author.nickname[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className='flex flex-col'>
                  {editingCommentId === comment.id ? (
                    <>
                      <Textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className='min-h-40 resize-none'
                      />
                      <Button onClick={() => handleEdit(comment.id)}>
                        수정하기
                      </Button>
                      <Button
                        variant='ghost'
                        onClick={() => setEditingCommentId(null)}
                      >
                        취소
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className='flex items-center gap-x-2'>
                        <span className='font-bold'>
                          {comment.author.nickname}
                        </span>
                        <span className='text-sm text-muted-foreground'>
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      <p className='whitespace-pre'>{comment.content}</p>
                      <div className='mt-3 space-x-2 text-xs text-muted-foreground underline'>
                        <button
                          onClick={() => {
                            setEditingCommentId(comment.id)
                            setEditContent(comment.content)
                          }}
                        >
                          수정
                        </button>
                        <button onClick={() => handleDelete(comment.id)}>
                          삭제
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </DialogHeader>
      </DialogContent>
    )

  if (contentType === 'type2') {
    return (
      <EditColumnModalContent
        assignee={card.assignee}
        columnId={columnId}
        cardId={card.id}
        date={card.dueDate}
        tags={card.tags}
        description={card.description}
        title={card.title}
        members={members}
        onClose={() => setContentType('type1')}
        imgUrl={card.imageUrl}
      />
    )
  }
}
