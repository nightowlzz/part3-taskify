import { FeaturesSection } from './_components/features-section'
import { Footer } from './_components/footer'
import { HeroSection } from './_components/hero-section'
import { NavBar } from './_components/navbar'
import { Section } from './_components/section'

export default function Home() {
  return (
    <>
      <NavBar />
      <main className='min-h-screen bg-black pb-40 pt-16 text-white'>
        <div className='mx-auto flex flex-col items-center px-5 md:px-0 xl:w-[1200px]'>
          <HeroSection />
          <Section
            title='Point 1'
            text1='일의 우선순위를'
            text2='관리하세요.'
            imageSrc='/home-section1.png'
            orderClass=''
          />
          <Section
            title='Point 2'
            text1='해야 할 일을'
            text2='등록하세요.'
            imageSrc='/home-section2.png'
            orderClass='xl:order-2'
          />
          <FeaturesSection />
        </div>
      </main>
      <Footer />
    </>
  )
}
