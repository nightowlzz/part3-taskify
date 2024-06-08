import { Feature } from './feature'

export const FeaturesSection = () => (
  <section className='w-full'>
    <h2 className='mt-[90px] text-2xl font-bold'>
      생산선을 높이는 다양한 설정 ⚡
    </h2>
    <div className='mt-12 grid grid-cols-1 gap-x-5 md:grid-cols-2 xl:grid-cols-3'>
      <Feature
        imageSrc='/home-group1.png'
        title='대시보드 설정'
        description='대시보드 사진과 이름을 변경할 수 있어요.'
        imageWidth={300}
        imageHeight={123}
      />
      <Feature
        imageSrc='/home-group2.png'
        title='초대'
        description='새로운 팀원을 초대할 수 있어요.'
        imageWidth={300}
        imageHeight={230}
      />
      <Feature
        imageSrc='/home-group3.png'
        title='구성원'
        description='구성원을 초대하고 내보낼 수 있어요.'
        imageWidth={300}
        imageHeight={195}
      />
    </div>
  </section>
)
