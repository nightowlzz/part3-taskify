'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Plus, Calendar as CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
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
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { TagsInput } from 'react-tag-input-component'
import { Member } from '@/type'
import { Textarea } from '@/components/ui/textarea'
import { createCard } from '@/app/action/card'
import { useRef, useState } from 'react'
import Image from 'next/image'

const formSchema = z.object({
  memberId: z.number({
    required_error: '담당자를 선택해 주세요.',
  }),
  title: z.string().min(2, {
    message: '제목은 2글자 이상입니다.',
  }),
  description: z.string().min(2, {
    message: '설명은 2글자 이상입니다.',
  }),
  date: z.date().optional(),
  tags: z.array(z.string()).optional(),
})

type Props = {
  members: Member[]
  dashboardId: number
  columnId: number
}

export const AddCardButton = ({ dashboardId, members, columnId }: Props) => {
  const [file, setFile] = useState<File | undefined>()
  const [imgUrl, setImgUrl] = useState<string | undefined>()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      memberId: members[0].userId,
      title: '',
      description: '',
      date: undefined,
      tags: [],
    },
  })

  const [date, setDate] = useState<Date | undefined>()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { memberId, description, tags, title, date } = values
    const dueDateString = date
      ? `${format(date, 'yyyy-MM-dd')} ${format(new Date(), '00:00')}`
      : undefined

    const formData = new FormData()
    if (file) {
      formData.append('image', file)
    }

    const res = await createCard({
      assigneeUserId: memberId,
      columnId,
      dashboardId,
      tags,
      title,
      description,
      formData,
      dueDate: dueDateString,
    })
    if (!res) {
      toast.error('카드 추가 중 오류가 발생했습니다.')
      return
    }
    toast.success('카드가 성공적으로 추가되었습니다.')
    form.reset()
    setFile(undefined)
    setImgUrl(undefined)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setImgUrl(URL.createObjectURL(selectedFile))
      setFile(selectedFile)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={'outline'}>
          <Plus />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <AlertDialogHeader className='text-2xl font-bold'>
              카드 추가하기
            </AlertDialogHeader>
            <FormField
              control={form.control}
              name='memberId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>담당자</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className='w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    >
                      {members.map((member) => (
                        <option key={member.id} value={member.userId}>
                          {member.nickname}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>제목</FormLabel>
                  <FormControl>
                    <Input placeholder='제목을 입력해 주세요' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>설명</FormLabel>
                  <FormControl>
                    <Textarea placeholder='설명을 입력해 주세요' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel className='font-semibold'>날짜</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !date && 'text-muted-foreground',
                    )}
                  >
                    <CalendarIcon className='mr-2 h-4 w-4' />
                    {date ? (
                      format(date, 'PPP')
                    ) : (
                      <span>날짜를 선택해 주세요</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                  <Calendar
                    mode='single'
                    selected={date}
                    onSelect={(selectedDate) => {
                      setDate(selectedDate || undefined)
                      form.setValue('date', selectedDate || undefined)
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
            <FormField
              control={form.control}
              name='tags'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold'>태그</FormLabel>
                  <FormControl>
                    <TagsInput
                      value={field.value}
                      onChange={field.onChange}
                      name='tags'
                      placeHolder='태그를 추가하세요'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {imgUrl ? (
              <Image
                src={imgUrl}
                alt='userImg'
                width={160}
                height={160}
                sizes='100vw 50vw'
                className='aspect-square cursor-pointer rounded-md object-cover transition-all hover:brightness-75'
                onClick={() => fileInputRef.current?.click()}
              />
            ) : (
              <Button
                type='button'
                className='h-40 w-40 rounded-md bg-stone-200 hover:bg-stone-300'
                onClick={() => fileInputRef.current?.click()}
              >
                <Plus className='h-8 w-8 text-black' />
              </Button>
            )}
            <Input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              className='hidden'
            />
            <AlertDialogFooter>
              <AlertDialogCancel className='px-10 py-6'>취소</AlertDialogCancel>
              <AlertDialogAction
                disabled={!form.formState.isValid}
                className='px-10 py-6'
                type='submit'
              >
                추가
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
