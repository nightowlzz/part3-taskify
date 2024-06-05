'use client'

import React, { useState } from 'react'
import classNames from 'classnames'
import { FaCheck } from 'react-icons/fa'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'

interface CreateDashboardProps {
  onConfirm?: () => void
}

// CreateDashboard 컴포넌트 정의
const CreateDashboard: React.FC<CreateDashboardProps> = ({ onConfirm }) => {
  const [isModal, setIsModal] = useState(false)
  const [dashboardName, setDashboardName] = useState('')
  const [selectedColor, setSelectedColor] = useState('green')

  const handleClick = () => {
    setIsModal(true)
  }

  const handleClose = () => {
    setIsModal(false)
  }

  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
  }

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm()
    }
    handleClose()
  }

  return (
    <>
      <button
        className='
          flex h-[58px] w-[260px]
          items-center justify-center
          gap-[10px] rounded-lg 
          border border-gray_dark3 bg-white 
          shadow-sm transition-shadow duration-300 hover:shadow-md md:h-[68px] 
          md:w-[247px] xl:h-[70px] xl:w-[332px]
        '
        onClick={handleClick}
      >
        <span className='text-black_light_2'>새로운 대시보드</span>
        <span className='rounded bg-violet_light px-1 text-violet'>+</span>
      </button>

      {isModal && (
        <AlertDialog open={isModal} onOpenChange={handleClose}>
          <AlertDialogContent className='h-[293px] w-[327px] max-w-xl md:h-[334px] md:w-[540px]'>
            <div className='px-7 py-7 md:py-8'>
              <div className='absolute left-5 top-7 text-xl font-bold md:left-7 md:top-8 md:text-2xl'>
                새로운 대시보드
              </div>
              <div className='absolute left-5 top-[76px] text-base font-medium md:left-7 md:top-[93px] md:text-lg'>
                대시보드 이름
              </div>
              <Input
                className='absolute left-5 top-[105px] h-[42px] w-[287px] md:left-7 md:top-[128px] md:h-[48px] md:w-[484px]'
                value={dashboardName}
                onChange={(e) => setDashboardName(e.target.value)}
              />
              <div className='absolute left-5 top-[171px] flex gap-4 md:left-7 md:top-[203px]'>
                {['green', 'violet', 'orange', 'blue', 'pink'].map((color) => (
                  <button
                    key={color}
                    className={classNames(
                      'flex h-8 w-8 items-center justify-center rounded-full border',
                      {
                        'border-black': selectedColor === color,
                        'border-transparent': selectedColor !== color,
                      },
                      {
                        'bg-green': color === 'green',
                        'bg-violet': color === 'violet',
                        'bg-orange': color === 'orange',
                        'bg-blue': color === 'blue',
                        'bg-pink': color === 'pink',
                      },
                    )}
                    onClick={() => handleColorSelect(color)}
                  >
                    {selectedColor === color && (
                      <FaCheck className='text-white' />
                    )}
                  </button>
                ))}
              </div>
              <AlertDialogFooter className='items-start justify-end pt-6 first-letter:flex-col md:flex-row md:items-end md:pt-7'>
                <div className='flex w-full justify-end gap-3'>
                  <AlertDialogCancel
                    className='absolute left-5 top-[223px] h-[42px] w-[138px] border border-input bg-background hover:bg-accent hover:text-accent-foreground md:left-[260px] md:top-[258px] md:h-12 md:w-full md:max-w-[120px]'
                    onClick={handleClose}
                  >
                    취소
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className='absolute left-[169px] top-[223px] h-[42px] w-[138px] bg-violet md:left-[392px] md:top-[258px] md:h-12 md:w-full md:max-w-[120px]'
                    onClick={handleConfirm}
                  >
                    생성
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

export default CreateDashboard
