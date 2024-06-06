import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { EditCardProps } from '../editCard-layout'
import { api } from '@/lib/utils'
import { useState, useEffect } from 'react'

const EditDashboardName: React.FC<EditCardProps> = ({
  dashboard,
  dashboardId,
}) => {
  const [newDashboardName, setNewDashboardName] = useState(dashboard?.title)
  const [dashboardColor, setDashboardColor] = useState('#76A5EA')
  const [currentName, setCurrentName] = useState(dashboard?.title)

  const handleClickButton = async () => {
    const url = `/dashboards/${dashboardId}`
    const params = {
      title: newDashboardName,
      color: dashboardColor,
    }
    try {
      await api.put(url, params)
      setCurrentName(newDashboardName)
      console.log(dashboard?.title)
    } catch (error) {
      throw new Error(`Failed to edit dashboard name: ${error}`)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDashboardName(event.target.value)
  }

  return (
    <Card>
      <div className='flex'>
        <span className='text-blue-500 text-xl font-bold'>{currentName}</span>
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
