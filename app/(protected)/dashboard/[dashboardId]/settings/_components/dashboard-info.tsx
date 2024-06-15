'use client'

import { z } from 'zod'

import { CircleColorButton } from '@/components/circle-color-button'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { updateDashboardDetails } from '@/app/action/dashboard'

type Props = {
  id: number
  title: string
  selectedColor: string
}

const formSchema = z.object({
  title: z.string().min(2, {
    message: '최소 1글자 이상 입력해 주세요.',
  }),
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

export const DashboardInfo = ({ id, title, selectedColor }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
      color: selectedColor,
    },
  })

  const handleClick = (color: string) => {
    form.setValue('color', color)
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const dashboard = await updateDashboardDetails({ id, ...values })
    if (!dashboard) {
      toast.error('대시보드 업데이트에 실패하였습니다.')
      return
    }
    toast.success('대시보드를 업데이트 했습니다.')
  }

  return (
    <div className='rounded-lg bg-white p-8'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='flex justify-between'>
            <h1 className='text-xl font-bold'>{title}</h1>
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
          </div>
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
          <div className='flex justify-end'>
            <Button type='submit' className='px-8'>
              변경
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
