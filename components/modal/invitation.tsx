'use client'

import { postInvitation } from '@/app/(protected)/dashboard/_api-wrapper/post-invitation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from '../ui/alert-dialog'
import { Input } from '../ui/input'
import { useState } from 'react'
import { EditCardProps } from '../edit-card/editCard-layout'
import { Button } from '../ui/button'
import { CiSquarePlus } from 'react-icons/ci'

const Invitation: React.FC<EditCardProps> = ({ dashboardId }) => {
  const [isModal, setIsModal] = useState(false)
  const [inviteeEmail, setInviteeEmail] = useState('')

  const handleClick = () => {
    setIsModal(true)
  }

  const handleConfirm = async () => {
    try {
      await postInvitation(inviteeEmail, dashboardId)
      setInviteeEmail('')
      handleClose()
    } catch (error) {
      console.error('Failed to create dashboard:', error)
    }
  }

  const handleClose = () => {
    setInviteeEmail('')
    setIsModal(false)
  }
  return (
    <>
      <Button variant='p_btn' className='ml-4' onClick={handleClick}>
        <CiSquarePlus />
        <div className='ml-2'>초대하기</div>
      </Button>
      {isModal && (
        <AlertDialog open={isModal} onOpenChange={handleClose}>
          <AlertDialogContent className='h-[293px] w-[327px] max-w-xl md:h-[275px] md:w-[540px]'>
            <div className='px-7 py-7 md:py-8'>
              <div className='absolute left-5 top-7 text-xl font-bold md:left-7 md:top-8 md:text-2xl'>
                초대하기
              </div>
              <div className='absolute left-5 top-[76px] text-base font-medium md:left-7 md:top-[93px] md:text-lg'>
                이메일
              </div>
              <Input
                className='absolute left-5 top-[105px] h-[42px] w-[287px] md:left-7 md:top-[128px] md:h-[48px] md:w-[484px]'
                value={inviteeEmail}
                onChange={(e) => setInviteeEmail(e.target.value)}
              />
              <AlertDialogFooter className='items-start justify-end pt-6 first-letter:flex-col md:flex-row md:items-end md:pt-7'>
                <div className='flex w-full justify-end gap-3'>
                  <AlertDialogCancel
                    className='absolute left-5 top-[223px] h-[42px] w-[138px] border border-input bg-background hover:bg-accent hover:text-accent-foreground md:left-[260px] md:top-[200px] md:h-12 md:w-full md:max-w-[120px]'
                    onClick={handleClose}
                  >
                    취소
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className='absolute left-[169px] top-[223px] h-[42px] w-[138px] bg-violet md:left-[392px] md:top-[200px] md:h-12 md:w-full md:max-w-[120px]'
                    onClick={handleConfirm}
                  >
                    초대
                  </AlertDialogAction>
                </div>
              </AlertDialogFooter>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}

export default Invitation
