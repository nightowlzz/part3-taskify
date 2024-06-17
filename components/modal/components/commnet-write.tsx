'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { api } from '@/lib/utils'
import { Fragment, useState } from 'react'
import { toast } from 'sonner'
import { commnet } from '../types/modal-type'

const editFormSchema = z.object({
  commentEdit: z.string().min(1, {
    message: '한 글자 이상 적어주세요',
  }),
})

export const CommentView = ({
  comment,
  fetchComments,
}: {
  comment: commnet
  fetchComments: () => void
}) => {
  const [isCommentVisible, setIsCommentVisible] = useState(true)
  const editForm = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      commentEdit: comment.content,
    },
  })

  function onSubmit(data: z.infer<typeof editFormSchema>) {
    try {
      api
        .put(`/comments/${comment.id}`, { content: data.commentEdit })
        .then((res) => editForm.setValue('commentEdit', res.data.content))
      fetchComments()
      toast.success('수정 되었습니다.')
      setIsCommentVisible(true)
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.message) {
        toast.error(e.response.data.message)
      } else {
        toast.error('수정하기 실패')
      }
      console.error(e.message)
    }
  }

  function onDelete() {
    try {
      api.delete(`/comments/${comment.id}`)
      fetchComments()
      toast.success('삭제 되었습니다.')
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.message) {
        toast.error(e.response.data.message)
      } else {
        toast.error('삭제하기 실패')
      }
      console.error(e.message)
    }
  }
  return (
    <>
      <Fragment>
        <div key={comment.id} className='pt-5'>
          <div className='flex items-center gap-[10px]'>
            <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>{comment.author.nickname[0]}</AvatarFallback>
            </Avatar>
            <div className='flex gap-2 pb-1 pt-2'>
              <strong className='text-sm font-bold'>
                {comment.author.nickname}
              </strong>
              <span className='text=[#9FA6B2] text-xs'>
                {comment.createdAt}
              </span>
            </div>
          </div>
          <div className='pl-[34px] md:pl-[43px]'>
            {isCommentVisible ? (
              <>
                <div className='pb-2.5 text-sm'>{comment.content}</div>
                <div className='flex gap-2.5'>
                  <Button
                    variant={'underline'}
                    className='h-auto p-0'
                    onClick={() => setIsCommentVisible(false)}
                  >
                    수정
                  </Button>
                  <Button
                    variant={'underline'}
                    className='h-auto p-0'
                    onClick={onDelete}
                  >
                    삭제
                  </Button>
                </div>
              </>
            ) : (
              <Form {...editForm}>
                <form
                  onSubmit={editForm.handleSubmit(onSubmit)}
                  className='mt-2 rounded-md border p-3'
                >
                  <FormField
                    control={editForm.control}
                    name='commentEdit'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder='댓글 작성하기'
                            className='text-6 h-[50px] w-full resize-none border-0 p-1 placeholder:text-sm'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='flex items-center justify-end gap-2'>
                    <Button
                      variant={'outline'}
                      className='block h-5 w-[78px] py-0 font-bold text-violet-500 md:h-7'
                      onClick={() => setIsCommentVisible(true)}
                    >
                      취소
                    </Button>
                    <Button
                      variant={'outline'}
                      className='block h-5 w-[78px] py-0 font-bold text-violet-500 md:h-7'
                    >
                      입력
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </div>
      </Fragment>
    </>
  )
}
