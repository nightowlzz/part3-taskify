import { z } from "zod";

export const signUpFormSchema = z
  .object({
    email: z.string().email({
      message: "이메일 형식으로 입력해 주세요.",
    }),
    name: z.string().min(2, {
      message: "이름은 최소 2글자 이상입니다.",
    }),
    password: z.string().min(8, {
      message: "8자 이상 입력해 주세요.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export const signInFormSchema = z.object({
  email: z.string().email({
    message: "이메일 형식으로 입력해 주세요.",
  }),
  password: z.string().min(8, {
    message: "8자 이상 입력해 주세요.",
  }),
});
