import { Facebook, Instagram, Mail } from 'lucide-react'

export const Footer = () => (
  <footer className='bg-block grid h-[100px] grid-cols-1 items-center border-t border-white bg-black px-20 text-white md:grid-cols-3'>
    <span className='text-muted-foreground'>@codeit - 2023</span>
    <div className='flex gap-x-8 xl:justify-center'>
      <span>Privacy Policy</span>
      <span>FAQ</span>
    </div>
    <div className='flex items-center gap-x-4 xl:justify-end'>
      <Mail />
      <Facebook />
      <Instagram />
    </div>
  </footer>
)
