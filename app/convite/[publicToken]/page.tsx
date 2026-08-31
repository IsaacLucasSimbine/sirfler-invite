// app/convite/[publicToken]/page.tsx

import Image from "next/image";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { GuestService } from "@/services/guest.service";
import { submitRsvp } from "@/actions/guest.actions";
import { LocationButton } from "@/components/location-button";

const EVENT = {
  imageUrl: "/convite/hero.jpg",
  title: "Chá de Bebé da Hilka",
  eyebrow: "A celebrar uma nova vida",
  subtitle:
    "Um pequeno milagre está a caminho e já enche a nossa vida de amor, esperança e os sonhos mais lindos.",

  day: "17",
  month: "OUT",
  year: "2026",

  date: "17 de Outubro de 2026",
  time: "A confirmar",

  locationShort: "Marracuene",
  address: "Marracuene, Mozambique",

  latitude: -25.7231,
  longitude: 32.6767,

  giftIntro:
    "Cada gesto será recebido com muito carinho. Escolhe aquilo que vier do teu coração.",

  closing:
    "Mais do que presentes, queremos partilhar amor e celebrar a chegada da nossa pequena Hilka.",

  signature: "Com amor, Mamã & Papá",
};

const GIFT_SUGGESTIONS = [
  {
    title: "Fraldas",
    image: "/convite/fraldas.jpg",
    description: "Um essencial que acompanhará os primeiros dias.",
  },
  {
    title: "Roupinhas",
    image: "/convite/roupinhas.jpg",
    description: "Pequenos conjuntos para receber a Hilka com carinho.",
  },
  {
    title: "Higiene do Bebé",
    image: "/convite/hh.jpg",
    description: "Cuidados delicados para a chegada da nossa bebé.",
  },
  {
    title: "Mimos Especiais",
    image: "/convite/others.jpg",
    description: "Um pequeno presente escolhido especialmente para ela.",
  },
];

interface InvitePageProps {
  params: Promise<{ publicToken: string }>;
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { publicToken } = await params;

  const guestService = new GuestService();

  let guest;

  try {
    guest = await guestService.getGuestByPublicToken(publicToken);
  } catch {
    notFound();
  }

  const boundSubmitRsvp = submitRsvp.bind(null, publicToken);

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f3ed] text-[#4b3934]">
      {/* Background atmosférico */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div className="absolute -left-44 -top-44 h-[34rem] w-[34rem] rounded-full bg-[#efd7d2]/35 blur-[100px]" />
        <div className="absolute -bottom-56 -right-48 h-[38rem] w-[38rem] rounded-full bg-[#e1dfca]/45 blur-[110px]" />
        <div className="absolute left-1/2 top-[32%] h-[22rem] w-[22rem] -translate-x-1/2 rounded-full bg-[#f0e1c9]/35 blur-[100px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-3 py-4 sm:px-6 sm:py-7">
        <article className="relative w-full max-w-[560px] overflow-hidden rounded-[38px] border border-[#ded0c6] bg-[#fffdfa] shadow-[0_30px_100px_rgba(77,55,44,0.13)]">

          {/* Linha dourada no topo */}
          <div className="absolute left-1/2 top-0 z-40 h-[3px] w-28 -translate-x-1/2 rounded-b-full bg-[#c39b57]" />

          {/* =====================================================
              HERO
          ====================================================== */}

          <Hero />

          <div className="relative px-5 pb-10 pt-8 sm:px-9 sm:pb-12 sm:pt-10">
            <SideOrnaments />

            {/* ===================================================
                SAUDAÇÃO
            ==================================================== */}

            <section className="text-center">
              <p className="text-[9px] font-semibold uppercase tracking-[0.34em] text-[#a98272] sm:text-[10px]">
                Um convite muito especial
              </p>

              <h2 className="mt-3 font-serif text-[26px] leading-tight tracking-[-0.02em] text-[#4a3933] sm:text-[31px]">
                Olá,{" "}
                <span className="italic text-[#bb7474]">
                  {guest.name}
                </span>
              </h2>

              <p className="mx-auto mt-3 max-w-[360px] text-sm leading-6 text-[#7e6e67]">
                Preparamos este momento com muito amor para celebrar
                a chegada da nossa pequena Hilka.
              </p>

              <div className="mx-auto mt-5 flex items-center justify-center gap-2 text-[#c49a55]">
                <span className="h-px w-9 bg-[#dec8a4]" />
                <TinyHeart />
                <span className="h-px w-9 bg-[#dec8a4]" />
              </div>
            </section>

            {/* ===================================================
                DATA
            ==================================================== */}

            <DateHighlight />

            {/* ===================================================
                INFORMAÇÕES
            ==================================================== */}

            <section className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <EventInfo
                icon={<CalendarIcon />}
                label="Data"
                value={EVENT.date}
              />

              <EventInfo
                icon={<ClockIcon />}
                label="Hora"
                value={EVENT.time}
              />

              <EventInfo
                icon={<PinIcon />}
                label="Local"
                value={EVENT.locationShort}
              />
            </section>

            {/* ===================================================
                RSVP
            ==================================================== */}

            <section className="relative mt-8 overflow-hidden rounded-[30px] border border-[#eadccf] bg-[#fbf7f2]">
              <div className="absolute -right-7 -top-7 h-24 w-24 rounded-full border border-[#e8d7c8]" />
              <div className="absolute -left-10 bottom-[-2.25rem] h-28 w-28 rounded-full border border-[#ecdcd0]" />

              <div className="relative border-b border-[#eee2d9] px-6 py-5 sm:px-7">
                <div className="flex items-center justify-center gap-3 text-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3e2df] text-[#b56f72]">
                    <CheckIcon />
                  </div>

                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#a8877d]">
                      Confirmação de presença
                    </p>

                    <h3 className="mt-1 font-serif text-xl text-[#4b3934] sm:text-[22px]">
                      Esperamos por ti
                    </h3>
                  </div>
                </div>
              </div>

              <div className="relative px-6 py-6 sm:px-7 sm:py-7">
                {guest.rsvpStatus === "PENDING" && (
                  <div className="space-y-5">
                    <p className="mx-auto max-w-[410px] text-center text-sm leading-6 text-[#74655e]">
                      Para prepararmos tudo com o maior carinho,
                      diz-nos se poderás estar connosco neste dia tão
                      especial.
                    </p>

                    <form
                      action={boundSubmitRsvp}
                      className="space-y-3"
                    >
                      <button
                        type="submit"
                        name="rsvpStatus"
                        value="CONFIRMED"
                        className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-[#b96f73] px-5 py-4 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(185,111,115,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#a95f64] hover:shadow-[0_16px_34px_rgba(185,111,115,0.28)] active:translate-y-0"
                      >
                        <span>Confirmar presença</span>
                        <ArrowIcon />
                      </button>

                      <button
                        type="submit"
                        name="rsvpStatus"
                        value="DECLINED"
                        className="w-full rounded-2xl border border-[#ddcec4] bg-white px-5 py-4 text-sm font-medium text-[#6b5b54] transition-all duration-300 hover:border-[#cdb9ad] hover:bg-[#fdf9f5] active:scale-[0.99]"
                      >
                        Não poderei comparecer
                      </button>
                    </form>
                  </div>
                )}

                {guest.rsvpStatus === "CONFIRMED" && (
                  <div className="space-y-5">
                    <div className="rounded-2xl border border-[#d0dcc9] bg-[#f3f7f0] px-4 py-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e1ebdc] text-[#6b8666]">
                          <CheckIcon />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-[#516b4d]">
                            Presença confirmada
                          </p>

                          <p className="mt-1 text-xs leading-5 text-[#71806d]">
                            Ficamos muito felizes por saber que estarás
                            connosco, {guest.name}.
                          </p>
                        </div>
                      </div>
                    </div>

                    <GiftSuggestions />

                    <form
                      action={boundSubmitRsvp}
                      className="text-center"
                    >
                      <button
                        type="submit"
                        name="rsvpStatus"
                        value="PENDING"
                        className="text-xs font-medium text-[#8d6a69] underline decoration-[#ccb5ac] underline-offset-4 transition hover:text-[#66484b]"
                      >
                        Alterar a minha resposta
                      </button>
                    </form>
                  </div>
                )}

                {guest.rsvpStatus === "DECLINED" && (
                  <div className="space-y-5">
                    <div className="rounded-2xl border border-[#e2cecb] bg-[#faf1f0] px-4 py-4">
                      <p className="text-sm font-semibold text-[#835d5d]">
                        Obrigado por nos avisares.
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#927575]">
                        Sentiremos a tua falta, mas ficamos felizes por
                        teres respondido ao convite.
                      </p>
                    </div>

                    <form
                      action={boundSubmitRsvp}
                      className="text-center"
                    >
                      <button
                        type="submit"
                        name="rsvpStatus"
                        value="CONFIRMED"
                        className="text-xs font-medium text-[#8d6a69] underline decoration-[#ccb5ac] underline-offset-4 transition hover:text-[#66484b]"
                      >
                        Afinal vou conseguir ir
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </section>

            {/* ===================================================
                PRESENTES
            ==================================================== */}

            {guest.rsvpStatus === "PENDING" && <GiftSuggestions />}

            {/* ===================================================
                LOCALIZAÇÃO
            ==================================================== */}

            <section className="mt-9">
              <div className="mb-4 flex items-end justify-between px-1">
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-[#a4857b]">
                    Onde nos encontramos
                  </p>

                  <h3 className="mt-1 font-serif text-[23px] text-[#4a3933]">
                    Localização
                  </h3>
                </div>

                <TinyLeaf />
              </div>

              <div className="overflow-hidden rounded-[30px] border border-[#e1d6cc] bg-[#f7f4ed]">
                <div className="relative h-40 overflow-hidden bg-[#e7e8df]">
                  <MapTexture />

                  <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                    <div className="absolute h-16 w-16 rounded-full bg-[#be7b7d]/15 animate-ping [animation-duration:2.2s]" />

                    <div className="relative flex h-11 w-11 items-center justify-center rounded-full border-4 border-white bg-[#b67073] text-white shadow-xl">
                      <PinIcon />
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <p className="text-sm font-semibold text-[#50403a]">
                    {EVENT.locationShort}
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#81726b]">
                    {EVENT.address}
                  </p>

                  <div className="mt-4">
                    <LocationButton
                      address={EVENT.address}
                      latitude={EVENT.latitude}
                      longitude={EVENT.longitude}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* ===================================================
                ENCERRAMENTO
            ==================================================== */}

            <section className="relative mt-10 border-t border-[#e6dad0] pt-9 text-center">
              <div className="absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 bg-[#fffdfa] px-3 text-[#c79b55]">
                <span className="h-1 w-1 rounded-full bg-[#d9bb83]" />
                <TinyHeart />
                <span className="h-1 w-1 rounded-full bg-[#d9bb83]" />
              </div>

              <p className="mx-auto max-w-[390px] font-serif text-[17px] italic leading-7 text-[#6e605a] sm:text-[18px]">
                “{EVENT.closing}”
              </p>

              <p className="mt-5 font-serif text-xl text-[#b46e71]">
                {EVENT.signature}
              </p>

              <div className="mt-5 flex justify-center text-[#c39a56]">
                <BellOrnament />
              </div>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}

/* =============================================================
   HERO
============================================================= */

function Hero() {
  return (
    <section className="relative h-[440px] overflow-hidden sm:h-[475px]">
      <Image
        src={EVENT.imageUrl}
        alt="Decoração delicada de chá de bebé"
        fill
        priority
        sizes="(max-width: 640px) 100vw, 560px"
        className="object-cover object-center transition-transform duration-[1200ms] hover:scale-[1.02]"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-[#6b4e41]/5 to-[#46352d]/78" />

      <div className="absolute inset-4 rounded-[28px] border border-white/25 sm:inset-5" />

      {/* Sinos no canto */}
      <div className="absolute right-4 top-4 z-20 text-[#d3a65b] sm:right-7 sm:top-7">
        <BellOrnament />
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 px-7 pb-9 text-center text-white sm:px-12 sm:pb-11">
        <div className="mx-auto mb-5 flex w-fit items-center gap-3">
          <span className="h-px w-9 bg-white/55" />

          <span className="text-[9px] font-medium uppercase tracking-[0.34em] text-white/85 sm:text-[10px]">
            {EVENT.eyebrow}
          </span>

          <span className="h-px w-9 bg-white/55" />
        </div>

        <h1 className="font-serif text-[43px] font-normal leading-[0.96] tracking-[-0.03em] sm:text-[56px]">
          Chá de Bebé

          <span className="mt-2 block text-[47px] italic text-[#f1b9b7] sm:text-[60px]">
            da Hilka
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-[390px] text-[13px] leading-6 text-white/88 sm:text-sm">
          {EVENT.subtitle}
        </p>
      </div>
    </section>
  );
}

/* =============================================================
   DATA
============================================================= */

function DateHighlight() {
  return (
    <section className="mt-8 rounded-[30px] border border-[#eadccc] bg-[#fbf7f1] px-5 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:px-7">
      <div className="flex items-center justify-center gap-6">
        <div className="text-center">
          <span className="font-serif text-5xl leading-none text-[#a96f70] sm:text-6xl">
            {EVENT.day}
          </span>

          <span className="mt-2 block text-[10px] font-semibold tracking-[0.3em] text-[#b18477]">
            {EVENT.month}
          </span>
        </div>

        <div className="h-16 w-px bg-[#dfcfc1]" />

        <div className="text-left">
          <p className="text-[9px] font-semibold uppercase tracking-[0.23em] text-[#aa8a80]">
            A nossa celebração
          </p>

          <p className="mt-1 font-serif text-xl text-[#4b3b35]">
            {EVENT.year}
          </p>

          <div className="mt-2 flex items-center gap-2 text-[11px] text-[#7d6d66]">
            <ClockIcon />
            <span>{EVENT.time}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================
   PRESENTES
============================================================= */

function GiftSuggestions() {
  return (
    <section className="mt-8">
      <div className="mb-5 text-center">
        <div className="mx-auto flex w-fit items-center gap-2 text-[#c39b58]">
          <span className="h-px w-8 bg-[#dfc8a0]" />

          <GiftIcon />

          <span className="h-px w-8 bg-[#dfc8a0]" />
        </div>

        <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.29em] text-[#a48177]">
          Para a pequena Hilka
        </p>

        <h3 className="mt-2 font-serif text-[27px] text-[#4c3a34]">
          Sugestões de mimo
        </h3>

        <p className="mx-auto mt-2 max-w-[390px] text-sm leading-6 text-[#7b6b64]">
          {EVENT.giftIntro}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {GIFT_SUGGESTIONS.map((gift) => (
          <div
            key={gift.title}
            className="group overflow-hidden rounded-[24px] border border-[#eaded5] bg-white shadow-[0_10px_25px_rgba(85,59,47,0.055)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(85,59,47,0.10)]"
          >
            <div className="relative aspect-[1/0.94] overflow-hidden bg-[#f2e9e1]">
              <Image
                src={gift.image}
                alt={gift.title}
                fill
                sizes="(max-width: 640px) 44vw, 250px"
                className="object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#2e201a]/22 via-transparent to-transparent" />
            </div>

            <div className="px-3 py-4 text-center sm:px-4">
              <h4 className="font-serif text-[16px] text-[#6f4e4a]">
                {gift.title}
              </h4>

              <p className="mt-1 text-[10px] leading-4 text-[#88766e] sm:text-[11px]">
                {gift.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =============================================================
   INFO CARD
============================================================= */

function EventInfo({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[23px] border border-[#e4d9d0] bg-white px-4 py-4 shadow-[0_8px_20px_rgba(75,56,46,0.035)]">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f4e7e1] text-[#ad7370]">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#aa8a80]">
            {label}
          </p>

          <p className="mt-1 truncate text-xs font-medium text-[#52433d]">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   ORNAMENTAÇÃO
============================================================= */

function SideOrnaments() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute left-[-2px] top-[440px] opacity-65">
        <LeafOrnament />
      </div>

      <div className="absolute right-[-2px] top-[760px] rotate-180 opacity-65">
        <LeafOrnament />
      </div>

      <div className="absolute left-[-1px] top-[1040px] opacity-50">
        <TinySparkle />
      </div>

      <div className="absolute right-[-1px] top-[1140px] opacity-45">
        <TinySparkle />
      </div>
    </div>
  );
}

function MapTexture() {
  return (
    <div aria-hidden="true" className="absolute inset-0 opacity-70">
      <div className="absolute left-[3%] top-[15%] h-px w-[93%] rotate-[11deg] bg-[#c3c8bc]" />
      <div className="absolute left-[-8%] top-[59%] h-px w-[108%] -rotate-[7deg] bg-[#c3c8bc]" />
      <div className="absolute left-[12%] top-[-8%] h-[125%] w-px rotate-[31deg] bg-[#d0d2ca]" />
      <div className="absolute left-[54%] top-[-15%] h-[135%] w-px rotate-[67deg] bg-[#c6cbbf]" />
      <div className="absolute right-[13%] top-[-10%] h-[125%] w-px rotate-[18deg] bg-[#d4d6cf]" />
      <div className="absolute left-[31%] top-[36%] h-12 w-24 rotate-[12deg] rounded-full border border-[#c2c8be]" />
      <div className="absolute right-[6%] top-[44%] h-20 w-32 -rotate-[22deg] rounded-full border border-[#c2c8be]" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/35 to-[#d7dacd]/40" />
    </div>
  );
}

/* =============================================================
   SINO
============================================================= */

function BellOrnament() {
  return (
    <svg
      width="58"
      height="70"
      viewBox="0 0 58 70"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M17.5 18C17.5 9.5 23.6 4 29 4C34.4 4 40.5 9.5 40.5 18"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M12 41C12 28.5 17.3 19 29 19C40.7 19 46 28.5 46 41L50 50H8L12 41Z"
        fill="currentColor"
        fillOpacity=".14"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M26 50C26 55.5 28 58.5 29 58.5C30 58.5 32 55.5 32 50"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      <path
        d="M29 59V66"
        stroke="currentColor"
        strokeWidth="1.4"
      />

      <path
        d="M22 66H36"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

/* =============================================================
   FOLHAS
============================================================= */

function LeafOrnament() {
  return (
    <svg
      width="60"
      height="120"
      viewBox="0 0 60 120"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 114C19 94 23 75 27 56C31 39 39 22 54 7"
        stroke="#c7a366"
        strokeWidth="1.2"
      />

      <path
        d="M20 89C10 82 7 75 8 68C18 70 23 77 20 89Z"
        fill="#d8bf8e"
        fillOpacity=".2"
        stroke="#c7a366"
        strokeWidth="1"
      />

      <path
        d="M25 67C16 61 15 55 17 49C26 51 30 57 25 67Z"
        fill="#d8bf8e"
        fillOpacity=".2"
        stroke="#c7a366"
        strokeWidth="1"
      />

      <path
        d="M34 44C28 37 29 31 33 27C40 31 40 37 34 44Z"
        fill="#d8bf8e"
        fillOpacity=".2"
        stroke="#c7a366"
        strokeWidth="1"
      />

      <path
        d="M42 29C38 22 40 17 45 14C50 19 49 24 42 29Z"
        fill="#d8bf8e"
        fillOpacity=".2"
        stroke="#c7a366"
        strokeWidth="1"
      />
    </svg>
  );
}

function TinyLeaf() {
  return (
    <svg
      width="34"
      height="30"
      viewBox="0 0 34 30"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 26C9 20 16 11 28 4"
        stroke="#c49b59"
        strokeWidth="1.2"
      />

      <path
        d="M11 18C7 15 7 11 9 8C14 10 15 14 11 18Z"
        fill="#d6bd8a"
        fillOpacity=".18"
        stroke="#c49b59"
        strokeWidth="1"
      />

      <path
        d="M18 13C15 9 16 6 19 4C23 7 22 10 18 13Z"
        fill="#d6bd8a"
        fillOpacity=".18"
        stroke="#c49b59"
        strokeWidth="1"
      />
    </svg>
  );
}

function TinySparkle() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5L12 2Z"
        fill="#d8b66f"
        fillOpacity=".45"
      />
    </svg>
  );
}

function TinyHeart() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 20S4.5 15.5 3.5 9.8C2.7 5.4 7.4 2.5 10.5 5.5L12 7L13.5 5.5C16.6 2.5 21.3 5.4 20.5 9.8C19.5 15.5 12 20 12 20Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

/* =============================================================
   ÍCONES
============================================================= */

function CalendarIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="17" rx="3" />
      <path d="M16 2v4M8 2v4M3 9h18" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function CheckIcon() {
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
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
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
      aria-hidden="true"
    >
      <path d="M5 12h13" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function GiftIcon() {
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
      <rect x="3" y="9" width="18" height="11" rx="2" />
      <path d="M12 9v11M3 13h18M12 9H8.5A2.5 2.5 0 1 1 11 6.5C11 5 10 4 9 4" />
      <path d="M12 9h3.5A2.5 2.5 0 1 0 13 6.5C13 5 14 4 15 4" />
    </svg>
  );
}