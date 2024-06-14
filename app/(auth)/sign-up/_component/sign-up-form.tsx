'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
import { signUpFormSchema } from '@/schema'
import { api } from '@/lib/utils'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { Eye } from 'lucide-react'

type SignUpFormValues = z.infer<typeof signUpFormSchema>

export const SignUpForm = () => {
  const router = useRouter()

  const [isPending, startTransition] = useTransition()
  const [isShow, setIsShow] = useState(false)
  const [isShow2, setIsShow2] = useState(false)

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (values: SignUpFormValues) => {
    startTransition(async () => {
      const { email, name: nickname, password } = values
      try {
        await api.post('/users/', { email, nickname, password })
        toast.success('회원가입에 성공 하였습니다.')
        router.push('/sign-in')
      } catch (error) {
        toast.error('회원가입에 실패하였습니다')
      }
    })
  }

  const formFields: {
    name: keyof SignUpFormValues
    label: string
    placeholder: string
    type?: string
    t?: string
    onClick?: () => void
  }[] = [
    {
      name: 'email',
      label: '이메일',
      placeholder: '이메일을 입력해 주세요.',
    },
    {
      name: 'name',
      label: '닉네임',
      placeholder: '닉네임을 입력해 주세요.',
    },
    {
      name: 'password',
      label: '비밀번호',
      placeholder: '8자 이상 입력해 주세요.',
      type: isShow ? 'text' : 'password',
      t: 'password',
      onClick: () => setIsShow((value) => !value),
    },
    {
      name: 'confirmPassword',
      label: '비밀번호 확인',
      placeholder: '비밀번호를 한번 더 입력해 주세요.',
      type: isShow2 ? 'text' : 'password',
      t: 'password',
      onClick: () => setIsShow2((value) => !value),
    },
  ]

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mt-8 flex w-full flex-col gap-y-1'
      >
        {formFields.map((field) => (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: inputField }) => (
              <FormItem className='relative'>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input
                    type={field.type}
                    disabled={isPending}
                    placeholder={field.placeholder}
                    {...inputField}
                  />
                </FormControl>
                <FormMessage />
                {field.t === 'password' && (
                  <Eye
                    className='absolute right-2 top-8 transform cursor-pointer'
                    onClick={field.onClick}
                  />
                )}
              </FormItem>
            )}
          />
        ))}
        <Button
          disabled={!form.formState.isValid || isPending}
          type='submit'
          className='mt-5 h-12 w-full'
        >
          {isPending ? '회원가입 중...' : '가입하기'}
        </Button>
      </form>
    </Form>
  )
}
