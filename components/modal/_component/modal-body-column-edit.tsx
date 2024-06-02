'use client'
import {
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ModalFoot } from './modal-foot'
import { ModalHead } from './modal-head'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import Modal, { modalType } from '../modal-layout'
import { Alert } from './modal-body-alert'

const FormSchema = z.object({
  column: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})

export const ColumnEdit = ({ confirmText }: modalType) => {
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
    <DialogContent>
      <div className='px-7 py-7 md:py-8'>
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
            <DialogFooter
              className={`flex-col items-start justify-start justify-end pt-6 md:flex-row md:items-end md:pt-7`}
            >
              <Button
                variant='underline'
                className='mb-4 h-5 p-0 leading-none md:mb-0'
              >
                삭제하기
              </Button>
              <div className={`flex w-full justify-end gap-3`}>
                <DialogTrigger asChild>
                  <Button
                    type='button'
                    variant={'outline'}
                    className='h-12 w-full md:max-w-[120px]'
                  >
                    취소
                  </Button>
                </DialogTrigger>
                <DialogTrigger asChild>
                  <Button
                    type='button'
                    className='h-12 w-full bg-[#5534DA] md:max-w-[120px]'
                  >
                    변경
                  </Button>
                </DialogTrigger>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </div>
    </DialogContent>
  )
}
