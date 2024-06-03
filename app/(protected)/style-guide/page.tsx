import Modal from '@/components/modal/modal-layout'

const StyleGuide = () => {
  return (
    <div className='mx-auto flex max-w-[600px] flex-col p-[30px]'>
      <h2 className='py-[30px]'>모달</h2>
      <div>
        <Modal text='할 일 카드' order='taskCard' />
        <Modal text='할 일 생성' order='taskCardCreate' confirmText='생성' />
        <Modal text='할 일 수정' order='taskCardEdit' confirmText='수정' />
        <Modal text='컬럼 추가' order='columnAdd' confirmText='생성' />
        <Modal text='컬럼 수정' order='columnEdit' confirmText='변경' />
        <Modal text='기본 확인 취소 모달' order='baseAlert'>
          텍스트 내용
        </Modal>
      </div>
    </div>
  )
}

export default StyleGuide
