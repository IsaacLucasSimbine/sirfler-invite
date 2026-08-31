"use client";

import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { signIn } from "@/actions/user.actions";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="
        group
        flex
        w-full
        items-center
        justify-center
        gap-2.5
        rounded-2xl
        bg-[#B96F73]
        px-5
        py-4
        text-sm
        font-semibold
        text-white
        shadow-[0_12px_30px_rgba(185,111,115,0.20)]
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:bg-[#A96064]
        hover:shadow-[0_17px_35px_rgba(185,111,115,0.27)]
        active:translate-y-0
        disabled:cursor-not-allowed
        disabled:translate-y-0
        disabled:opacity-60
      "
    >
      {pending ? (
        <>
          <SpinnerIcon />
          <span>A entrar...</span>
        </>
      ) : (
        <>
          <span>Entrar</span>

          <ArrowIcon />
        </>
      )}
    </button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useActionState(signIn, undefined);

  return (
    <main
      className={`${inter.className} relative min-h-screen overflow-hidden bg-[#F8F3ED] text-[#4B3934] antialiased`}
    >
      {/* =====================================================
          BACKGROUND DECORATIVO
      ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        {/* Glow rosa */}
        <div className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#EFD5D1]/45 blur-[100px]" />

        {/* Glow champagne */}
        <div className="absolute left-1/2 top-[12%] h-[280px] w-[280px] -translate-x-1/2 rounded-full bg-[#F1E1C8]/45 blur-[90px]" />

        {/* Glow sage */}
        <div className="absolute -bottom-48 -right-40 h-[450px] w-[450px] rounded-full bg-[#E1E3D4]/45 blur-[110px]" />
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-[450px]">

          {/* =================================================
              CABEÇALHO
          ================================================== */}

          <div className="mb-6 text-center">
            <div className="mx-auto flex w-fit items-center gap-3 text-[#C49B58]">
              <span className="h-px w-8 bg-[#DDC69D]" />

              <TinyHeart />

              <span className="h-px w-8 bg-[#DDC69D]" />
            </div>

            <p className="mt-4 text-[9px] font-semibold uppercase tracking-[0.32em] text-[#A48177]">
              Chá de Bebé
            </p>

            <h1 className="mt-2 font-serif text-[34px] tracking-[-0.025em] text-[#503C36]">
              Hilka
            </h1>

            <p className="mx-auto mt-2 max-w-[300px] text-sm leading-6 text-[#80716B]">
              Entre para preparar e acompanhar esta celebração tão
              especial.
            </p>
          </div>

          {/* =================================================
              CARD
          ================================================== */}

          <section className="relative overflow-hidden rounded-[34px] border border-[#E3D6CC] bg-[#FFFDFC] shadow-[0_30px_90px_rgba(87,61,48,0.10)]">

            {/* Linha superior */}
            <div className="absolute left-1/2 top-0 z-20 h-[3px] w-24 -translate-x-1/2 rounded-b-full bg-[#C69B57]" />

            {/* Sino */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-2 top-3 z-10 opacity-70"
            >
              <BellOrnament />
            </div>

            {/* Folhagem */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[-12px] left-[-10px] rotate-[-16deg] opacity-40"
            >
              <LeafOrnament />
            </div>

            {/* =================================================
                TÍTULO
            ================================================== */}

            <div className="relative px-6 pb-6 pt-9 text-center sm:px-9">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#F5E7E2] text-[#B87373]">
                <LockIcon />
              </div>

              <h2 className="mt-5 font-serif text-[27px] text-[#4B3934]">
                Bem-vindo(a)
              </h2>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#7D6E67]">
                Introduza os seus dados para continuar para a gestão
                do evento.
              </p>
            </div>

            <div className="mx-6 h-px bg-[#EEE3DB] sm:mx-9" />

            {/* =================================================
                FORM
            ================================================== */}

            <div className="relative px-6 py-7 sm:px-9 sm:py-8">
              <form action={formAction} className="space-y-5">

                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8F756C]"
                  >
                    Email
                  </label>

                  <div className="relative">
                    <div className="pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 text-[#B2877D]">
                      <MailIcon />
                    </div>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="nome@exemplo.com"
                      required
                      aria-invalid={Boolean(state?.error?.email)}
                      aria-describedby={
                        state?.error?.email
                          ? "email-error"
                          : undefined
                      }
                      className="
                        w-full
                        rounded-2xl
                        border
                        border-[#E0D4CB]
                        bg-[#FCF9F6]
                        py-3.5
                        pl-11
                        pr-4
                        text-sm
                        text-[#4B3A35]
                        outline-none
                        placeholder:text-[#B2A29B]
                        transition-all
                        duration-200
                        focus:border-[#C88B8B]
                        focus:bg-white
                        focus:ring-4
                        focus:ring-[#F1DAD8]/60
                      "
                    />
                  </div>

                  {state?.error?.email && (
                    <p
                      id="email-error"
                      className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[#A45F61]"
                    >
                      <AlertIcon />
                      {state.error.email}
                    </p>
                  )}
                </div>

                {/* PASSWORD */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8F756C]"
                  >
                    Palavra-passe
                  </label>

                  <div className="relative">
                    <div className="pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 text-[#B2877D]">
                      <LockIcon />
                    </div>

                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="Introduza a sua palavra-passe"
                      required
                      aria-invalid={Boolean(
                        state?.error?.password
                      )}
                      aria-describedby={
                        state?.error?.password
                          ? "password-error"
                          : undefined
                      }
                      className="
                        w-full
                        rounded-2xl
                        border
                        border-[#E0D4CB]
                        bg-[#FCF9F6]
                        py-3.5
                        pl-11
                        pr-4
                        text-sm
                        text-[#4B3A35]
                        outline-none
                        placeholder:text-[#B2A29B]
                        transition-all
                        duration-200
                        focus:border-[#C88B8B]
                        focus:bg-white
                        focus:ring-4
                        focus:ring-[#F1DAD8]/60
                      "
                    />
                  </div>

                  {state?.error?.password && (
                    <p
                      id="password-error"
                      className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[#A45F61]"
                    >
                      <AlertIcon />
                      {state.error.password}
                    </p>
                  )}
                </div>

                {/* ERRO GERAL */}
                {state?.message && (
                  <div className="rounded-2xl border border-[#E6CECA] bg-[#FBF0EF] px-4 py-3.5">
                    <p className="text-xs leading-5 text-[#8F5E5E]">
                      {state.message}
                    </p>
                  </div>
                )}

                {/* LOGIN */}
                <div className="pt-1">
                  <SubmitButton />
                </div>
              </form>

              {/* =================================================
                  NOVA CONTA
              ================================================== */}

              <div className="my-7 flex items-center gap-3">
                <span className="h-px flex-1 bg-[#E7DDD6]" />

                <span className="text-[9px] font-medium uppercase tracking-[0.18em] text-[#A9948C]">
                  Ainda não tem conta?
                </span>

                <span className="h-px flex-1 bg-[#E7DDD6]" />
              </div>

              <Link
                href="/signup"
                className="
                  group
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border
                  border-[#D6B5AF]
                  bg-[#FFFDFC]
                  px-5
                  py-3.5
                  text-sm
                  font-semibold
                  text-[#9D6667]
                  transition-all
                  duration-200
                  hover:border-[#C9908F]
                  hover:bg-[#FCF3F0]
                "
              >
                Criar uma conta

                <ArrowIcon />
              </Link>
            </div>
          </section>

          {/* =================================================
              ASSINATURA
          ================================================== */}

          <div className="mt-7 text-center">
            <div className="flex items-center justify-center gap-2 text-[#C49B58]">
              <span className="h-px w-8 bg-[#DFC9A1]" />
              <TinySparkle />
              <span className="h-px w-8 bg-[#DFC9A1]" />
            </div>

            <p className="mt-3 text-[10px] text-[#9B8880]">
              Uma celebração preparada com amor
            </p>

            <p className="mt-1 font-serif text-sm italic text-[#B07170]">
              17 de Outubro de 2026
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/* =============================================================
   ÍCONES
============================================================= */

function MailIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m5 7 7 6 7-6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="10" width="16" height="10" rx="2.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform duration-200 group-hover:translate-x-1"
      aria-hidden="true"
    >
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
      className="animate-spin"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        strokeOpacity=".25"
      />

      <path d="M21 12a9 9 0 0 0-9-9" />
    </svg>
  );
}

/* =============================================================
   ORNAMENTOS
============================================================= */

function TinyHeart() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M12 20S4.5 15.5 3.5 9.8C2.7 5.4 7.4 2.5 10.5 5.5L12 7l1.5-1.5c3.1-3 7.8-.1 7 4.3C19.5 15.5 12 20 12 20Z" />
    </svg>
  );
}

function TinySparkle() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 2 13.6 10.4 22 12l-8.4 1.6L12 22l-1.6-8.4L2 12l8.4-1.6L12 2Z"
        fill="currentColor"
        fillOpacity=".65"
      />
    </svg>
  );
}

function BellOrnament() {
  return (
    <svg
      width="52"
      height="64"
      viewBox="0 0 58 70"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M17.5 18C17.5 9.5 23.6 4 29 4C34.4 4 40.5 9.5 40.5 18"
        stroke="#C9A05D"
        strokeWidth="1.5"
      />

      <path
        d="M12 41C12 28.5 17.3 19 29 19C40.7 19 46 28.5 46 41L50 50H8L12 41Z"
        fill="#D8B875"
        fillOpacity=".12"
        stroke="#C9A05D"
        strokeWidth="1.5"
      />

      <path
        d="M26 50C26 55.5 28 58.5 29 58.5C30 58.5 32 55.5 32 50"
        stroke="#C9A05D"
        strokeWidth="1.5"
      />

      <path
        d="M29 59V66M22 66H36"
        stroke="#C9A05D"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function LeafOrnament() {
  return (
    <svg
      width="65"
      height="115"
      viewBox="0 0 72 125"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 120C20 97 26 75 32 55C38 36 49 20 66 6"
        stroke="#C9A05D"
        strokeWidth="1.2"
      />

      <path
        d="M20 96C11 89 8 82 10 74C19 77 24 84 20 96Z"
        fill="#CBB47E"
        fillOpacity=".16"
        stroke="#C9A05D"
      />

      <path
        d="M28 75C19 69 18 62 21 55C30 58 34 65 28 75Z"
        fill="#CBB47E"
        fillOpacity=".16"
        stroke="#C9A05D"
      />

      <path
        d="M38 51C32 44 33 37 37 32C44 36 44 43 38 51Z"
        fill="#CBB47E"
        fillOpacity=".16"
        stroke="#C9A05D"
      />

      <path
        d="M48 33C45 26 47 20 52 17C57 22 55 28 48 33Z"
        fill="#CBB47E"
        fillOpacity=".16"
        stroke="#C9A05D"
      />
    </svg>
  );
}