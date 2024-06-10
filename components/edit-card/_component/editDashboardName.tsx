import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { EditCardProps } from '../editCard-layout'
import { api } from '@/lib/utils'
import { useState, useEffect } from 'react'
import classNames from 'classnames'
import { FaCheck } from 'react-icons/fa'

const colorMap: { [key: string]: string } = {
  violet: '#5534DA',
  green: '#7AC555',
  orange: '#FFA500',
  blue: '#76A5EA',
  pink: '#E876EA',
}

const colorReverseMap: { [key: string]: string } = {
  '#5534DA': 'violet',
  '#7AC555': 'green',
  '#FFA500': 'orange',
  '#76A5EA': 'blue',
  '#E876EA': 'pink',
}

const EditDashboardName: React.FC<EditCardProps> = ({
  dashboard,
  dashboardId,
}) => {
  const [newDashboardName, setNewDashboardName] = useState(
    dashboard?.title || '',
  )
  const [currentName, setCurrentName] = useState(dashboard?.title || '')
  const [selectedColor, setSelectedColor] = useState('')
  const [dashboardColor, setDashboardColor] = useState(dashboard?.color || '')

  useEffect(() => {
    if (dashboard?.color) {
      const initialColor = colorReverseMap[dashboard.color]
      setSelectedColor(initialColor)
      setDashboardColor(dashboard.color)
    }
  }, [dashboard])

  const handleClickButton = async () => {
    const url = `/dashboards/${dashboardId}`
    const params = {
      title: newDashboardName,
      color: dashboardColor,
    }

    try {
      await api.put(url, params)
      setCurrentName(newDashboardName)
    } catch (error) {
      console.error(`Failed to edit dashboard name and color: ${error}`)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDashboardName(event.target.value)
  }

  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
    setDashboardColor(colorMap[color])
  }

  return (
    <Card className='py-8'>
      <div className='flex justify-between'>
        <span className='text-blue-500 text-xl font-bold'>{currentName}</span>
        <div className='left-5 top-[171px] flex gap-2 md:left-7 md:top-[203px]'>
          {['green', 'violet', 'orange', 'blue', 'pink'].map((color) => (
            <button
              key={color}
              className={classNames(
                'flex h-6 w-6 items-center justify-center rounded-full border',
                {
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
                <FaCheck className='h-3 w-3 text-white' />
              )}
            </button>
          ))}
        </div>
      </div>
      <div className='mt-5'>
        <span className='mt-10 text-lg'>대시보드 이름</span>
        <Input
          className='mt-1'
          value={newDashboardName}
          onChange={handleInputChange}
        />
        <div className='mt-4 flex justify-end'>
          <Button variant='p_btn' size='dele' onClick={handleClickButton}>
            변경
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default EditDashboardName
