'use client'

import { deleteColumn, editColumn } from '@/app/action/column'
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
import { Settings } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  columnId: number
  title: string
}

export const EditColumnButton = ({ columnId, title }: Props) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const formSchema = z.object({
    title: z.string().min(2, {
      message: '최소 2글자 이상 입력해 주세요.',
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await editColumn({ columnId, title: values.title })
    if (!res) {
      toast.error('에러밸')
      return
    }
    form.reset()
    toast.success('성공')
  }

  const onDelete = async () => {
    const res = await deleteColumn(columnId)
    if (!res) {
      toast.error('에러밸')
      return
    }
    form.reset()
    setOpenDeleteModal(false)
    toast.success('성공')
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={'ghost'} size={'sm'}>
          <Settings className='text-gray-400' />
        </Button>
      </AlertDialogTrigger>
      {openDeleteModal ? (
        <AlertDialogContent>
          <AlertDialogHeader>
            <span className='text-2xl font-bold'>정말로 삭제하시겠습니까?</span>
          </AlertDialogHeader>
          <AlertDialogFooter className='mt-10'>
            <Button
              onClick={() => setOpenDeleteModal(false)}
              size={'lg'}
              variant={'secondary'}
            >
              취소
            </Button>
            <Button
              onClick={onDelete}
              size={'lg'}
              variant={'destructive'}
              asChild
            >
              <AlertDialogCancel>삭제</AlertDialogCancel>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      ) : (
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
                <AlertDialogCancel className='px-10 py-6'>
                  취소
                </AlertDialogCancel>
                <AlertDialogAction
                  disabled={!form.formState.isValid}
                  className='px-10 py-6'
                  type='submit'
                >
                  수정
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </Form>
          <Button
            onClick={() => setOpenDeleteModal(true)}
            className='absolute bottom-5 left-5 text-muted-foreground'
            variant={'link'}
          >
            삭제하기
          </Button>
        </AlertDialogContent>
      )}
    </AlertDialog>
  )
}
