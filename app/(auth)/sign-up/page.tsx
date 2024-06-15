import { FormHeader } from '@/components/auth/form-header'
import { SignUpForm } from './_component/sign-up-form'
import { FormFooter } from '@/components/auth/form-footer'

const SignUpPage = () => {
  return (
    <div className='flex w-full max-w-xl flex-col items-center'>
      <FormHeader text={'첫 방문을 환영합니다!'} />
      <SignUpForm />
      <FormFooter
        text={'이미 회원이신가요?'}
        linkText={'로그인하기'}
        href={'/sign-in'}
      />
    </div>
  )
}

export default SignUpPage
