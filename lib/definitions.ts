import * as z from "zod";

export const UserFormSchema = z.object({
    email: z.string().email({ message: "Endereço de email inválido" }),
    username: z.string().min(3, { message: "O nome de usuário deve ter pelo menos 3 caracteres" }).optional(),
    name: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres" }).optional(),
    password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

export type UserFormState = 
|{
    error?:{
        name?: string,
        email?: string,
        username?: string,
        password?: string,
    },
    message?: string,
}
| undefined;

export type SessionPayload = { userId: string; };


export const LoginFormSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "A palavra-passe é obrigatória"),
});

export type LoginFormState =
  | {
      error?: {
        email?: string;
        password?: string;
      };
      message?: string;
    }
  | undefined;