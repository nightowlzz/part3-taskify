import BackButton from '@/components/edit-card/_component/backButton'
import EditDashboardName from '@/components/edit-card/_component/editDashboardName'
import MembersList from '@/components/edit-card/_component/membersList'
import InvitationsList from '@/components/edit-card/_component/invitationsList'
import DeleteDashboardButton from '@/components/edit-card/_component/deleteDashboardButton'
import { Dashboard } from '@/app/(protected)/dashboard/_api-wrapper/fetch-dashboards'

export interface EditCardProps {
  dashboard?: Dashboard
  dashboardId?: number
}

const EditCard: React.FC<EditCardProps> = ({ dashboard, dashboardId }) => {
  return (
    <div className='ml-5'>
      {/* 돌아가기 버튼 */}
      <BackButton dashboardId={dashboardId} />
      {/* 대시보드 이름변경 */}
      <EditDashboardName dashboard={dashboard} dashboardId={dashboardId} />
      {/* 구성원 */}
      <MembersList dashboard={dashboard} dashboardId={dashboardId} />
      {/* 초대내역 */}
      <InvitationsList dashboardId={dashboardId} />
      {/* 대시보드 삭제 */}
      <DeleteDashboardButton dashboardId={dashboardId} />
    </div>
  )
}

export default EditCard
