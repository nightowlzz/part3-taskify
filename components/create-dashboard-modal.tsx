'use client'

import { createDashboard } from '@/app/action/dashboard'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
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
import { CircleColorButton } from './circle-color-button'

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: '최소 1글자 이상 입력해 주세요.',
    })
    .max(10, { message: '최대 10글자 입력해 주세요.' }),
  color: z.string(),
})

export type Colors = '#7AC555' | '#760DDE' | '#FFA500' | '#76A5EA' | '#E876EA'
const colorList: Colors[] = [
  '#7AC555',
  '#760DDE',
  '#FFA500',
  '#76A5EA',
  '#E876EA',
]

export const CreateDashboardModal = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      color: '#7AC555',
    },
  })

  const handleClick = (color: Colors) => {
    form.setValue('color', color)
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const dashboard = await createDashboard(values)
    form.reset()
    if (!dashboard) {
      toast.error('대시보드 생성에 실패하였습니다.')
      return
    }
    toast.success('대시보드를 생성하였습니다.')
  }

  return (
    <AlertDialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <AlertDialogHeader className='text-2xl font-bold'>
            새로운 대시보드
          </AlertDialogHeader>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>대시보드 이름</FormLabel>
                <FormControl>
                  <Input placeholder='뉴 프로젝트' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex space-x-2'>
            {colorList.map((color) => (
              <CircleColorButton
                key={color}
                color={color}
                onClick={() => handleClick(color)}
                isSelected={form.watch('color') === color}
              />
            ))}
          </div>
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
  )
}
