'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useTransition } from 'react'

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
import { signInFormSchema } from '@/schema'
import { api } from '@/lib/utils'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { setAccessToken } from '@/app/data/cookie'

type SignInFormValues = z.infer<typeof signInFormSchema>

export const SignInForm = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: 'test111@mail.com',
      password: 'test1234',
    },
  })

  const onSubmit = (values: SignInFormValues) => {
    startTransition(async () => {
      const { email, password } = values
      try {
        const response = await api.post('/auth/login', { email, password })
        const { accessToken } = response.data
        await setAccessToken(accessToken)

        toast.success('로그인 성공')
        router.replace('/dashboard')
      } catch (error) {
        toast.error('로그인에 실패하였습니다')
      }
    })
  }

  const formFields: {
    name: keyof SignInFormValues
    label: string
    placeholder: string
  }[] = [
    {
      name: 'email',
      label: '이메일',
      placeholder: '이메일을 입력해 주세요.',
    },
    {
      name: 'password',
      label: '비밀번호',
      placeholder: '비밀번호를 입력해 주세요.',
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
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder={field.placeholder}
                    {...inputField}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button
          disabled={isPending || !form.formState.isValid}
          type='submit'
          className='mt-5 h-12 w-full'
        >
          {isPending ? '로그인 중...' : '로그인'}
        </Button>
      </form>
    </Form>
  )
}
