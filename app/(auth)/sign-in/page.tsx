import { FormHeader } from '@/components/auth/form-header'
import { SignInForm } from './_component/sign-in-form'
import { FormFooter } from '@/components/auth/form-footer'

const SignInPage = () => {
  return (
    <div className='flex w-full max-w-xl flex-col items-center'>
      <FormHeader text={'오늘도 만나서 반가워요!'} />
      <SignInForm />
      <FormFooter
        text={'회원이 아니신가요?'}
        linkText={'회원가입하기'}
        href={'/sign-up'}
      />
    </div>
  )
}

export default SignInPage
