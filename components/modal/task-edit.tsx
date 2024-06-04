'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
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
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { ModalHead } from './_component/modal-head'
import { default as style, default as styled } from './modal.module.css'
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'

const FormSchema = z.object({
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
  title: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  image: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  text: z
    .string()
    .min(10, {
      message: 'Bio must be at least 10 characters.',
    })
    .max(160, {
      message: 'Bio must not be longer than 30 characters.',
    }),
  dob: z.date({
    required_error: 'A date of birth is required.',
  }),
  tag: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
})

export const TaskCardEdit = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.success('작성 완료')
    // toast.error('로그인에 실패하였습니다')
  }
  return (
    <AlertDialogContent className='block h-[90vh] max-w-[506px] md:max-h-[80vh]'>
      <ScrollArea className='h-full w-full'>
        <div className='px-7 pb-[100px] pt-7 md:pb-[136px] md:pt-8'>
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
                  name='email'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel className='text-base font-medium md:text-lg'>
                        상태
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
                          <SelectItem value='todo'>
                            <Badge
                              variant='dotted'
                              className={`${styled.badge} bg-[#F1EFFD] text-[#5534DA]`}
                            >
                              To Do
                            </Badge>
                          </SelectItem>
                          <SelectItem value='progress'>
                            <Badge
                              variant='dotted'
                              className={`${styled.badge} bg-[#F1EFFD] text-[#5534DA]`}
                            >
                              On Progress
                            </Badge>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                {/* 담당자 */}
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='flex-1 md:pt-2'>
                      <FormLabel className='text-base font-medium md:text-lg'>
                        담당자
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a verified email to display' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='todo'>
                            <div className='flex items-center'>
                              <Avatar className='mr-2'>
                                <AvatarImage src='https://github.com/shadcn.png' />
                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                              <span className='text-sm'>배유철</span>
                            </div>
                          </SelectItem>
                          <SelectItem value='progress'>
                            <div className='flex items-center'>
                              <Avatar className='mr-2'>
                                <AvatarImage src='https://github.com/shadcn.png' />
                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                              <span className='text-sm'>배유철</span>
                            </div>
                          </SelectItem>
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
                    <FormLabel className='text-base font-medium md:text-lg'>
                      제목 <sup className='text-ms text-[#5534DA]'>*</sup>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder='shadcn' {...field} />
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
                    <FormLabel className='text-base font-medium md:text-lg'>
                      설명 <sup className='text-ms text-[#5534DA]'>*</sup>
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
                name='dob'
                render={({ field }) => (
                  <FormItem className='flex flex-col md:pt-2'>
                    <FormLabel className='text-base font-medium md:text-lg'>
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
                name='tag'
                render={({ field }) => (
                  <FormItem className='md:pt-2'>
                    <FormLabel className='text-base font-medium md:text-lg'>
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
                    <FormLabel>이미지</FormLabel>
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
                        <Image fill src={`/logo.png`} alt='추가' />
                      </FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <AlertDialogFooter className='absolute bottom-0 left-0 flex w-full gap-3 bg-white px-5 pb-7 pt-6 md:justify-end md:p-7'>
            <AlertDialogCancel className='h-10 w-full border-gray_dark3 md:h-12 md:w-[120px]'>
              취소
            </AlertDialogCancel>
            <AlertDialogAction className='h-10 w-full bg-violet md:h-12 md:w-[120px]'>
              수정
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </ScrollArea>
    </AlertDialogContent>
  )
}
