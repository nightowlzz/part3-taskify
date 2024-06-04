'use client'
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog'
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

export const ColumnAdd = () => {
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
        <ModalHead>새 컬럼 생성</ModalHead>
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
            <AlertDialogFooter className='flex w-full gap-3 bg-white pt-6 md:justify-end md:pt-7'>
              <AlertDialogCancel className='h-10 w-full border-gray_dark3 md:h-12 md:w-[120px]'>
                취소
              </AlertDialogCancel>
              <AlertDialogAction className='h-10 w-full bg-violet md:h-12 md:w-[120px]'>
                수정
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </div>
    </AlertDialogContent>
  )
}
