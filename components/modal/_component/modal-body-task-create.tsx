'use client'
import { DialogContent } from '@/components/ui/dialog'
import { ModalFoot } from './modal-foot'
import { ModalHead } from './modal-head'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import styled from './modal.module.css'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import Image from 'next/image'
import style from './modal.module.css'

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
const TaskCardCreate = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.success('작성 완료')
    // toast.error('로그인에 실패하였습니다')
  }

  return (
    <DialogContent className='block h-screen max-w-[506px] md:max-h-[80vh]'>
      <ScrollArea className='h-full w-full'>
        <div className='px-[28px] py-8'>
          <ModalHead>할 일 생성</ModalHead>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='w-full space-y-6'
            >
              {/* 담당자 */}
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='w-[218px] flex-1 md:pt-2'>
                    <FormLabel className='text-lg font-medium'>
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
              {/* 제목 */}
              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem className='md:pt-2'>
                    <FormLabel className='text-lg font-medium'>
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
                    <FormLabel className='text-lg font-medium'>
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
                name='dob'
                render={({ field }) => (
                  <FormItem className='flex flex-col md:pt-2'>
                    <FormLabel className='text-lg font-medium'>
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
              <FormField
                control={form.control}
                name='tag'
                render={({ field }) => (
                  <FormItem className='md:pt-2'>
                    <FormLabel className='text-lg font-medium'>태그</FormLabel>
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
                    <FormLabel className='text-lg font-medium'>
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
            </form>
          </Form>
          <ModalFoot />
        </div>
      </ScrollArea>
    </DialogContent>
  )
}

export default TaskCardCreate
