import { getColumns } from '@/app/data/column'
import { getDashboardMembers } from '@/app/data/dashboard'
import { PageContainer } from '@/components/page-container'
import { Column } from './_component/column'
import { AddColumnButton } from './_component/add-column-button'

const DashboardIdPage = async ({
  params,
}: {
  params: { dashboardId: string }
}) => {
  const dashboardId = Number(params.dashboardId)
  const columns = await getColumns(dashboardId)
  const members = await getDashboardMembers(dashboardId)

  if (!columns) return <div>컬럼이 존재하지않습니다</div>
  if (!members) return <div>맴버가 존재하지 않습니다</div>

  return (
    <PageContainer>
      <div className='bg-stone-100 '>
        <div className='flex flex-col md:flex-row'>
          {columns.data.map((column, index) => (
            <Column
              key={column.id}
              members={members.members}
              dashboardId={dashboardId}
              columnId={column.id}
              isFirst={index === 0}
              title={column.title}
            />
          ))}
        </div>
      </div>
      <AddColumnButton dashboardId={dashboardId} />
    </PageContainer>
  )
}

export default DashboardIdPage
