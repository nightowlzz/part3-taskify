'use client'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  commentRelatedIDs,
  commnet,
  commnetApi,
  commnetData,
} from '../types/modal-type'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { CommentView } from './commnet-write'

export const getComments = async (cardId: number) => {
  const {
    data: { comments },
  } = await api.get<commnetApi>(`/comments?cardId=${cardId}`)
  return comments
}

const FormSchema = z.object({
  commnet: z.string().min(1, {
    message: '한 글자 이상 적어주세요',
  }),
})

export const Comment = ({
  cardId,
  dashboardId,
  columnId,
}: commentRelatedIDs) => {
  const router = useRouter()
  const [comments, setComments] = useState<commnet[]>()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  // 댓글 리스트 갱신
  const fetchComments = async () => {
    const result = await getComments(cardId)
    setComments(result)
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const requestData: commnetData = {
      content: data.commnet.trim(),
      cardId: cardId,
      columnId: columnId,
      dashboardId: dashboardId,
    }
    try {
      api.post('/comments', { ...requestData }).then((res) => {
        toast.success('댓글을 작성하였습니다.')
        form.reset()
        fetchComments()
      })
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.message) {
        toast.error(e.response.data.message)
      } else {
        toast.error('전송 실패')
      }
    } finally {
      router.refresh()
    }
  }

  useEffect(() => {
    fetchComments()
  }, [cardId])
  return (
    <>
      {/* 댓글 입력 */}
      <div>
        <h3 className='pb-[10px] font-bold'>댓글</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='rounded-md border p-3'
          >
            <FormField
              control={form.control}
              name='commnet'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder='댓글 작성하기'
                      className='text-6 w-full resize-none border-0 p-1 placeholder:text-sm'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant={'outline'}
              className='ml-auto block h-[28px] w-[78px] py-0 font-bold text-violet-500 md:h-8'
            >
              입력
            </Button>
          </form>
        </Form>
      </div>
      <>
        {comments &&
          comments.map((comment) => (
            <CommentView
              key={comment.id}
              fetchComments={fetchComments}
              comment={comment}
            />
          ))}
      </>
    </>
  )
}
