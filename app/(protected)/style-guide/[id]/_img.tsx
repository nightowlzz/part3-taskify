'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useState, useRef, useTransition } from 'react'

import { updateUser } from '@/app/action/user'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const profileSchema = z.object({
  username: z.string().min(1, { message: '닉네임을 입력해 주세요.' }),
  email: z
    .string()
    .email({ message: '유효한 이메일을 입력해 주세요.' })
    .optional(),
})

type ProfileSchema = z.infer<typeof profileSchema>

type Props = {
  name: string
  email: string
  ImgUrl?: string
}

export const Profile = ({ name, email, ImgUrl: initialImgUrl }: Props) => {
  const [isPending, startTransition] = useTransition()
  const [file, setFile] = useState<File | undefined>()
  const [imgUrl, setImgUrl] = useState<string | undefined>(initialImgUrl)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const router = useRouter()

  const form = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: name,
      email: email,
    },
  })

  const onCancel = () => {
    form.reset()
    fileInputRef.current && (fileInputRef.current.value = '')
    setImgUrl(initialImgUrl)
    setFile(undefined)
  }

  const onSubmit = async (data: ProfileSchema) => {
    const formData = new FormData()
    if (file) formData.append('image', file)

    startTransition(async () => {
      // const isUpdate = await updateUser({
      //   nickname: data.username,
      //   formData: file ? formData : undefined,
      // })
      // if (!isUpdate) {
      //   toast.error('업데이트에 실패하였습니다.')
      //   return
      // }
      toast.success('유저 정보가 업데이트 되었습니다.')
      router.refresh()
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setImgUrl(URL.createObjectURL(selectedFile))
      setFile(selectedFile)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='w-full space-y-6 rounded-lg bg-white px-5 py-8'>
          <h1 className='text-2xl font-bold'>프로필</h1>
          <div className='flex h-[180px] gap-x-4'>
            <div className='relative h-[180px] w-[180px]'>
              {imgUrl ? (
                <Image
                  src={imgUrl}
                  alt='userImg'
                  fill
                  sizes='100vw 50vw'
                  className='cursor-pointer object-cover transition-all hover:brightness-75'
                  onClick={() => fileInputRef.current?.click()}
                />
              ) : (
                <Button
                  type='button'
                  className='h-full w-full bg-stone-200 hover:bg-stone-300'
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
            </div>
          </div>
          <div className='flex justify-end gap-x-2'>
            <Button
              onClick={onCancel}
              className='px-8'
              variant='destructive'
              type='button'
            >
              취소
            </Button>
            <Button className='px-8' type='submit' disabled={isPending}>
              저장
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
