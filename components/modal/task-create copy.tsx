'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ModalHead } from './_component/modal-head'

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { api, cn } from '@/lib/utils'
import { format } from 'date-fns'
import Image from 'next/image'
import { toast } from 'sonner'
import style from './modal.module.css'
import { useEffect, useState } from 'react'

interface IMember {
  id: number
  email: string
  nickname: string
  profileImageUrl: string
  createdAt: string
  updatedAt: string
}

interface IMembers {
  members: IMember[]
  totalCount: number
}

interface ITaskCreate {
  id: number
  title: string
  description: string
  tags: [string]
  dueDate: string
  assignee: {
    profileImageUrl: string
    nickname: string
    id: number
  }
  imageUrl: string
  teamId: string
  columnId: number
  createdAt: string
  updatedAt: string
}

const FormSchema = z.object({
  manager: z.string({
    required_error: '담당자를 선택해 주세요.',
  }), // 'manager'로 수정됨
  title: z.string({
    required_error: '제목을 입력해 주세요.',
  }),
  text: z
    .string()
    .min(10, { message: '최소 10자 적어주세요.' })
    .max(300, { message: '300자 이내로 적어주세요.' }),
  endDate: z.date().max(new Date()),
  tags: z
    .array(z.string())
    .nonempty({ message: '최소 1개의 태그를 입력해야 합니다.' }),
  image: z.string().nonempty({ message: '이미지 첨부는 필수입니다.' }),
})

export const getUser = async (id: number) => {
  const {
    data: { members },
  } = await api.get<IMembers>(`/members?dashboardId=${id}`)

  return members
}

const TaskCardCreate = () => {
  const [users, setUsers] = useState<IMember[]>()
  const form = useForm<z.infer<typeof FormSchema>>({
    mode: 'onChange',
    defaultValues: {
      manager: '',
      title: '',
      text: '',
      endDate: new Date(),
      tags: [],
      image: '',
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // if (!data) {
    //   toast.success('작성해 주세요.')
    //   return
    // }
    console.log('data당~~~~~~>>', data)
    // toast.success('작성 완료')
  }

  useEffect(() => {
    const aaaaa = async () => {
      const user = await getUser(8689)
      setUsers(user)
    }
    aaaaa()
  }, [])

  console.log('getUser')
  return (
    <AlertDialogContent className='block h-[90vh] max-w-[506px] md:max-h-[80vh]'>
      <ScrollArea className='h-full w-full'>
        <div className='px-5 pb-[100px] pt-7 md:pb-[136px] md:pt-8'>
          <ModalHead>할 일 생성</ModalHead>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='w-full space-y-6'
            >
              {/* 담당자 */}
              <FormField
                control={form.control}
                name='manager'
                render={({ field }) => (
                  <FormItem className='w-[218px] flex-1'>
                    <FormLabel className='text-base font-bold md:text-lg'>
                      담당자
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='이름을 입력해 주세요' />
                        </SelectTrigger>
                      </FormControl>
                      {/* server component */}
                      <SelectContent>
                        {users?.map((user) => (
                          <SelectItem key={user.id} value={`${user.id}`}>
                            <div className='flex items-center'>
                              <Avatar className='mr-2'>
                                <AvatarImage src={user.profileImageUrl} />
                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                              <span className='text-sm'>{user.nickname}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              {/* 제목 */}
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem className='md:pt-2'>
                    <FormLabel className='text-base font-bold md:text-lg'>
                      제목 <sup className='text-ms text-[#5534DA]'>*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='제목을 입력해 주세요' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* 설명 */}
              <FormField
                control={form.control}
                name='text'
                render={({ field }) => (
                  <FormItem className='md:pt-2'>
                    <FormLabel className='text-base font-bold md:text-lg'>
                      설명 <sup>*</sup>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Tell us a little bit about yourself'
                        className='resize-none'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* 마감일 */}
              <FormField
                control={form.control}
                name='endDate'
                render={({ field }) => (
                  <FormItem className='flex flex-col md:pt-2'>
                    <FormLabel className='text-base font-bold md:text-lg'>
                      마감일
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full justify-start pl-3 font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            <Image
                              src='/icon-calendar.svg'
                              width={20}
                              height={20}
                              alt='달력'
                            />
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>날짜를 입력해 주세요</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='p-0' align='start'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* 태그 추가 */}
              {/* 태그 라이브러리 찾기 */}
              <FormField
                control={form.control}
                name='tags'
                render={({ field }) => (
                  <FormItem className='md:pt-2'>
                    <FormLabel className='text-base font-bold md:text-lg'>
                      태그
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='shadcn' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* 이미지 추가 */}
              <FormField
                control={form.control}
                name='image'
                render={({ field }) => (
                  <FormItem className='md:pt-2'>
                    <FormLabel className='text-base font-bold md:text-lg'>
                      이미지
                    </FormLabel>
                    <div className='flex'>
                      <FormControl>
                        <Input
                          id='picture'
                          type='file'
                          className={`${style.inputFile}`}
                          {...field}
                        />
                      </FormControl>
                      <FormLabel
                        htmlFor='picture'
                        className={`${style.failLabel} relative flex h-[76px] w-[76px] items-center justify-center rounded-md bg-[#f5f5f5]`}
                      >
                        {/* 이미지 없을때 */}
                        <Image
                          src={`/icon-purple-add.svg`}
                          alt='추가'
                          width={28}
                          height={28}
                        />
                        {/* 이미지 있을때 */}
                        {/* <Image fill src={`/logo.png`} alt='추가' /> */}
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialogFooter className='absolute bottom-0 left-0 flex w-full gap-3 bg-white px-5 pb-7 pt-6 md:justify-end md:p-7'>
                <AlertDialogCancel className='h-10 w-full border-gray_dark3 md:h-12 md:w-[120px]'>
                  취소
                </AlertDialogCancel>
                {/* <AlertDialogAction
                  type='submit'
                  className='h-10 w-full bg-violet md:h-12 md:w-[120px]'
                >
                  생성
                </AlertDialogAction> */}
                <button type='submit'>생성</button>
              </AlertDialogFooter>
            </form>
          </Form>
        </div>
      </ScrollArea>
    </AlertDialogContent>
  )
}

export default TaskCardCreate
