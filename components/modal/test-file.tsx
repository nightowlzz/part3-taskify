'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { boolean, z } from 'zod'
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
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'

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

const IMAGE_ADD_ICON = '/icon-purple-add.svg'

const FormSchema = z.object({
  manager: z.string().nonempty({
    message: '담당자를 선택해 주세요.',
  }), // 'manager'로 수정됨
  title: z
    .string({
      message: '제목을 입력해 주세요.',
    })
    .nonempty({
      message: '제목을 입력해 주세요.',
    }),
  text: z.string().max(300, { message: '300자 이내로 적어주세요.' }),
  endDate: z.date().min(new Date('1900-01-01')),
  tags: z.array(z.string(), { message: '하나 이상의 태그 필수 입니다.' }),
  image: z.string().optional(),
})

// 담당자
export const getUser = async (id: number) => {
  const {
    data: { members },
  } = await api.get<IMembers>(`/members?dashboardId=${id}`)

  return members
}

// 이미지 미리보기
function getImageData(e: ChangeEvent<HTMLInputElement>) {
  const url = URL.createObjectURL(e.target.files![0])
  return url
}

// tag save
function getRandomColor() {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)

  return `${r},${g},${b}`
}

const TestFile = () => {
  const [users, setUsers] = useState<IMember[]>()
  const [preview, setPreview] = useState<string>('')
  const [tagAdd, setTagAdd] = useState<string>('')
  const [tagbg, setTagbg] = useState<string>('')
  const [tagList, setTagList] = useState<string[]>()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'onBlur',
    defaultValues: {
      manager: '',
      title: '',
      text: '',
      endDate: new Date(),
      tags: [],
      image: '',
    },
  })

  // tag list
  function handleTagListSave(e: KeyboardEvent<HTMLInputElement>) {
    if (!tagAdd) return false
    if (e.key === 'Enter') {
      e.preventDefault()
      setTagList((prev) =>
        prev
          ? [...prev, `${tagAdd}-${getRandomColor()}`]
          : [`${tagAdd}-${getRandomColor()}`],
      )
      setTagAdd('')
    }
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('data당~~~~~~>>', data)
    toast.success('작성 완료')
  }

  useEffect(() => {
    const aaaaa = async () => {
      const user = await getUser(8689)
      setUsers(user)
    }
    aaaaa()
  }, [])
  if (true) return null
  return (
    <div className='px-5 pb-[100px] pt-7 md:pb-[136px] md:pt-8'>
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
                <FormMessage />
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
                    placeholder='설명을 입력해 주세요'
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
              <FormItem className='flex flex-col'>
                <FormLabel className='text-base font-bold md:text-lg'>
                  마감일 <sup>*</sup>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        type='button'
                        variant={'outline'}
                        className={cn(
                          'w-full justify-start pl-3 font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        <Image
                          className='mr-2'
                          src='/icon-calendar.svg'
                          width={20}
                          height={20}
                          alt='달력'
                        />
                        {field.value ? (
                          format(field.value, 'yyyy년 M월 d일')
                        ) : (
                          <span>날짜를 입력해 주세요.</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 태그 추가 */}
          <FormField
            control={form.control}
            name='tags'
            render={({ field }) => (
              <FormItem className='md:pt-2'>
                <FormLabel className='text-base font-bold md:text-lg'>
                  태그
                </FormLabel>
                <div className='border-1 flex min-h-12 flex-wrap items-center rounded-md border px-4 py-2'>
                  <div className='flex flex-wrap items-center  gap-2'>
                    {tagList
                      ? tagList.map((tag, i) => (
                          <Button
                            key={tag.split('-')[0] + i}
                            className={`h-auto min-h-6 text-wrap rounded p-1.5 text-left text-xs font-medium`}
                            style={{
                              backgroundColor: `rgba(${tag.split('-')[1]},0.5)`,
                            }}
                            variant={'outline'}
                          >
                            {tag.split('-')[0]}
                          </Button>
                        ))
                      : null}
                  </div>
                  <FormControl>
                    <Input
                      type='text'
                      className='h-6 max-w-[180px] border-0 outline-0'
                      value={tagAdd}
                      placeholder={
                        tagAdd.length ? '입력 후 엔터' : '태그를 입력해 주세요'
                      }
                      onChange={(e) => {
                        setTagAdd(e.target.value)
                      }}
                      onKeyDown={(e) => handleTagListSave(e)}
                    />
                  </FormControl>
                </div>
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
                      accept='.jpg,.png,.jpeg,.png,.svg'
                      className={`${style.inputFile}`}
                      {...field}
                      onChange={(e) => {
                        const url = getImageData(e)
                        setPreview(url)
                        field.onChange(e)
                      }}
                    />
                  </FormControl>
                  <FormLabel
                    htmlFor='picture'
                    className={`${style.failLabel} relative flex h-[76px] w-[76px] cursor-pointer items-center justify-center rounded-md bg-[#f5f5f5] bg-center bg-no-repeat`}
                    style={{
                      backgroundSize: preview ? '100% auto' : 'auto auto',
                      backgroundImage: preview
                        ? `url(${preview})`
                        : `url(${IMAGE_ADD_ICON})`,
                    }}
                  ></FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <button type='button'>생성</button>
        </form>
      </Form>
    </div>
  )
}

export default TestFile
