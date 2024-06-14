'use client'

import { createColumn } from '@/app/action/column'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  dashboardId: number
}

export const AddColumnButton = ({ dashboardId }: Props) => {
  const formSchema = z.object({
    title: z.string().min(2, {
      message: '최소 2글자 이상 입력해 주세요.',
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await createColumn({ dashboardId, ...values })
    if (!res) {
      toast.error('에러밸')
      return
    }
    toast.success('성공')
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={'outline'}
          size={'lg'}
          className='fixed bottom-10 right-10 shadow-lg'
        >
          <span>새로운 컬럼 추가하기</span>
          <Plus />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <AlertDialogHeader className='text-2xl font-bold'>
              새 컬럼 생성
            </AlertDialogHeader>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>이름</FormLabel>
                  <FormControl>
                    <Input placeholder='새로운 프로젝트' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <AlertDialogCancel className='px-10 py-6'>취소</AlertDialogCancel>
              <AlertDialogAction
                disabled={!form.formState.isValid}
                className='px-10 py-6'
                type='submit'
              >
                생성
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
