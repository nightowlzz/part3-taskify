'use client'
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from 'react-hook-form'

import { ReactNode, useEffect } from 'react'

export const requiredValidate = {
  required: {
    value: true,
    message: '',
  },
}

export const columnTitleValidate = {
  maxLength: {
    value: 15,
    message: '컬럼 이름은 열다섯 자 이하로 작성해주세요.',
  },
}

interface validationRulesProps {
  required?: {
    value: boolean
    message: string
  }
  pattern?: {
    value: RegExp
    message: string
  }
}

interface LabelProps {
  label: string
  isRequired?: boolean
  htmlFor: string
}

export const getInputClass = (hasError: boolean) =>
  `box-border flex gap-2 rounded-lg border px-4 py-[0.6875rem] text-[0.875rem] md:text-[1rem]  placeholder:text-gray40 focus-within:border-violet outline-0 dark:bg-black80 ${
    hasError ? 'border-red' : 'border-gray30'
  }`

export function InputWrapper({ children }: { children: ReactNode }) {
  return <div className='flex flex-col gap-2'>{children}</div>
}

export function InputWithImageWrapper({
  children,
  hasError,
}: {
  children: ReactNode
  hasError: boolean
}) {
  return (
    <div
      className={`placeholder:text-gray40 dark:bg-black80 box-border flex gap-2 rounded-lg border bg-white px-4 py-[0.6875rem] focus-within:border-violet ${
        hasError ? 'border-red' : 'border-gray30'
      }`}
    >
      {children}
    </div>
  )
}

export function useInputField(
  id: string,
  validationRules: validationRulesProps,
) {
  const {
    register,
    formState: { errors, isLoading, isValid },
    setValue,
    watch,
    setError,
  } = useFormContext()
  const errorMessage = (errors[id]?.message as string) || ''

  return {
    register: register(id, validationRules),
    hasError: !!errors[id],
    errorMessage,
    isLoading,
    setValue,
    watch,
    isValid,
    setError,
  }
}

export function ErrorMessage({ message }: { message: string }) {
  return message ? <p className='text-[0.875rem] text-red'>{message}</p> : null
}

export function Label({ label, isRequired, htmlFor }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className='dark:text-white8 text-black md:text-[1.125rem]'
    >
      {label}
      {isRequired && <p className='inline text-violet'> *</p>}
    </label>
  )
}

export function InputForm({
  children,
  onSubmit,
  mode = 'onChange',
}: {
  children: ReactNode
  onSubmit: SubmitHandler<FieldValues>
  mode?: 'onChange' | 'onBlur'
}) {
  // [ ] isLoading으로 disabled
  // const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<FieldValues>({ mode: mode, reValidateMode: mode })

  const submit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    // setIsLoading(true);
    try {
      await onSubmit(data)
      document.body.style.overflowY = 'auto'
    } catch (error) {
      // setIsLoading(false);
    } finally {
      // setIsLoading(false);
    }
  }

  useEffect(() => {
    if (methods.formState.isSubmitSuccessful) {
      methods.reset()
    }
  }, [methods.formState.isSubmitSuccessful, methods])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submit)} noValidate>
        {children}
      </form>
    </FormProvider>
  )
}

export interface CommonInputProps {
  label: string
  placeholder: string
  id: string
  isRequired?: boolean
  apiError?: string
  initialValue?: string
  validationRules?: {
    required?: {
      value: boolean
      message: string
    }
    pattern?: {
      value: RegExp
      message: string
    }
    maxLength?: {
      value: number
      message: string
    }
    minLength?: {
      value: number
      message: string
    }
    validate?: {
      [key: string]: (value: string) => string | boolean
    }
  }
  errorText?: string
}

function TextInput({
  label,
  placeholder,
  id,
  validationRules = requiredValidate,
  initialValue = '',
  isRequired = false,
  errorText = '',
}: CommonInputProps) {
  const { register, errorMessage } = useInputField(id, validationRules)

  return (
    <InputWrapper>
      <Label label={label} htmlFor={id} isRequired={isRequired} />
      <input
        id={id}
        type='text'
        className={getInputClass(!!errorText)}
        placeholder={placeholder}
        defaultValue={initialValue}
        {...register}
      />
      <ErrorMessage message={errorMessage || errorText} />
    </InputWrapper>
  )
}

InputForm.TextInput = TextInput
