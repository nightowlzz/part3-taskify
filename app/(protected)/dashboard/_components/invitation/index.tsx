import MagnifyingGlass from './magnifying-glass'
import { api } from '@/lib/utils'
import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useRef,
  useState,
} from 'react'

import { useSetRecoilState } from 'recoil'
import { Invitations } from '@/lib/type'
import InvitationList from './invitation-list'
import NoInvitation from './no-invitation'
import useInfiniteScroll from '../../_hook/useInfiniteScroll'
import { dashboardState } from '../../_recoil/dashboard'
import { DashboardProps } from '../../_recoil/props'
import { putInvitation } from '../../_api-wrapper/put-invitation'
import { fetchDashboards } from '../../_api-wrapper/fetch-dashboards'
import { toast } from 'sonner'

export default function InvitationDashboard({
  setDashboards,
  page,
}: {
  setDashboards: (value: DashboardProps[]) => void
  page: number
}) {
  const setDashboardData = useSetRecoilState(dashboardState)
  const [invitations, setInvitations] = useState<Invitations[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [cursorId, setCursorId] = useState('')

  const [searchValue, setSearchValue] = useState('')

  const target = useRef<HTMLDivElement>(null)

  const fetchInvitations = async (cursorId = '', searchValue = '') => {
    const cursorQuery = cursorId ? `&cursorId=${cursorId}` : ''
    const searchQuery = searchValue ? `&title=${searchValue}` : ''
    const { data } = await api.get(
      `invitations?size=6${cursorQuery}${searchQuery}`,
    )
    return data // 데이터 반환
  }

  const getInvitations = useCallback(async () => {
    if (cursorId === null) return
    const data = await fetchInvitations(cursorId, searchValue)
    setInvitations((prev) => [...prev, ...data.invitations])
    setCursorId(data.cursorId || null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursorId])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const onIntersect: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0) {
        getInvitations()
      }
    })
  }

  const handleEnterPress = async (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      const data = await fetchInvitations('', searchValue)
      setHasSearched(true)
      setInvitations(data.invitations)
      setCursorId(data.cursorId)
    }
  }

  const handleInvitation = async (invitationId: number, accepted: boolean) => {
    await putInvitation(invitationId, accepted)
    if (accepted) {
      const data = await fetchDashboards()
      toast.success('초대를 수락하셨습니다')
      if (data) {
        setDashboardData(data)
        const result = await fetchDashboards(page, 5, 'pagination')
        setDashboards(result.dashboards)
      }
    }
    setInvitations(
      invitations.filter((invitation) => invitation.id !== invitationId),
    )
  }

  useInfiniteScroll({ target, onIntersect: onIntersect, size: cursorId })

  return (
    <div className='text-black80 dark:bg-black90 dark:text-white8 rounded-lg border-none bg-white px-[1.75rem] pb-[.0625rem] pt-8'>
      <h2 className='mb-5 text-[1.25rem] font-bold  md:text-[1.5rem]'>
        초대받은 대시보드
      </h2>
      {(invitations.length > 0 || hasSearched) && (
        <div className='dark:bg-black80 mb-6 flex w-full gap-2 rounded-[.375rem] border-[.0625rem] px-4 py-2'>
          <MagnifyingGlass />
          <input
            onChange={handleInputChange}
            placeholder='검색'
            className='dark:bg-black80 w-full text-[.875rem] focus:outline-none md:text-base'
            onKeyDown={handleEnterPress}
          ></input>
        </div>
      )}
      {invitations.length > 0 ? (
        <InvitationList
          list={invitations}
          handleInvitation={handleInvitation}
        />
      ) : invitations.length === 0 && searchValue.trim() === '' ? (
        <NoInvitation />
      ) : (
        <NoInvitation />
      )}
      {cursorId !== null && <div ref={target}></div>}
    </div>
  )
}
