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
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useState,
} from 'react'
import { toast } from 'sonner'
import { ModalHead } from './components/modal-head'
import style from './modal.module.css'
import {
  columnDashboardId,
  member,
  memberData,
  taskForm,
} from './types/modal-type'

const IMAGE_ADD_ICON = '/icon-purple-add.svg'
const IMAGE_CLOSE_ICON = '/icon-close.svg'

interface taskCreadProps extends columnDashboardId {
  setOpen: (open: boolean) => void
}

const FormSchema = z.object({
  manager: z.string(),
  title: z.string().nonempty({
    message: '제목을 입력해 주세요',
  }),
  desc: z
    .string()
    .min(1, { message: '1자 이상 작성해 주세요' })
    .max(300, { message: '300자 이내로 적어주세요' }),
  dueDate: z.date().min(new Date('1900-01-01')),
  tags: z.array(z.string(), { message: '하나 이상의 태그 필수 입니다' }),
  image: z.string().nullable(),
})

// 맴버들
export const getUsers = async (id: number) => {
  const {
    data: { members },
  } = await api.get<memberData>(`/members?dashboardId=${id}`)

  return members
}

// tag save
const getRandomColor = () => {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)

  return `${r},${g},${b}`
}

const TaskCardCreate = ({ dashboardId, columnId, setOpen }: taskCreadProps) => {
  const router = useRouter()
  const [users, setUsers] = useState<member[]>() // 담당자
  const [imageFile, setImageFile] = useState<File | undefined>() // api post 이미지
  const [preview, setPreview] = useState<string | null>(null) // 미리보기 이미지
  const [tagAdd, setTagAdd] = useState<string>('') // input tag 추가
  const [tagList, setTagList] = useState<string[]>() // 추가된 tag 리스트
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'onBlur',
    defaultValues: {
      manager: '',
      title: '',
      desc: '',
      dueDate: new Date(),
      tags: [],
      image: null,
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
  }

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const formData = new FormData()
    if (imageFile) formData.append('image', imageFile)

    const requestData: taskForm = {
      dashboardId: Number(dashboardId),
      columnId: Number(columnId),
      title: data.title,
      description: data.desc,
      dueDate: format(data.dueDate, 'yyyy-MM-dd HH:mm'),
      tags: data.tags || [],
    }

    if (data.manager || !null) {
      formData.append('assigneeUserId', data.manager)
    }

    try {
      let res
      if (imageFile) {
        const image = await api.post(
          `/columns/${columnId}/card-image`,
          formData,
        )
        res = await api.post(`/cards`, { ...image.data, ...requestData })
      } else {
        res = await api.post(`/cards`, { ...requestData })
      }

      setTagList([])
      setPreview(null)
      form.reset()
      setOpen(false)
      toast.success('전송 완료')
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.message) {
        toast.error(e.response.data.message)
      } else {
        toast.error('전송 실패')
      }
    } finally {
      router.refresh()
    }
  }

  useEffect(() => {
    const getMembers = async () => {
      const user = await getUsers(dashboardId)
      setUsers(user)
    }
    getMembers()
  }, [])

  return (
    <AlertDialogContent className='block h-[90vh] max-w-[506px] md:max-h-[80vh]'>
      <div className='h-full overflow-y-auto px-5 pb-[100px] pt-7 md:pb-[136px] md:pt-8'>
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
                  <FormLabel className='text-base font-medium md:text-lg'>
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
                  <FormLabel className='text-base font-medium md:text-lg'>
                    제목 <sup className='text-ms text-violet'>*</sup>
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
                  <FormLabel className='text-base font-medium md:text-lg'>
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
                  <FormLabel className='text-base font-medium md:text-lg'>
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
                  <FormLabel className='text-base font-medium md:text-lg'>
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
                  <FormLabel className='text-base font-medium md:text-lg'>
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
                      className={`${style.failLabel} relative flex h-[76px] w-[76px] cursor-pointer items-center justify-center rounded-md bg-gray_light bg-center bg-no-repeat`}
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
                          className='absolute right-0 top-0 m-1 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-white p-0 hover:bg-gray_dark3'
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
            <AlertDialogFooter className='absolute bottom-0 left-0 flex w-full gap-3 bg-white px-5 pb-7 pt-6 md:justify-end md:p-7'>
              <AlertDialogCancel
                className='h-10 w-full border-gray_dark3 md:h-12 md:w-[120px]'
                onClick={() => form.reset()}
              >
                취소
              </AlertDialogCancel>
              <Button
                type='submit'
                className='h-10 w-full bg-violet md:h-12 md:w-[120px]'
              >
                생성
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </div>
    </AlertDialogContent>
  )
}

export default TaskCardCreate
