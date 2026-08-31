
// app/guests/new/page.tsx

"use client";

import { useActionState } from "react"; 
import { useFormStatus } from "react-dom"; 
import Link from "next/link"; 
import { createGuest } from "@/actions/guest.actions";

import { SirflerFooter } from "@/components/sirfler-footer";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="group flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#b96f73] px-5 py-4 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(185,111,115,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#aa6064] hover:shadow-[0_16px_34px_rgba(185,111,115,0.26)] disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60"
    >
      {pending ? (
        <>
          <SpinnerIcon />
          <span>A adicionar convidado...</span>
        </>
      ) : (
        <>
          <PlusIcon />
          <span>Adicionar convidado</span>
          <ArrowIcon />
        </>
      )}
    </button>
  );
}

export default function NewGuestPage() {
  const [state, formAction] = useActionState(createGuest, undefined);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f2ec] text-[#4a3933]">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -left-44 -top-44 h-[31rem] w-[31rem] rounded-full bg-[#efd7d2]/35 blur-[105px]" />
        <div className="absolute -bottom-52 -right-44 h-[35rem] w-[35rem] rounded-full bg-[#e2e0ca]/40 blur-[110px]" />
        <div className="absolute left-1/2 top-[30%] h-[20rem] w-[20rem] -translate-x-1/2 rounded-full bg-[#f0e1c9]/30 blur-[100px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-2xl">
          {/* =================================================
              VOLTAR
          ================================================== */}

          <Link
            href="/dashboard"
            className="group mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#806c64] transition hover:text-[#5f4d47]"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-1">
              <BackIcon />
            </span>

            Voltar ao dashboard
          </Link>

          {/* =================================================
              CARD PRINCIPAL
          ================================================== */}

          <section className="relative overflow-hidden rounded-[34px] border border-[#e0d4ca] bg-[#fffdfa] shadow-[0_25px_80px_rgba(77,55,44,0.09)]">
            {/* Barra superior */}
            <div className="absolute left-1/2 top-0 z-20 h-[3px] w-24 -translate-x-1/2 rounded-b-full bg-[#c49a58]" />

            {/* Ornamentos */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-[-5px] top-5 opacity-60"
            >
              <BellOrnament />
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[-5px] left-[-5px] rotate-[-15deg] opacity-45"
            >
              <LeafOrnament />
            </div>

            {/* =================================================
                HEADER
            ================================================== */}

            <div className="relative border-b border-[#eee3db] px-6 py-8 text-center sm:px-10 sm:py-10">
              <div className="mx-auto flex w-fit items-center gap-2 text-[#c39b59]">
                <span className="h-px w-7 bg-[#dfc7a0]" />
                <TinyHeart />
                <span className="h-px w-7 bg-[#dfc7a0]" />
              </div>

              <p className="mt-4 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#a68277]">
                Gestão do Chá de Bebé
              </p>

              <h1 className="mt-2 font-serif text-3xl tracking-[-0.02em] text-[#4b3933] sm:text-4xl">
                Novo convidado
              </h1>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#7b6c65]">
                Adiciona alguém especial à celebração da chegada da
                pequena Hilka.
              </p>
            </div>

            {/* =================================================
                FORMULÁRIO
            ================================================== */}

            <div className="relative px-6 py-7 sm:px-10 sm:py-9">
              <form action={formAction} className="space-y-6">
                {/* Nome */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2.5 block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#947970]"
                  >
                    Nome do convidado
                  </label>

                  <div className="relative">
                    <div className="pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 items-center text-[#b2847d]">
                      <UserIcon />
                    </div>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Ex.: Ana Maria"
                      required
                      aria-invalid={Boolean(state?.error?.name)}
                      aria-describedby={
                        state?.error?.name
                          ? "name-error"
                          : undefined
                      }
                      className="w-full rounded-2xl border border-[#dfd3ca] bg-[#fcfaf7] py-4 pl-11 pr-4 text-sm text-[#4f403a] outline-none placeholder:text-[#b4a49d] transition-all duration-200 focus:border-[#c58b88] focus:bg-white focus:ring-4 focus:ring-[#e8c9c7]/30"
                    />
                  </div>

                  {state?.error?.name && (
                    <p
                      id="name-error"
                      className="mt-2 flex items-center gap-1.5 text-xs font-medium text-[#a66262]"
                    >
                      <AlertIcon />
                      {state.error.name}
                    </p>
                  )}
                </div>

                {/* Informação sobre o link */}
                <div className="rounded-[22px] border border-[#eadccd] bg-[#fbf7f1] p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f2e3de] text-[#aa7370]">
                      <LinkIcon />
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-[#5c4841]">
                        Um convite personalizado será criado
                      </p>

                      <p className="mt-1 text-[11px] leading-5 text-[#81716a]">
                        Depois de adicionar o convidado, ele receberá
                        um link único para consultar o convite e
                        confirmar a presença.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mensagem geral */}
                {state?.message && (
                  <div className="rounded-2xl border border-[#dfd4ca] bg-[#faf7f3] px-4 py-3">
                    <p className="text-sm leading-5 text-[#6f6059]">
                      {state.message}
                    </p>
                  </div>
                )}

                {/* Submit */}
                <div className="pt-1">
                  <SubmitButton />
                </div>
              </form>

              {/* Rodapé decorativo */}
              <div className="mt-8 flex items-center justify-center gap-2 text-[#c39b59]">
                <span className="h-px w-10 bg-[#dfc9a3]" />
                <TinySparkle />
                <span className="h-px w-10 bg-[#dfc9a3]" />
              </div>
            </div>
          </section>

          {/* =================================================
              FOOTER
          ================================================== */}

          <p className="mt-5 text-center text-[9px] font-medium uppercase tracking-[0.24em] text-[#a38b82]">
            Chá de Bebé da Hilka · 17 Outubro 2026
          </p>
            <SirflerFooter />
        </div>
      </div>
    </main>
  );
}

/* =============================================================
   ÍCONES
============================================================= */

function BackIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <path d="m11 18-6-6 6-6" />
    </svg>
  );
}

function PlusIcon() {
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
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
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
        strokeOpacity=".3"
      />
      <path d="M21 12a9 9 0 0 0-9-9" />
    </svg>
  );
}

function UserIcon() {
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
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-4 3.1-6 7-6s6.2 2 7 6" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" />
      <path d="M14 11a5 5 0 0 0-7.1-.1l-2 2a5 5 0 0 0 7.1 7.1l1.1-1.1" />
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
      width="56"
      height="70"
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
      width="72"
      height="125"
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