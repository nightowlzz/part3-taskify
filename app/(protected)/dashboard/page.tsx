import CreateDashboard from './_components/create-dashboard'
import FetchDashboardBtn from './_components/api_test/fetch-dashboard-btn'
import DashboardCta from './_components/dashboardCta'

const DashboardPage = () => {
  return (
    <main>
      <div
        className='ml-[13px] mt-[10px] grid auto-rows-auto grid-cols-1 gap-y-[8px] 
		 md:w-[504px] md:grid-cols-2 md:gap-x-[10px] md:gap-y-[10px] 
		 xl:w-[1024px] xl:grid-cols-3 xl:gap-x-[13px] xl:gap-y-[10px] '
      >
        <CreateDashboard mode={"main"}/>
        <DashboardCta
          id={8689}
          color={'#76A5EA'}
          createdByMe={true}
          title={'hi'}
        />
      </div>
      <FetchDashboardBtn />
    </main>
  )
}

export default DashboardPage
