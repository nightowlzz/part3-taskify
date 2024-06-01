import Modal from '@/components/modal/modal-layout'

const StyleGuide = () => {
  return (
    <div className='mx-auto flex w-[600px] flex-col py-[30px]'>
      <h2 className='py-[30px]'>모달</h2>
      <div>
        <Modal text='할 일 카드' order='taskCard' />
        <Modal text='할 일 생성' order='taskCardCreate' />
        <Modal text='할 일 수정' order='taskCardEdit' />
        <Modal text='컬럼 추가' order='columnAdd' />
        <Modal text='컬럼 수정' order='columnEdit' />
      </div>
    </div>
  )
}

export default StyleGuide
