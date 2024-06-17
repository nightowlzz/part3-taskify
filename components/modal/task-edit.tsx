'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'

import { cardListStateAboutColumn } from '@/app/(protected)/dashboard/[dashboardId]/_recoil/todo'
import {
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { CardInfo, Column } from '@/lib/type'
import { api, cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useState,
} from 'react'
import { useForm } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'
import { toast } from 'sonner'
import { z } from 'zod'
import { ModalHead } from './components/modal-head'
import { default as style, default as styled } from './modal.module.css'
import { member, memberData, taskDetail, taskForm } from './types/modal-type'

const IMAGE_ADD_ICON = '/icon-purple-add.svg'
const IMAGE_CLOSE_ICON = '/icon-close.svg'

interface taskEdit extends taskDetail {
  setOpen?: (open: boolean) => void
}

const FormSchema = z.object({
  status: z.string(),
  manager: z.string().nullable(),
  title: z.string().nonempty({
    message: '제목을 입력해 주세요',
  }),
  desc: z
    .string()
    .min(1, { message: '1자 이상 작성해 주세요' })
    .max(300, { message: '300자 이내로 적어주세요' }),
  dueDate: z.date().min(new Date('1900-01-01')).nullable(),
  tags: z.array(z.string(), { message: '하나 이상의 태그 필수 입니다' }),
  image: z.string().nullable(),
})

// 맴버들
export const getUsers = async (id: number) => {
  const {
    data: { members },
  } = await api.get(`/members?dashboardId=${id}`)
  return members
}

// 담당자
export const getSelectUsers = async (id: number) => {
  const { data } = await api.get<memberData>(`/cards/${id}`)
  return data
}

// 컬럼목록
export const getColumns = async (id: number) => {
  const { data } = await api.get(`/columns?dashboardId=${id}`)
  return data
}

// tag save
const getRandomColor = () => {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)

  return `${r},${g},${b}`
}

export const TaskCardEdit = ({
  id: cardId,
  title,
  description,
  tags,
  dueDate,
  assignee,
  imageUrl,
  dashboardId,
  columnId,
  setOpen,
}: taskEdit) => {
  const router = useRouter()
  const setColumnCardList = useSetRecoilState<CardInfo[] | []>(
    cardListStateAboutColumn(columnId),
  )
  const [users, setUsers] = useState<member[]>([]) // 담당자
  const [columns, setColumns] = useState<Column[]>() // 상태(컬럼)
  const [imageFile, setImageFile] = useState<File | null>() // api post 이미지
  const [tagAdd, setTagAdd] = useState<string>('') // input tag 추가
  const [preview, setPreview] = useState<string | null>(imageUrl || null) // 미리보기 이미지
  const [tagList, setTagList] = useState<string[] | undefined>(tags) // 추가된 tag 리스트
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'onBlur',
    defaultValues: {
      status: String(columnId),
      manager: assignee ? String(assignee?.id) : '',
      title: title || '',
      desc: description || '',
      dueDate: dueDate ? new Date(dueDate) : null,
      tags: tags || [],
      image: imageUrl || null,
    },
  })

  // tag 키보드 Enter로 추가하기
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

  // tag input 값
  const handleTagChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setTagAdd(value)
  }

  // tag 삭제
  const getImageFilter = (tag: string) => {
    return tagList?.filter((data) => data !== tag)
  }

  const handleTagDelete = (tag: string) => {
    const result = getImageFilter(tag)
    if (!result) {
      form.setValue('tags', [])
      return
    }
    form.setValue('tags', [...result])
    setTagList(result)
  }

  // image
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      const image = URL.createObjectURL(selectedFile)
      setPreview(image)
      setImageFile(selectedFile)
    }
  }

  // iamge 삭제
  const handleImageDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    form.setValue('image', '')
    setPreview('')
    setImageFile(null)
  }

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const formData = new FormData()
    if (imageFile) formData.append('image', imageFile)
    type TaskFormWithoutDashboard = Omit<taskForm, 'dashboardId'>
    let requestData: TaskFormWithoutDashboard = {
      columnId: Number(data.status),
      title: data.title,
      description: data.desc,
      tags: data.tags,
    }

    if (data.dueDate) {
      requestData.dueDate = format(data.dueDate, 'yyyy-MM-dd HH:mm')
    }

    if (data.manager) {
      requestData.assigneeUserId = Number(data.manager)
    }

    if (!data.image) {
      requestData.imageUrl = null
    }

    try {
      let res
      if (imageFile) {
        console.log('이미지 있어')
        const image = await api.post(
          `/columns/${columnId}/card-image`,
          formData,
        )
        res = await api.put(`/cards/${cardId}`, {
          ...image.data,
          ...requestData,
        })
      } else {
        console.log('이미지 없다~~~')
        res = await api.put(`/cards/${cardId}`, { ...requestData })
      }

      setColumnCardList((prev) => {
        return prev.map((card: CardInfo) => {
          if (card.id === res.data.id) {
            return {
              ...res.data,
            }
          } else {
            return card
          }
        })
      })

      toast.success('전송 완료')
      if (setOpen) setOpen(false)
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.message) {
        toast.error(e.response.data.message)
      } else {
        toast.error('전송 실패')
      }
      console.error(e.response.data.message)
    } finally {
      router.refresh()
    }
  }

  useEffect(() => {
    const getMembers = async () => {
      const [user, column] = await Promise.all([
        getUsers(dashboardId),
        getColumns(dashboardId),
      ])

      setUsers(user)
      setColumns(column.data)
    }
    getMembers()
  }, [])

  return (
    <AlertDialogContent className='block h-[90vh] max-w-[506px] md:max-h-[80vh]'>
      <div className='h-full overflow-y-auto pb-[100px] pt-3 md:pb-[136px] md:pt-4'>
        <ModalHead>할 일 수정</ModalHead>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full space-y-6'
          >
            <div className='flex gap-4'>
              {/* 상태 */}
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem className='flex-1 md:pt-2'>
                    <FormLabel className='text-base font-medium md:text-lg'>
                      상태
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {columns &&
                          columns.map((column) => (
                            <SelectItem key={column.id} value={`${column.id}`}>
                              <Badge
                                variant='dotted'
                                className={`${styled.badge} bg-violet-300 text-violet-500`}
                              >
                                {column.title}
                              </Badge>
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              {/* 담당자 */}
              <FormField
                control={form.control}
                name='manager'
                render={({ field }) => (
                  <FormItem className='flex-1 md:pt-2'>
                    <FormLabel className='text-base font-medium md:text-lg'>
                      담당자
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? undefined}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='담당자가 없습니다.' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {users &&
                          users?.map((user) => (
                            <SelectItem key={user.id} value={`${user.userId}`}>
                              <div className='flex items-center'>
                                <Avatar className='mr-2'>
                                  <AvatarImage src={user.profileImageUrl} />
                                  <AvatarFallback>
                                    {user.nickname[0]}
                                  </AvatarFallback>
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
            </div>
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
                        selected={field.value ? field.value : undefined}
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
                        ? tagList.map((tag: string) => {
                            const [tagName, tagColor] = tag.split('-#')
                            return (
                              <Button
                                type='button'
                                key={tag}
                                className={`flex h-auto min-h-6 items-center text-wrap rounded p-1.5 text-left text-xs font-medium`}
                                style={{
                                  backgroundColor: `rgba(${tagColor},0.2)`,
                                  color: `rgba(${tagColor}`,
                                }}
                                variant={'outline'}
                                onClick={() => handleTagDelete(tag)}
                              >
                                {tagName}
                                <Image
                                  src={IMAGE_CLOSE_ICON}
                                  alt='닫기'
                                  width={12}
                                  height={12}
                                  className='ml-2'
                                />
                              </Button>
                            )
                          })
                        : null}
                    </div>
                    <FormControl>
                      <Input
                        type='text'
                        className='h-6 max-w-[180px] border-0 px-1 outline-0'
                        value={tagAdd}
                        placeholder={
                          tagList?.length
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
                  <FormLabel className='text-base font-bold md:text-lg'>
                    이미지
                  </FormLabel>
                  <div className='relative flex'>
                    <FormControl>
                      <Input
                        id='picture'
                        type='file'
                        accept='image/*'
                        className={`${style.inputFile}`}
                        onChange={(e) => {
                          handleImageChange(e)
                          field.onChange(e)
                        }}
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor='picture'
                      className={`${style.failLabel} relative flex h-[76px] w-[76px] cursor-pointer items-center justify-center rounded-md border bg-white bg-center bg-no-repeat`}
                      style={{
                        backgroundSize: preview ? '100% auto' : 'auto auto',
                        backgroundImage: preview
                          ? `url(${preview})`
                          : `url(${IMAGE_ADD_ICON})`,
                      }}
                    >
                      {preview && (
                        <Button
                          type='button'
                          className='hover:bg-gray_dark3 absolute right-0 top-0 m-1 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-white p-0'
                          onClick={handleImageDelete}
                        >
                          <Image
                            src={IMAGE_CLOSE_ICON}
                            alt='닫기'
                            width={14}
                            height={14}
                          />
                        </Button>
                      )}
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter className='absolute bottom-0 left-0 w-full flex-col-reverse items-start justify-start bg-white px-5 pb-7 pt-6 md:flex-row-reverse md:items-end md:justify-between  md:p-7'>
              <div className='flex w-full items-end justify-end gap-3'>
                <AlertDialogCancel className='border-gray_dark3 h-10 w-full md:h-12 md:w-[120px]'>
                  취소
                </AlertDialogCancel>
                <Button
                  className='h-10 w-full md:h-12 md:w-[120px]'
                  disabled={!form.formState.isValid}
                >
                  변경
                </Button>
              </div>
            </AlertDialogFooter>
          </form>
        </Form>
      </div>
    </AlertDialogContent>
  )
}
