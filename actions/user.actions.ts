"use server";

import { UserService } from "@/services/user.service";
import { UserFormState, UserFormSchema, LoginFormSchema, LoginFormState } from "@/lib/definitions";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function signUp(
  state: UserFormState,
  formData: FormData
): Promise<UserFormState> {
  const validatedFields = UserFormSchema.safeParse({
    name: formData.get('name'),
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    const errorMessages = validatedFields.error.flatten().fieldErrors;
    return {
      error: {
        name: errorMessages.name?.[0],
        email: errorMessages.email?.[0],
        username: errorMessages.username?.[0],
        password: errorMessages.password?.[0],
      },
    };
  }

  const userService = new UserService();

  try {
    const user = await userService.createUser({
      name: formData.get('name') as string,
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });

    await createSession(String(user.id));
  } catch (error) {
    return { error: { email: (error as Error).message } };
  }

  redirect('/dashboard');
}

export async function signIn(state: LoginFormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    const errorMessages = validatedFields.error.flatten().fieldErrors;
    return {
      error: {
        email: errorMessages.email?.[0],
        password: errorMessages.password?.[0],
      },
    };
  }

  const { email, password } = validatedFields.data;
  const userService = new UserService();

  try {
    const user = await userService.verifyCredentials(email, password);

    if (!user) {
      return { message: "Email ou palavra-passe incorretos" };
    }

    await createSession(String(user.id));
  } catch (error) {
    return { message: (error as Error).message };
  }

  redirect("/dashboard"); // já estava fora do try/catch aqui, ok
}

export async function signOut() {
  await deleteSession();
  redirect("/login"); // ok, fora de qualquer try/catch
}