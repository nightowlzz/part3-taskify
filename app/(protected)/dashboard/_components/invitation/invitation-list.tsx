'use client'

import { Invitations } from '@/lib/type'

interface Props {
  list?: Invitations[]
  handleInvitation: (invitationId: number, accepted: boolean) => void
}

export default function InvitationList({ list, handleInvitation }: Props) {
  const buttonClass =
    'flex w-full items-center justify-center rounded py-[.4375rem] text-[.75rem] font-medium md:w-[4.5rem] lg:w-[5.25rem]'
  const labelClass = 'text-gray40 text-[.875rem] md:text-base'
  const mainLableClass = 'hidden md:block font-normal'

  return (
    <>
      <div>
        <div className={`flex ${labelClass} mb-[1.25rem] md:justify-start`}>
          <div className={`${mainLableClass} grow text-base`}>이름</div>
          <div
            className={`${mainLableClass} text-base md:w-[7rem] lg:w-[18.875rem]`}
          >
            초대자
          </div>
          <div
            className={`${mainLableClass} text-base md:w-[9.625rem] lg:w-[19.75rem]`}
          >
            수락 여부
          </div>
        </div>
      </div>
      {list?.map((item: Invitations, idx: number) => {
        return (
          <div key={idx.toString()} className='md:mb-[1.25rem]'>
            <div className=' flex flex-col md:mb-[1.25rem] md:flex-row md:items-center'>
              <div className=' mb-[.625rem] flex grow md:mb-0 md:flex-col'>
                <div className={`w-[53px] md:hidden ${labelClass}`}>이름</div>
                <div className='flex items-center'>
                  <div className='text-[.875rem] md:text-base'>
                    {item.dashboard.title}
                  </div>
                </div>
              </div>
              <div className='flex md:w-[7rem] md:flex-col lg:w-[18.875rem]'>
                <div className={`w-[53px] md:hidden ${labelClass}`}>초대자</div>
                <div className='text-[.875rem] md:text-base'>
                  {item.inviter.nickname}
                </div>
              </div>
              <div className='my-4 flex gap-[.625rem] md:my-0 md:w-[9.625rem] lg:w-[19.75rem]'>
                <button
                  className={`bg-violet text-white ${buttonClass}`}
                  onClick={() => handleInvitation(item.id, true)}
                >
                  수락
                </button>
                <button
                  className={`border-gray30 dark:border-black60 dark:bg-black60 dark:text-white8 border-[.0625rem] text-violet ${buttonClass}`}
                  onClick={() => handleInvitation(item.id, false)}
                >
                  거절
                </button>
              </div>
            </div>
            {idx !== list.length - 1 && (
              <div className='dark:border-black60 mb-4 w-full border-b md:mb-[1.25rem]'></div>
            )}
          </div>
        )
      })}
    </>
  )
}
