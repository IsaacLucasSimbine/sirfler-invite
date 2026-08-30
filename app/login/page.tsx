"use client";

import { signIn } from "@/actions/user.actions";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="w-full rounded-md bg-black p-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "A entrar..." : "Entrar"}
    </button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useActionState(signIn, undefined);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Entrar</h1>

          <p className="text-gray-500">
            Introduza os seus dados para aceder à sua conta.
          </p>
        </div>

        <form action={formAction} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email">Email</label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-md border p-2"
            />

            {state?.error?.email && (
              <p className="mt-1 text-sm text-red-500">
                {state.error.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password">Palavra-passe</label>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full rounded-md border p-2"
            />

            {state?.error?.password && (
              <p className="mt-1 text-sm text-red-500">
                {state.error.password}
              </p>
            )}
          </div>

          {/* Erro geral */}
          {state?.message && (
            <p className="text-sm text-red-500">
              {state.message}
            </p>
          )}

          {/* Botão */}
          <SubmitButton />
        </form>

        <p className="text-center text-sm text-gray-500">
          Não tem conta?{" "}
          <Link href="/signup" className="text-black underline">
            Criar conta
          </Link>
        </p>
      </div>
    </main>
  );
}