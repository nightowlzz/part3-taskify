'use client'

import React, { useState } from 'react'
import classNames from 'classnames'
import { FaCheck } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { createDashboard } from '../_api-wrapper/create-dashboard' // Adjust the path as necessary
import { CiSquarePlus } from "react-icons/ci";

interface CreateDashboardProps {
  mode: String
}

// Color mapping
const colorMap: { [key: string]: string } = {
  violet: '#5534DA',
  green: '#7AC555',
  orange: '#FFA500',
  blue: '#76A5EA',
  pink: '#E876EA',
}

// CreateDashboard 컴포넌트 정의
const CreateDashboard: React.FC<CreateDashboardProps> = ({ mode }) => {
  const [isModal, setIsModal] = useState(false)
  const [dashboardName, setDashboardName] = useState('')
  const [selectedColor, setSelectedColor] = useState('green')

  const handleClick = () => {
    setIsModal(true)
  }

  const handleClose = () => {
    setDashboardName('')
    setSelectedColor('green')
    setIsModal(false)
  }

  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
  }

  const handleConfirm = async () => {
    const colorHex = colorMap[selectedColor]
    try {
      await createDashboard(dashboardName, colorHex)
      setDashboardName('')
      setSelectedColor('green')
      handleClose()
    } catch (error) {
      console.error('Failed to create dashboard:', error)
    }
  }

  return (
    <>
      {mode == 'sidebar' && (
        <Button
          variant='ghost'
          className='text-gray-500 ml-5 flex h-[40px] w-[40px] justify-center p-0 md:ml-0 md:h-[43px] md:w-[134px] md:justify-between xl:ml-0 xl:h-[45px] xl:w-[276px] xl:justify-between xl:px-[12px]'
          onClick={handleClick}
        >
          <div className='w-0 truncate text-sm md:w-[80px] xl:w-[80px]'>
            Dash Boards
          </div>
          <CiSquarePlus className='h-[14px] w-[14px]' />
        </Button>
      )}
      {mode == 'main' && (
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
      )}

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
