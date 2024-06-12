import arrowBackward from '@/public/icons/arrow_backward_icon.svg';
import arrowForward from '@/public/icons/arrow_forward_icon.svg';
import disabledBackward from '@/public/icons/disabled_arrow_backward_icon.svg';
import disabledForward from '@/public/icons/disabled_arrow_forward_icon.svg';
import Image from 'next/image';

interface PageNationProps {
  size: 'large' | 'small' | 'free';
  isActiveBack: boolean;
  isActiveForward: boolean;
  onClickBack: () => void;
  onClickForward: () => void;
}
export default function PageNation({
  size,
  isActiveBack,
  isActiveForward,
  onClickBack,
  onClickForward,
}: PageNationProps) {
  const sizes = {
    large: { width: 'w-[2.5rem]', height: 'h-[2.5rem]' },
    small: { width: 'w-[2.25rem]', height: 'h-[2.25rem]' },
    free: { width: 'w-full', height: 'h-full' },
  };
  const { width, height } = sizes[size];
  return (
    <div className='flex'>
      <button
        className={`flex items-center justify-center border border-gray30 bg-white ${height} ${width} rounded-br-0 rounded-tr-0 rounded-bl-[0.25rem] rounded-tl-[0.25rem]`}
        onClick={onClickBack}
        disabled={!isActiveBack}
      >
        {isActiveBack ? (
          <Image width={16} height={16} src={arrowBackward.src} alt='뒤로가기' />
        ) : (
          <Image width={16} height={16} src={disabledBackward.src} alt='뒤로가기' />
        )}
      </button>
      <button
        className={`flex items-center justify-center border border-gray30 bg-white ${height} ${width} rounded-bl-0 rounded-tl-0 rounded-br-[0.25rem] rounded-tr-[0.25rem]`}
        onClick={onClickForward}
        disabled={!isActiveForward}
      >
        {isActiveForward ? (
          <Image width={16} height={16} src={arrowForward.src} alt='앞으로가기' />
        ) : (
          <Image width={16} height={16} src={disabledForward.src} alt='앞으로가기' />
        )}
      </button>
    </div>
  );
}
