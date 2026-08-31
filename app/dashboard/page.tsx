
// app/dashboard/page.tsx

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";
import { DeleteGuestButton } from "@/components/delete-guest-button";
import { SirflerFooter } from "@/components/sirfler-footer";

import { signOut } from "@/actions/user.actions";
import { GuestService } from "@/services/guest.service";
import { CopyLinkButton } from "@/components/copy-link-button";

type RsvpStatus = "PENDING" | "CONFIRMED" | "DECLINED";

function RsvpBadge({ status }: { status: RsvpStatus }) {
  const styles: Record<RsvpStatus, string> = {
    PENDING:
      "border-[#e5dccc] bg-[#faf6ee] text-[#907a60]",
    CONFIRMED:
      "border-[#d2dfcc] bg-[#f2f7ef] text-[#5f7659]",
    DECLINED:
      "border-[#e5cecc] bg-[#faf1f0] text-[#916565]",
  };

  const labels: Record<RsvpStatus, string> = {
    PENDING: "Pendente",
    CONFIRMED: "Confirmado",
    DECLINED: "Recusado",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${styles[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {labels[status]}
    </span>
  );
}

export default async function DashboardPage() {
  const session = (await cookies()).get("session");

  if (!session) {
    redirect("/login");
  }

  const guestService = new GuestService();
  const guests = await guestService.listGuests();

  const total = guests.length;

  const confirmed = guests.filter(
    (guest) => guest.rsvpStatus === "CONFIRMED"
  ).length;

  const declined = guests.filter(
    (guest) => guest.rsvpStatus === "DECLINED"
  ).length;

  const pending = guests.filter(
    (guest) => guest.rsvpStatus === "PENDING"
  ).length;

  const confirmedPercentage =
    total > 0 ? Math.round((confirmed / total) * 100) : 0;

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f2ec] text-[#4a3933]">
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-[#efd7d2]/30 blur-[100px]" />
        <div className="absolute -bottom-48 -right-40 h-[34rem] w-[34rem] rounded-full bg-[#e2e0cb]/35 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#b96f73] text-white shadow-sm">
                <BabyIcon />
              </div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#a78379]">
                Gestão do evento
              </p>
            </div>

            <h1 className="mt-3 font-serif text-3xl tracking-tight text-[#493731] sm:text-4xl">
              Chá de Bebé da Hilka
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#7b6b64]">
              Acompanha os convidados e as confirmações do teu evento
              num só lugar.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/convite"
              className="rounded-2xl border border-[#ded1c8] bg-white px-4 py-2.5 text-sm font-medium text-[#655650] transition hover:border-[#cfbbb0] hover:bg-[#fcfaf7]"
            >
              Ver convite
            </Link>

            <form action={signOut}>
              <button
                type="submit"
                className="rounded-2xl border border-[#ded1c8] bg-transparent px-4 py-2.5 text-sm font-medium text-[#7b6962] transition hover:border-[#cbb7ac] hover:bg-white"
              >
                Sair
              </button>
            </form>
          </div>
        </header>

        {/* =====================================================
            EVENT CARD
        ====================================================== */}

        <section className="relative mb-6 overflow-hidden rounded-[30px] border border-[#e1d5cb] bg-[#fffdfa] shadow-[0_14px_50px_rgba(77,55,44,0.06)]">
          <div className="absolute right-[-60px] top-[-60px] h-40 w-40 rounded-full border border-[#eadccf]" />
          <div className="absolute bottom-[-80px] left-[-50px] h-44 w-44 rounded-full border border-[#eee0d6]" />

          <div className="relative grid gap-6 p-6 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-[#c39b59]">
                <SparkleIcon />

                <span className="text-[9px] font-semibold uppercase tracking-[0.28em]">
                  O teu evento
                </span>
              </div>

              <div className="mt-3 flex flex-wrap items-end gap-x-8 gap-y-3">
                <div>
                  <p className="font-serif text-3xl text-[#4d3a34]">
                    17
                  </p>

                  <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#aa8477]">
                    Outubro 2026
                  </p>
                </div>

                <div className="h-10 w-px bg-[#e4d8ce]" />

                <div>
                  <p className="text-sm font-medium text-[#51413b]">
                    Marracuene
                  </p>

                  <p className="mt-1 text-xs text-[#897871]">
                    Horário: {guests.length > 0 ? "A confirmar" : "A confirmar"}
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/guests/new"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#b96f73] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(185,111,115,0.18)] transition hover:-translate-y-0.5 hover:bg-[#aa6064] hover:shadow-[0_14px_30px_rgba(185,111,115,0.24)]"
            >
              <PlusIcon />
              Adicionar convidado
            </Link>
          </div>
        </section>

        {/* =====================================================
            STATS
        ====================================================== */}

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total de convidados"
            value={total}
            icon={<UsersIcon />}
            tone="neutral"
          />

          <StatCard
            label="Confirmados"
            value={confirmed}
            icon={<CheckIcon />}
            tone="green"
          />

          <StatCard
            label="Aguardando resposta"
            value={pending}
            icon={<ClockIcon />}
            tone="gold"
          />

          <StatCard
            label="Não poderão ir"
            value={declined}
            icon={<CloseIcon />}
            tone="rose"
          />
        </section>

        {/* =====================================================
            PROGRESSO
        ====================================================== */}

        <section className="mt-6 overflow-hidden rounded-[28px] border border-[#e1d5cb] bg-[#fffdfa] shadow-[0_10px_35px_rgba(77,55,44,0.04)]">
          <div className="p-6 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#a4847b]">
                  Visão geral
                </p>

                <h2 className="mt-2 font-serif text-2xl text-[#4c3b35]">
                  Confirmações
                </h2>
              </div>

              <p className="text-sm text-[#756660]">
                <span className="font-semibold text-[#4e3b35]">
                  {confirmedPercentage}%
                </span>{" "}
                dos convidados confirmaram presença
              </p>
            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#eee7df]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#c78882] to-[#b96f73] transition-all"
                style={{ width: `${confirmedPercentage}%` }}
              />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
              <ProgressItem
                label="Confirmados"
                value={confirmed}
                color="text-[#61795d]"
              />

              <ProgressItem
                label="Pendentes"
                value={pending}
                color="text-[#a18461]"
              />

              <ProgressItem
                label="Recusados"
                value={declined}
                color="text-[#976766]"
              />
            </div>
          </div>
        </section>

        {/* =====================================================
            CONVIDADOS
        ====================================================== */}

        <section className="mt-6 overflow-hidden rounded-[30px] border border-[#e1d5cb] bg-[#fffdfa] shadow-[0_10px_35px_rgba(77,55,44,0.04)]">
          <div className="border-b border-[#eee4dc] px-6 py-5 sm:px-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#a4847b]">
                  Lista de convidados
                </p>

                <h2 className="mt-1.5 font-serif text-2xl text-[#4c3b35]">
                  Os teus convidados
                </h2>
              </div>

              <div className="rounded-full border border-[#e5d9d0] bg-[#faf7f3] px-3 py-1.5 text-xs font-medium text-[#766761]">
                {total} {total === 1 ? "convidado" : "convidados"}
              </div>
            </div>
          </div>

          {guests.length === 0 ? (
            <div className="px-6 py-16 text-center sm:px-7">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f4e7e1] text-[#ae7472]">
                <UsersIcon />
              </div>

              <h3 className="mt-4 font-serif text-xl text-[#4c3a34]">
                Ainda não tens convidados
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#7e6e67]">
                Adiciona o primeiro convidado para começares a
                acompanhar as confirmações.
              </p>

              <Link
                href="/guests/new"
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-[#b96f73] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#aa6064]"
              >
                <PlusIcon />
                Adicionar convidado
              </Link>
            </div>
          ) : (
            <>
{/* Desktop */}
<div className="hidden md:block">
  <div className="grid grid-cols-[1.5fr_1fr_1.2fr] gap-4 border-b border-[#eee4dc] bg-[#fcfaf7] px-7 py-3 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#a08a82]">
    <span>Convidado</span>
    <span>Estado</span>
    <span className="text-right">Ações</span>
  </div>

  <div className="divide-y divide-[#eee7df]">
    {guests.map((guest) => (
      <div
        key={guest.id}
        className="grid grid-cols-[1.5fr_1fr_1.2fr] items-center gap-4 px-7 py-4 transition hover:bg-[#fcfaf7]"
      >
        {/* Convidado */}
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f4e7e1] font-serif text-[#a86c6d]">
            {guest.name.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#4e3d37]">
              {guest.name}
            </p>

            <p className="mt-0.5 truncate text-[11px] text-[#8b7972]">
              /convite/{guest.publicToken}
            </p>
          </div>
        </div>

        {/* Estado */}
        <div>
          <RsvpBadge status={guest.rsvpStatus} />
        </div>

        {/* Ações */}
        <div className="flex items-center justify-end gap-2">
          <Link
            href={`/convite/${guest.publicToken}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#ded3ca] bg-white px-3 py-2 text-xs font-medium text-[#665750] transition hover:border-[#cdbbb0] hover:bg-[#faf7f3]"
          >
            <ExternalIcon />
            Ver
          </Link>

          <CopyLinkButton
            publicToken={guest.publicToken}
          />

          <DeleteGuestButton
            guestId={guest.id}
            guestName={guest.name}
          />
        </div>
      </div>
    ))}
  </div>
</div>

{/* Mobile */}
<div className="divide-y divide-[#eee7df] md:hidden">
  {guests.map((guest) => (
    <div
      key={guest.id}
      className="p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f4e7e1] font-serif text-[#a86c6d]">
            {guest.name.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#4e3d37]">
              {guest.name}
            </p>

            <p className="mt-1 truncate text-[10px] text-[#8b7972]">
              /convite/{guest.publicToken}
            </p>
          </div>
        </div>

        <RsvpBadge status={guest.rsvpStatus} />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <Link
          href={`/convite/${guest.publicToken}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#ded3ca] bg-white px-3 py-2.5 text-xs font-medium text-[#665750] transition hover:border-[#cdbbb0] hover:bg-[#faf7f3]"
        >
          <ExternalIcon />
          Ver
        </Link>

        <CopyLinkButton
          publicToken={guest.publicToken}
        />

        <DeleteGuestButton
          guestId={guest.id}
          guestName={guest.name}
        />
      </div>
    </div>
  ))}
</div>
            </>
          )}
        </section>

        {/* =====================================================
            FOOTER
        ====================================================== */}

<SirflerFooter />
      </div>
    </main>
  );
}

/* =============================================================
   STAT CARD
============================================================= */

function StatCard({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: number;
  icon: ReactNode;
  tone: "neutral" | "green" | "gold" | "rose";
}) {
  const tones = {
    neutral: "bg-[#f4eee8] text-[#806e66]",
    green: "bg-[#edf4ea] text-[#668060]",
    gold: "bg-[#f7f0df] text-[#9c7d51]",
    rose: "bg-[#f7e9e7] text-[#a76d6e]",
  };

  return (
    <div className="rounded-[26px] border border-[#e1d5cb] bg-[#fffdfa] p-5 shadow-[0_10px_30px_rgba(77,55,44,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-medium text-[#897972]">
            {label}
          </p>

          <p className="mt-2 font-serif text-3xl text-[#4d3c36]">
            {value}
          </p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-2xl ${tones[tone]}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function ProgressItem({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div>
      <p className="text-[10px] text-[#8a7972]">{label}</p>
      <p className={`mt-1 text-sm font-semibold ${color}`}>{value}</p>
    </div>
  );
}

/* =============================================================
   ÍCONES
============================================================= */

function BabyIcon() {
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
      <path d="M7 14c0-4 2.4-7 5-7s5 3 5 7" />
      <path d="M5 14h14v2a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-2Z" />
      <path d="M9 10H7.5M16.5 10H15" />
      <path d="M10 16.5c1.1.8 2.9.8 4 0" />
      <path d="M9 7c0-1.5 1-2.5 2.5-2.5" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 20v-1.5a4.5 4.5 0 0 0-4.5-4.5h-3A4.5 4.5 0 0 0 4 18.5V20" />
      <circle cx="10" cy="8" r="3.5" />
      <path d="M16 7.5a3 3 0 0 1 0 5.8M20 20v-1.5a4.4 4.4 0 0 0-3-4.2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function ClockIcon() {
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
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function CloseIcon() {
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
      <path d="m7 7 10 10M17 7 7 17" />
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

function ExternalIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 5h5v5" />
      <path d="m19 5-8 8" />
      <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2l1.5 7.5L21 11l-7.5 1.5L12 20l-1.5-7.5L3 11l7.5-1.5L12 2Z" />
    </svg>
  );
}

function TinyHeart() {
  return (
    <svg
      width="11"
      height="11"
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
