'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
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
import { useRouter } from 'next/navigation'
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { ITaskCreateOpen } from './modal/modal-type'
import styled from '@/components/modal/modal.module.css'
import { ModalHead } from './modal/modal-head'
import { useRecoilState } from 'recoil'
import { createTaskState } from './modal/modal-atom'

const IMAGE_ADD_ICON = '/icon-purple-add.svg'

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

const FormSchema = z.object({
  manager: z.string(),
  title: z.string().nonempty({
    message: '제목을 입력해 주세요',
  }),
  desc: z
    .string()
    .min(3, { message: '5자 이상 작성해 주세요' })
    .max(300, { message: '300자 이내로 적어주세요' }),
  dueDate: z.date().min(new Date('1900-01-01')),
  tags: z.array(z.string(), { message: '하나 이상의 태그 필수 입니다' }),
  image: z.string().optional(),
})

// 맴버들
export const getUsers = async (id: number) => {
  const {
    data: { members },
  } = await api.get<IMembers>(`/members?dashboardId=${id}`)

  return members
}

// tag save
const getRandomColor = () => {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)

  return `${r},${g},${b}`
}

const CreateTask = ({ dashboardId, columnId }: ITaskCreateOpen) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useRecoilState(createTaskState)
  const [users, setUsers] = useState<IMember[]>()
  const [imageFile, setImageFile] = useState<File | undefined>()
  const [preview, setPreview] = useState<string | null>(null)
  const [tagAdd, setTagAdd] = useState<string>('')
  const [tagList, setTagList] = useState<string[]>()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'onBlur',
    defaultValues: {
      manager: '',
      title: '',
      desc: '',
      dueDate: new Date(),
      tags: [],
      image: '',
    },
  })

  const handleTagAdd = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!tagAdd) return

    if (e.key === 'Enter') {
      e.preventDefault()
      const newTag = `${tagAdd}-#${getRandomColor()}`

      setTagList((prev) => (prev ? [...prev, newTag] : [newTag]))
      form.setValue('tags', [...form.getValues('tags'), newTag])
      setTagAdd('')
    }
  }

  const handleTagChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setTagAdd(value)
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      const image = URL.createObjectURL(selectedFile)
      setPreview(image)
      setImageFile(selectedFile)
    }
  }

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const formData = new FormData()
    if (imageFile) formData.append('image', imageFile)

    const assigneeUserId = Number(data.manager)
    const dueDateFormatted = format(data.dueDate, 'yyyy-MM-dd HH:mm')

    const requestData = {
      dashboardId,
      columnId,
      title: data.title,
      description: data.desc,
      dueDate: dueDateFormatted,
      tags: data.tags,
    }

    try {
      if (imageFile) {
        const image = await api.post(
          `/columns/${columnId}/card-image`,
          formData,
        )
        await api.post(`/cards`, { ...image.data, ...requestData })
      } else {
        await api.post(`/cards`, { ...requestData })
      }
      setIsOpen(false)
      form.reset()
      toast.success('전송 완료')
      router.refresh()
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.message) {
        toast.error(e.response.data.message)
      } else {
        toast.error('전송 실패')
      }
    } finally {
      setTagList([])
      setPreview(null)
    }
  }

  useEffect(() => {
    const getMembers = async () => {
      const user = await getUsers(dashboardId)
      setUsers(user)
    }
    getMembers()
  }, [dashboardId])

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
                      제목 <sup className='text-ms text-violet-500'>*</sup>
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
                name='desc'
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
                name='dueDate'
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
                              format(field.value, 'yyyy년 M월 d일 hh:mm')
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
                    <div className='border-1 flex min-h-12 flex-wrap items-center gap-2 rounded-md border px-2 py-2'>
                      <div className='flex flex-wrap items-center gap-2'>
                        {tagList
                          ? tagList.map((tag, i) => (
                              <Button
                                key={tag.split('-#')[0] + i}
                                className={`h-auto min-h-6 text-wrap rounded p-1.5 text-left text-xs font-medium`}
                                style={{
                                  backgroundColor: `rgba(${tag.split('-#')[1]},0.5)`,
                                }}
                                variant={'outline'}
                              >
                                {tag.split('-#')[0]}
                              </Button>
                            ))
                          : null}
                      </div>
                      <FormControl>
                        <Input
                          type='text'
                          className='h-6 max-w-[180px] border-0 px-1 outline-0'
                          value={tagAdd}
                          placeholder={
                            tagAdd.length
                              ? '입력 후 엔터'
                              : '태그를 입력해 주세요'
                          }
                          onChange={(e) => handleTagChange(e)}
                          onKeyDown={(e) => handleTagAdd(e)}
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
                    <div className='flex'>
                      <FormControl>
                        <Input
                          id='picture'
                          type='file'
                          accept='image/*'
                          className={`${styled.inputFile}`}
                          onChange={(e) => {
                            handleImageChange(e)
                            field.onChange(e)
                          }}
                        />
                      </FormControl>
                      <FormLabel
                        htmlFor='picture'
                        className={`${styled.failLabel} bg-gray_light relative flex h-[76px] w-[76px] cursor-pointer items-center justify-center rounded-md bg-center bg-no-repeat`}
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
              <AlertDialogFooter className='absolute bottom-0 left-0 flex w-full gap-3 bg-white px-5 pb-7 pt-6 md:justify-end md:p-7'>
                <AlertDialogCancel
                  className='border-gray_dark3 h-10 w-full md:h-12 md:w-[120px]'
                  onClick={() => {
                    form.reset()
                    setIsOpen(false)
                  }}
                >
                  취소
                </AlertDialogCancel>
                <Button
                  type='submit'
                  className='h-10 w-full md:h-12 md:w-[120px]'
                >
                  생성
                </Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </div>
      </ScrollArea>
    </AlertDialogContent>
  )
}

export default CreateTask
