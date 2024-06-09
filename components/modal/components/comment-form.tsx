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
import { api } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
interface commnet {
  columnId: number
  dashboardId: number
  cardId: number
}

interface commnetData extends commnet {
  content: string
}

const FormSchema = z.object({
  commnet: z.string().min(1, {
    message: '한 글자 이상 적어주세요',
  }),
})

export const CommentForm = ({ columnId, dashboardId, cardId }: commnet) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('data', data)
    const requestData: commnetData = {
      content: data.commnet.trim(),
      cardId: cardId,
      columnId: columnId,
      dashboardId: dashboardId,
    }
    try {
      const res = api.post('/comments', { ...requestData })
      console.log('res', res)
      toast.error('댓글을 작성하였습니다.')
      form.reset()
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.message) {
      } else {
        toast.error('전송 실패')
      }
    } finally {
      router.refresh()
    }
  }
  return (
    <>
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
              className='ml-auto block h-[28px] w-[78px] py-0 font-bold text-violet md:h-8'
            >
              입력
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}
