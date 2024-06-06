'use client'
// 8739 내가 만든
// 8689 만들어진거
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
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'

export interface IColumnCreate {
  id: string
  title: string
  dashboardId: number
}

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

export const ColumnAdd = ({
  dashboardId,
  setOpen,
}: {
  dashboardId: string
  setOpen: (open: boolean) => void
}) => {
  const router = useRouter()
  const [dashboardList, setDashboardList] = useState<IColumnCreate[]>()
  const form = useForm<z.infer<typeof ColumnSchema>>({
    resolver: zodResolver(ColumnSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
    },
  })

  const checkDuplicateTitle = (title: string) => {
    if (dashboardList) {
      return dashboardList.some(
        (column) => column.title.trim() === title.trim(),
      )
    }
    return false
  }

  // 취소 클릭시
  const onReset = () => {
    form.reset()
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
    } catch {
      toast.success('컬럼이 생성되지 않았습니다.')
    } finally {
      router.refresh()
      setOpen(false)
    }
  }

  useEffect(() => {
    const getColumns = async () => {
      const res = await api.get(`/columns?dashboardId=${dashboardId}`)
      const { data } = res.data
      setDashboardList(data)
    }
    getColumns()
  }, [])

  return (
    <AlertDialogContent>
      <div className='px-5 py-7 md:py-8'>
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
            <AlertDialogFooter className='flex w-full gap-3 bg-white pt-6 md:mt-2 md:justify-end md:pt-1'>
              <AlertDialogCancel
                className='h-10 w-full border-gray_dark3 md:h-12 md:w-[120px]'
                onClick={onReset}
              >
                취소
              </AlertDialogCancel>
              <Button
                className='h-10 w-full bg-violet md:h-12 md:w-[120px]'
                disabled={!form.formState.isValid}
              >
                추가
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </div>
    </AlertDialogContent>
  )
}

export default ColumnAdd
