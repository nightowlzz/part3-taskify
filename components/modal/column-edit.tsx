'use client'

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
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
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { ModalHead } from './_component/modal-head'

const FormSchema = z.object({
  column: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})

export const ColumnEdit = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      column: '',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.success('작성 완료')
  }
  return (
    <AlertDialogContent>
      <div className='px-5 py-7 md:py-8'>
        <ModalHead>컬럼 관리</ModalHead>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
            <FormField
              control={form.control}
              name='column'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-base font-medium md:text-lg'>
                    이름
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='shadcn' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter className='flex-col items-start justify-start pt-6 md:flex-row md:items-end md:justify-between md:pt-7'>
              <Button
                variant='underline'
                className='mb-4 h-5 p-0 leading-none md:mb-0'
              >
                삭제하기
              </Button>
              <div className='flex w-full items-end justify-end gap-3'>
                <AlertDialogCancel className='h-10 w-full border-gray_dark3 md:h-12 md:w-[120px]'>
                  취소
                </AlertDialogCancel>
                <AlertDialogAction className='h-10 w-full bg-violet md:h-12 md:w-[120px]'>
                  변경
                </AlertDialogAction>
              </div>
            </AlertDialogFooter>
          </form>
        </Form>
      </div>
    </AlertDialogContent>
  )
}
