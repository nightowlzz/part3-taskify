'use client'

import { useRecoilState, useSetRecoilState } from 'recoil'
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { ModalHead } from './modal/modal-head'
import {
  updateColumnsForColumnId,
  deleteColumnsForColumnId,
} from './modal/modal-atom'
import { columnState } from '../_recoil/todo'
import { updateColumn } from '../../_api-wrapper/update-column'
import { useEffect, useState } from 'react'
import { api } from '@/lib/utils'

type ColumnFormValues = z.infer<typeof ColumnSchema>

const ColumnSchema = z.object({
  title: z
    .string()
    .nonempty({ message: '제목을 적어주세요.' })
    .min(2, { message: '2글자 이상 적어주세요.' })
    .max(15, { message: '15자 이하로 적어 주세요' }),
})

export default function UpdateColumn({ columnId }: { columnId: number }) {
  const setUpdateColumnState = useSetRecoilState(
    updateColumnsForColumnId(columnId),
  )
  const setDeleteColumnState = useSetRecoilState(
    deleteColumnsForColumnId(columnId),
  )
  const setColumns = useSetRecoilState(columnState)
  const [columnTitle, setColumnTitle] = useState('')

  const form = useForm<ColumnFormValues>({
    resolver: zodResolver(ColumnSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
    },
  })

  useEffect(() => {
    const getColumn = async () => {
      const { data } = await api.get(`/columns/${columnId}`)
      setColumnTitle(data.title)
      form.reset({ title: data.title })
    }
    getColumn()
  }, [columnId, form])

  const onClose = () => setUpdateColumnState(false)

  const openDeleteColumnModal = () => {
    setUpdateColumnState(false)
    setDeleteColumnState(true)
  }

  const onSubmit = async (data: ColumnFormValues) => {
    try {
      const newColumn = await updateColumn(data, columnId)
      setColumns((oldColumns) =>
        oldColumns.map((column) =>
          column.id === columnId ? { ...newColumn } : column,
        ),
      )
      toast.success('컬럼명이 변경되었습니다.')
    } catch (error) {
      toast.error('컬럼명 변경에 실패했습니다.')
    } finally {
      setUpdateColumnState(false)
    }
  }

  return (
    <AlertDialogContent>
      <div className='px-5 py-7 md:py-8'>
        <ModalHead>컬럼 관리</ModalHead>
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter className='flex-col-reverse  items-start justify-start pt-6 md:flex-row-reverse md:items-end md:justify-between md:pt-7'>
              <div className='flex w-full items-end justify-end gap-3'>
                <AlertDialogCancel
                  className='h-10 w-full border-gray_dark3 md:h-12 md:w-[120px]'
                  onClick={() => form.reset({ title: columnTitle })}
                >
                  취소
                </AlertDialogCancel>
                <Button
                  className='h-10 w-full bg-violet md:h-12 md:w-[120px]'
                  disabled={!form.formState.isValid}
                >
                  변경
                </Button>
              </div>
              <Button
                variant='underline'
                className='mb-4 h-5 p-0 leading-none md:mb-0'
                onClick={openDeleteColumnModal}
              >
                삭제하기
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </div>
    </AlertDialogContent>
  )
}
