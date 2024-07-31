'use client'

import { inviteUserToDashboard } from '@/app/action/dashboard'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from './ui/alert-dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'

type Props = {
  dashboardId: number
}

export const InviteModalContent = ({ dashboardId }: Props) => {
  const formSchema = z.object({
    email: z.string().email({
      message: '이메일 형식으로 입력해 주세요.',
    }),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const [isPending, setIsPending] = useState(false)
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsPending(true)
    try {
      const invite = await inviteUserToDashboard({ dashboardId, ...values })
      if (!invite) {
        toast.error('대시보드 초대에 실패하였습니다.')
        return
      }
      toast.success('초대에 성공했습니다.')
      form.reset()
      setIsOpen(false)
    } catch (error) {
      toast.error('초대 중 오류가 발생했습니다.')
      console.error(error)
    } finally {
      setIsPending(false)
    }
  }
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AlertDialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <AlertDialogHeader className='text-2xl font-bold'>
            초대하기
          </AlertDialogHeader>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>이메일</FormLabel>
                <FormControl>
                  <Input placeholder='test@email.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AlertDialogFooter>
            <AlertDialogCancel className='px-10 py-6'>취소</AlertDialogCancel>
            <AlertDialogAction
              disabled={!form.formState.isValid || isPending}
              className='px-10 py-6'
              type='submit'
            >
              초대
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </Form>
    </AlertDialogContent>
  )
}
