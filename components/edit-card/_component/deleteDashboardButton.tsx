import { Button } from '@/components/ui/button'
import { EditCardProps } from '../editCard-layout'
import { deleteDashboard } from '@/app/(protected)/dashboard/_api-wrapper/delete-dashboard'

const DeleteDashboardButton: React.FC<EditCardProps> = ({ dashboardId }) => {
  const handleDelete = async () => {
    try {
      if (dashboardId) {
        await deleteDashboard(dashboardId)
      }
    } catch (error) {
      console.error('Error deleting Dashboard:', error)
    }
  }

  return (
    <Button className='mt-10 h-[50px] w-[230px]' onClick={handleDelete}>
      대시보드 삭제하기
    </Button>
  )
}

export default DeleteDashboardButton
