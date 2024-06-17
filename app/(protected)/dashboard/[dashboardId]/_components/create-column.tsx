'use client'

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
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
import { api } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { IColumnCreate } from './modal/modal-type'
import { ModalHead } from './modal/modal-head'
import { useRecoilState } from 'recoil'
import { createColumnState } from './modal/modal-atom'

const ColumnSchema = z.object({
  title: z
    .string()
    .nonempty({ message: '제목을 적어주세요.' })
    .min(2, {
      message: '2글자 이상 적어주세요.',
    })
    .max(15, {
      message: '15이하로 적어 주세요',
    }),
})
export type ColumnFormValues = z.infer<typeof ColumnSchema>

export const CreateColumn = ({
  dashboardId,
  onUpdate,
}: {
  dashboardId: number
  onUpdate: () => void
}) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useRecoilState(createColumnState)
  const [columnList, setColumnList] = useState<IColumnCreate[]>()
  const form = useForm<z.infer<typeof ColumnSchema>>({
    resolver: zodResolver(ColumnSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
    },
  })

  const checkDuplicateTitle = (title: string) => {
    if (columnList) {
      return columnList.some((column) => column.title.trim() === title.trim())
    }
    return false
  }

  const onSubmit = async (data: ColumnFormValues) => {
    const { title } = data
    if (checkDuplicateTitle(title)) {
      toast.success('중복된 이름 입니다.')
      return
    }

    try {
      await api.post('/columns', {
        title: title.trim(),
        dashboardId: Number(dashboardId),
      })
      toast.success('새로운 컬럼이 생성되었습니다.')
      onUpdate() // 데이터 업데이트 함수 호출
    } catch {
      toast.success('컬럼이 생성되지 않았습니다.')
    } finally {
      form.reset()
      router.refresh()
      setIsOpen(false) // 모달 닫기
    }
  }

  useEffect(() => {
    const getColumns = async () => {
      const res = await api.get(`/columns?dashboardId=${dashboardId}`)
      const { data } = res.data
      setColumnList(data)
    }
    getColumns()
  }, [dashboardId])

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>새 컬럼 추가</Button>
      </AlertDialogTrigger>
      <AlertDialogPortal>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <div className='py-3 md:py-4'>
            <ModalHead>새 컬럼 생성</ModalHead>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-base font-medium md:text-lg'>
                        이름
                      </FormLabel>
                      <FormControl>
                        <Input placeholder='새로운 프로젝트' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <AlertDialogFooter className='flex w-full flex-row items-center gap-3 bg-white px-0 pt-6 md:justify-end md:pt-7'>
                  <AlertDialogCancel
                    className='border-gray_dark3 mt-0 h-10 w-full md:h-12 md:w-[120px]'
                    onClick={() => setIsOpen(false)} // 모달 닫기
                  >
                    취소
                  </AlertDialogCancel>
                  <Button
                    className='h-10 w-full md:h-12 md:w-[120px]'
                    disabled={!form.formState.isValid}
                  >
                    추가
                  </Button>
                </AlertDialogFooter>
              </form>
            </Form>
          </div>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  )
}

export default CreateColumn
