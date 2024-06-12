import NoInvitationIcon from "./no-invitation-icon";

export default function NoInvitation() {
  return (
    <div className='mb-[9.625rem] mt-[5.3125rem] flex w-full flex-col items-center md:mb-[7.9375rem] md:mt-[2.9375rem]'>
      <NoInvitationIcon className='h-[3.125rem] w-[3.125rem] md:h-[6.25rem] md:w-[6.25rem] ' />
      <div className=' text-[.875rem] text-gray40 md:text-base'>아직 초대받은 데이터가 없어요</div>
    </div>
  );
}
